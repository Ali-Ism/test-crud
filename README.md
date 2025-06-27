# Test CRUD App — React + PHP + MySQL

Ce projet est une application **CRUD (Create, Read, Update, Delete)** simple permettant de gérer une liste d'utilisateurs. Il a été développé dans un objectif d’apprentissage autour du développement **fullstack**, en combinant **React (frontend)** avec **PHP/MySQL (backend)**.

---

## 🔧 Stack utilisée

* **Frontend** : React (via **Vite**)
* **Backend** : PHP (avec **PDO** pour MySQL)
* **Base de données** : MySQL (via **XAMPP**)
* **Éditeur de code** : Visual Studio Code

---

## 📁 Structure du projet

```
test-crud/
├── backend/
│   ├── database/
│   │   └── crud_users.sql
│   ├── includes/
│   │   └── db.php
│   ├── public/
│   │   ├── api/
│   │   │   ├── users.php
│   │   │   └── users_yesterday.php
│   │   └── index.php
│   ├── scripts/
│   │   └── run_users_yesterday.php  
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UserForm.jsx
│   │   │   └── UserList.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
```

---

## ✅ Prérequis

* **XAMPP** (Apache, PHP, MySQL, phpMyAdmin)
* **Node.js**
* **Git** (optionnel, pour cloner le projet)

> 💡 **Note** : Si vous n’utilisez pas XAMPP, assurez-vous d’avoir Apache, PHP 8+ et MySQL installés manuellement, avec un accès à phpMyAdmin ou équivalent.

---

## 🗄️ Base de données

1. Lancer **XAMPP** et démarrer **Apache** et **MySQL**
2. Ouvrir : [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
3. Créer une base appelée `crud_users`
4. Importer le fichier SQL : `backend/database/crud_users.sql`
5. ⚙️ Configuration personnalisée : le port MySQL est défini sur **3300** dans `my.ini`

---

## Backend (PHP)

1. Copier le dossier `backend` dans `C:/xampp/htdocs/`
2. Vérifier les paramètres de connexion dans `includes/db.php`
3. Depuis le terminal (dans le dossier `test-crud/`) :

```bash
php -S localhost:8000 -t backend/public
```

API disponible à : [http://localhost:8000/api/](http://localhost:8000/api/)

---

## Frontend (React)

1. Dans le dossier `test-crud/` :

```bash
cd frontend
npm install
npm run dev
```

2. L'application sera disponible sur : [http://localhost:5173](http://localhost:5173)

---

## 🔄 Fonctionnalités

* ✅ Ajouter un utilisateur
* ✅ Modifier un utilisateur
* ✅ Supprimer un utilisateur (avec confirmation)
* ✅ Voir les utilisateurs créés hier
* ✅ Validation des champs (email, téléphone, doublons)
* ✅ Affichage des messages d’erreur ou de succès

---

## 📘 Documentation de l'API

> **Base URL :** `http://localhost:8000/api/`

### `GET /users.php`

* **Description** : Récupère tous les utilisateurs (du plus récent au plus ancien)
* **Réponse :**

```json
[
  {
    "id": 1,
    "firstname": "Jean",
    "lastname": "Dupont",
    "email": "jean@mail.com",
    "phone": "0612345678",
    "created_at": "2025-06-27 10:12:00"
  }
]
```

### `GET /users_yesterday.php`

* **Description** : Liste des utilisateurs créés **la veille**
* **Réponse :**

```json
{
  "date": "2025-06-26",
  "count": 2,
  "users": [
    {
      "id": 2,
      "firstname": "Alice",
      "lastname": "Martin",
      "email": "alice@mail.com",
      "phone": "0600000000",
      "created_at": "2025-06-26 15:30:00"
    }
  ]
}
```

### `POST /users.php`

* **Description** : Ajoute un nouvel utilisateur
* **Corps :**

```json
{
  "firstname": "Ali",
  "lastname": "Ismail",
  "email": "ali@mail.com",
  "phone": "0611223344"
}
```

* **Réponse :**

```json
{ "message": "Utilisateur ajouté avec succès" }
```

### `PUT /users.php?id=ID`

* **Description** : Modifie un utilisateur existant
* **Corps :** (même format que POST)
* **Réponse :**

```json
{ "message": "Utilisateur mis à jour" }
```

### `DELETE /users.php?id=ID`

* **Description** : Supprime un utilisateur par ID
* **Réponse :**

```json
{ "message": "Utilisateur supprimé" }
```

* **Erreur si ID manquant :**

```json
{ "error": "ID manquant" }
```

---

## 🔒 Sécurité et CORS

Les entêtes CORS sont gérés automatiquement :

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

⏰ Tâche planifiée (Windows)

Le projet inclut un script PHP permettant de récupérer la liste des utilisateurs créés la veille. Ce script peut être utilisé dans une tâche planifiée sous Windows.

Emplacement du script

backend/scripts/run_users_yesterday.php

Fonction

Appelle automatiquement l'API users_yesterday.php

Enregistre le résultat dans un fichier JSON daté

Utilisation avec le Planificateur de Tâches Windows

Ouvrir le Planificateur de tâches

Créer une nouvelle tâche

Déclencheur : tous les jours à l'heure souhaitée (ex : 06:00)

Action :

Programme/script : C:\xampp\php\php.exe

Arguments : C:\xampp\htdocs\Test_Crud\backend\scripts\run_users_yesterday.php

Sauvegarder la tâche
php C:/xampp/htdocs/Test_Crud/backend/scripts/run_users_yesterday.php
