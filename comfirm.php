<?php
require 'config.php'; // connexion à la BDD et variables sensibles

if (!isset($_GET['token'])) {
    die("Lien invalide.");
}

$token = $_GET['token'];

// 1️⃣ Chercher l'utilisateur avec ce token et vérifier qu'il n'a pas expiré
$stmt = $pdo->prepare("SELECT id, reset_expires FROM users WHERE reset_token = :t LIMIT 1");
$stmt->execute([':t' => $token]);
$user = $stmt->fetch();

if (!$user) {
    die("Token invalide.");
}

// Vérifier la date d'expiration
$currentTime = date('Y-m-d H:i:s');
if ($currentTime > $user['reset_expires']) {
    die("Ce lien a expiré.");
}

// 2️⃣ Activer le compte : supprimer le token et reset_expires
$stmt = $pdo->prepare("
    UPDATE users 
    SET reset_token = NULL, reset_expires = NULL 
    WHERE id = :id
");
$stmt->execute([':id' => $user['id']]);

echo "Compte confirmé avec succès ! Tu peux maintenant te connecter.";
?>