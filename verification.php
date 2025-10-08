<?php
require 'config.php'; // Connexion PDO à la BDD
session_start(); // On démarre la session pour stocker l'utilisateur

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if (!$username || !$password) {
        die(json_encode(['success' => false, 'message' => 'Données manquantes']));
    }

    // Prépare la requête pour récupérer l'utilisateur
    $stmt = $pdo->prepare("SELECT id, username, password, avatar FROM users WHERE username = :u LIMIT 1");
    $stmt->execute([':u' => $username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        // Mot de passe correct : création de la session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['avatar'] = $user['avatar'] ?: 'default_avatar.png';

        echo json_encode([
            'success' => true,
            'username' => $_SESSION['username'],
            'avatar' => $_SESSION['avatar']
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Nom d’utilisateur ou mot de passe incorrect']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Méthode invalide']);
}
?>