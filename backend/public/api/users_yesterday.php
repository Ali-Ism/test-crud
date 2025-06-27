<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include __DIR__ . '/../../includes/db.php';

$yesterday = date('Y-m-d', strtotime('-1 day'));
$stmt = $pdo->prepare("SELECT * FROM users WHERE DATE(created_at) = ?");
$stmt->execute([$yesterday]);

$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    'date' => $yesterday,
    'count' => count($users),
    'users' => $users
]);
?>