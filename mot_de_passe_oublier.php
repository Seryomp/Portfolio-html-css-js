<?php
// 1️⃣ On inclut la config pour accéder à la BDD
require 'config.php';

// 2️⃣ On récupère le token depuis l'URL
$token = $_GET['token'] ?? '';

if (!$token) {
    die("Token manquant.");
}

// 3️⃣ Vérifier que le token existe dans la base de données
$stmt = $pdo->prepare("SELECT id, username FROM users WHERE reset_token = :token LIMIT 1");
$stmt->execute([':token' => $token]);
$user = $stmt->fetch();

if (!$user) {
    die("Token invalide ou expiré.");
}

// 4️⃣ Si le formulaire est soumis
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $new_password = $_POST['new_password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';

    // 4a️⃣ Vérification des champs
    if (!$new_password || !$confirm_password) {
        die("Tous les champs sont obligatoires.");
    }

    if ($new_password !== $confirm_password) {
        die("Les mots de passe ne correspondent pas.");
    }

    // 4b️⃣ Hachage du mot de passe
    $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);

    // 4c️⃣ Mise à jour du mot de passe dans la BDD et suppression du token
    $stmt = $pdo->prepare("UPDATE users SET password = :password, reset_token = NULL WHERE id = :id");
    $stmt->execute([':password' => $hashed_password, ':id' => $user['id']]);

    echo "Mot de passe réinitialisé avec succès ! Vous pouvez maintenant vous connecter.";
    exit;
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Réinitialiser le mot de passe</title>
</head>
<body>
<h1>Réinitialiser le mot de passe pour <?= htmlspecialchars($user['username']) ?></h1>

<form method="post">
    <label>Nouveau mot de passe :</label>
    <input type="password" name="new_password" required>
    <br>
    <label>Confirmer le mot de passe :</label>
    <input type="password" name="confirm_password" required>
    <br>
    <input type="submit" value="Réinitialiser le mot de passe">
</form>
</body>
</html>
