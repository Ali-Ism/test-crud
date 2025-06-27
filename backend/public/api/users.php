<?php

/**
 * API REST pour la gestion des utilisateurs
 * 
 * Ce fichier implémente une API RESTful complète pour effectuer des opérations CRUD
 * (Create, Read, Update, Delete) sur la table users de la base de données.
 * 
 * Endpoints disponibles:
 * - GET    /users.php          : Récupère tous les utilisateurs
 * - POST   /users.php          : Crée un nouvel utilisateur
 * - PUT    /users.php?id={id}  : Met à jour un utilisateur existant
 * - DELETE /users.php?id={id}  : Supprime un utilisateur
 * 
 */


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include __DIR__ . '/../../includes/db.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    /**
     * GET - Récupération de tous les utilisateurs
     * 
     * Retourne la liste complète des utilisateurs triée par ID décroissant
     * 
     * @return Array des utilisateurs avec leurs propriétés
     * @http_status 200 OK
     */
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM users ORDER BY id DESC");
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($users);
        break;
    /**
     * POST - Création d'un nouvel utilisateur
     * 
     * 
     * @body {firstname, lastname, email, phone}
     * @return Message de confirmation ou d'erreur
     * @http_status 201 Created | 400 Bad Request | 409 Conflict | 500 Internal Server Error
     */
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        // Vérifier si l'email existe déjà ou le telephone
        if (!isset($data['firstname'], $data['lastname'], $data['email'], $data['phone'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Champs manquants']);
            exit;
        }

        try {
            // Vérifie doublon email
            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$data['email']]);
            if ($stmt->fetch()) {
                echo json_encode(['error' => 'Cet email est déjà utilisé.']);
                exit;
            }

            // Vérifie doublon téléphone
            $stmt = $pdo->prepare("SELECT id FROM users WHERE phone = ?");
            $stmt->execute([$data['phone']]);
            if ($stmt->fetch()) {
                echo json_encode(['error' => 'Ce numéro de téléphone est déjà utilisé.']);
                exit;
            }
            $stmt = $pdo->prepare("INSERT INTO users (firstname, lastname, email, phone) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $data['firstname'],
                $data['lastname'],
                $data['email'],
                $data['phone']
            ]);

            echo json_encode(['message' => 'Utilisateur ajouté avec succès']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erreur lors de l’ajout : ' . $e->getMessage()]);
        }
        break;

    /**
     * PUT - Modification d'un utilisateur existant
     * 
     * Met à jour les informations d'un utilisateur identifié par son ID
     * 
     * @param int id ID de l'utilisateur à modifier
     * @body {firstname, lastname, email, phone}
     * @return Message de confirmation ou d'erreur
     * @http_status 200 OK | 400 Bad Request | 404 Not Found | 409 Conflict | 500 Internal Server Error
     */
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $_GET['id'] ?? null;

        if (!$id || !isset($data['firstname'], $data['lastname'], $data['email'], $data['phone'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Requête invalide']);
            exit;
        }

        try {
            // Vérifie doublon email (autre utilisateur)
            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ? AND id != ?");
            $stmt->execute([$data['email'], $id]);
            if ($stmt->fetch()) {
                echo json_encode(['error' => 'Cet email est déjà utilisé.']);
                exit;
            }

            // Vérifie doublon téléphone (autre utilisateur)
            $stmt = $pdo->prepare("SELECT id FROM users WHERE phone = ? AND id != ?");
            $stmt->execute([$data['phone'], $id]);
            if ($stmt->fetch()) {
                echo json_encode(['error' => 'Ce numéro de téléphone est déjà utilisé.']);
                exit;
            }
            //update les different colonne d'un utilisateur soit le firstname ou le lastname ou son email ou son tel , on peut modifier tous a la fois.
            $stmt = $pdo->prepare("UPDATE users SET firstname=?, lastname=?, email=?, phone=? WHERE id=?");
            $stmt->execute([
                $data['firstname'],
                $data['lastname'],
                $data['email'],
                $data['phone'],
                $id
            ]);

            echo json_encode(['message' => 'Utilisateur mis à jour']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erreur lors de la modification : ' . $e->getMessage()]);
        }
        break;

    /**
     * DELETE - Suppression d'un utilisateur
     * 
     * Supprime un utilisateur de la base de données
     * 
     * @param int id ID de l'utilisateur à supprimer 
     * @return Message de confirmation ou d'erreur
     * @http_status 200 OK | 400 Bad Request | 404 Not Found | 500 Internal Server Error
     */
    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID manquant']);
            exit;
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM users WHERE id=?");
            $stmt->execute([$id]);
            echo json_encode(['message' => 'Utilisateur supprimé']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erreur lors de la suppression : ' . $e->getMessage()]);
        }
        break;

    /**
     * Méthode HTTP non supportée
     * 
     * Retourne une erreur 405 Method Not Allowed pour toute méthode HTTP
     * non implémentée dans cette API
     */
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Méthode non autorisée']);
}
