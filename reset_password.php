<?php
require 'config.php';
//verfication si la requête est bien en post
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //récupere les données formulaire (token de rénitialisation dans le lien du mail et le nouveau mot de passe sais par l'utilisateur)
    $token = $_POST['token'] ?? '';
    $newPassword = $_POST['new_password'] ?? '';
//verifie que les 2 champs ne sont pas vides
    if (!$token || !$newPassword) die("Données manquantes");//stoppe le scripte si 1 des 2 champs manque.

    // Vérifier que le token existe et récupérer l'utilisateur
    $stmt = $pdo->prepare("SELECT id FROM users WHERE reset_token = :token LIMIT 1");
    $stmt->execute([':token' => $token]);
    $user = $stmt->fetch();

    if (!$user) die("Token invalide");

    // Hasher le nouveau mot de passe
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    // Mettre à jour le mot de passe et supprimer le token
    $stmt = $pdo->prepare("UPDATE users SET password = :password, reset_token = NULL WHERE id = :id");
    $stmt->execute([
        ':password' => $hashedPassword,
        ':id' => $user['id']
    ]);

    echo "Mot de passe réinitialisé avec succès !";
}
?>
