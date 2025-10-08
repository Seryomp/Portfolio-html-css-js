<?php
// Lecture simple du .env (format clé=valeur)
$env = parse_ini_file(__DIR__ . '/.env');

// Vérifications basiques
if (!isset($env['DB_HOST'], $env['DB_NAME'], $env['DB_USER'], $env['DB_PASS'])) {
    die("Erreur : fichier .env manquant ou incomplet (DB_*)."); //arrête le script et affiche le message d’erreur.
}

//dsn = data source name explique à PHP où et comment se connecter à la base de données.
$dsn = "mysql:host={$env['DB_HOST']};dbname={$env['DB_NAME']};charset=utf8mb4"; //mysql = type de base de données //host={$env['DB_HOST']}=l’adresse du serveur MySQL//dbname={$env['DB_NAME']}=le nom de la base de données à utiliser.//charset=utf8mb4=le jeu de caractères utilisé pour cette connexion UTF‑8

try {
    $pdo = new PDO($dsn, $env['DB_USER'], $env['DB_PASS'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    // Message générique pour les utilisateurs
    die("Erreur");
    // log l’erreur réelle dans un fichier serveur pour debug
    // error_log($e->getMessage());
}