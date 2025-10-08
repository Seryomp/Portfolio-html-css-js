<?php
require 'config.php';
session_start();

// Vérifie si l'utilisateur est connecté
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Non connecté']);
    exit;
}

$userId = $_SESSION['user_id'];
$newUsername = $_POST['username'] ?? '';

// Vérifie que le pseudo n’est pas vide
if (!$newUsername) {
    echo json_encode(['success' => false, 'message' => 'Pseudo vide']);
    exit;
}

// Vérifie que le pseudo n’existe pas déjà
$stmt = $pdo->prepare("SELECT id FROM users WHERE username = :u AND id != :id");
$stmt->execute([':u' => $newUsername, ':id' => $userId]);
if ($stmt->fetch()) {
    echo json_encode(['success' => false, 'message' => 'Pseudo déjà pris']);
    exit;
}

// Met à jour le pseudo
$stmt = $pdo->prepare("UPDATE users SET username = :u WHERE id = :id");
$stmt->execute([':u' => $newUsername, ':id' => $userId]);

echo json_encode(['success' => true, 'username' => $newUsername]);
?>