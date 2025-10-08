<?php
require 'config.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['new_username'] ?? '';
    $email = $_POST['new_email'] ?? '';
    $password = $_POST['new_password'] ?? '';

    if (!$username || !$email || !$password) {
        die(json_encode(['success' => false, 'message' => 'Données manquantes']));
    }

    // Vérifie si le pseudo existe déjà
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = :u LIMIT 1");
    $stmt->execute([':u' => $username]);
    if ($stmt->fetch()) {
        die(json_encode(['success' => false, 'message' => "Ce nom d'utilisateur est déjà pris"]));
    }

    // Hash du mot de passe
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Ajoute l'utilisateur à la BDD
    $stmt = $pdo->prepare("INSERT INTO users (username, email, password, avatar) VALUES (:u, :e, :p, 'default_avatar.png')");
    $stmt->execute([
        ':u' => $username,
        ':e' => $email,
        ':p' => $hashedPassword
    ]);

    // Récupère l'id nouvel utilisateur
    $userId = $pdo->lastInsertId();
    $_SESSION['user_id'] = $userId;
    $_SESSION['username'] = $username;
    $_SESSION['avatar'] = 'default_avatar.png';

    echo json_encode([
        'success' => true,
        'username' => $username,
        'avatar' => 'default_avatar.png'
    ]);
}
?>