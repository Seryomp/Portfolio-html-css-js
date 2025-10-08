<?php
require 'config.php'; // connexion à la BDD

session_start();

// Vérifier que l'utilisateur est connecté (à adapter selon ta session)
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Utilisateur non connecté']);
    exit;
}

$userId = $_SESSION['user_id'];

if (!isset($_FILES['avatar']) || $_FILES['avatar']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'upload']);
    exit;
}

$allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
$fileType = mime_content_type($_FILES['avatar']['tmp_name']);

if (!in_array($fileType, $allowedTypes)) {
    echo json_encode(['success' => false, 'message' => 'Format non autorisé']);
    exit;
}

// Limite de taille : 2 Mo
if ($_FILES['avatar']['size'] > 2 * 1024 * 1024) {
    echo json_encode(['success' => false, 'message' => 'Fichier trop lourd']);
    exit;
}

// Création du nom unique
$ext = pathinfo($_FILES['avatar']['name'], PATHINFO_EXTENSION);
$newFileName = 'avatar_' . $userId . '_' . time() . '.' . $ext;

// Chemin de sauvegarde
$uploadDir = __DIR__ . '/avatars/';
if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

$uploadPath = $uploadDir . $newFileName;

if (!move_uploaded_file($_FILES['avatar']['tmp_name'], $uploadPath)) {
    echo json_encode(['success' => false, 'message' => 'Impossible de déplacer le fichier']);
    exit;
}

// Mettre à jour la BDD
$stmt = $pdo->prepare("UPDATE users SET avatar = :avatar WHERE id = :id");
$stmt->execute([
    ':avatar' => 'avatars/' . $newFileName,
    ':id' => $userId
]);

echo json_encode(['success' => true, 'avatar' => 'avatars/' . $newFileName]);
?>