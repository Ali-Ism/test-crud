<?php
// backend/scripts/run_users_yesterday.php

$url = "http://localhost:8000/api/users_yesterday.php";
$response = file_get_contents($url);

if ($response === false) {
    file_put_contents(__DIR__ . "/yesterday_users_error.log", "Erreur lors de l'appel API\n", FILE_APPEND);
    exit(1);
}

// Sauvegarde dans un fichier log JSON
file_put_contents(__DIR__ . "/yesterday_users_" . date('Y-m-d') . ".json", $response);
