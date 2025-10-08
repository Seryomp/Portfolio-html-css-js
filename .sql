-- Création de la base de données
CREATE DATABASE IF NOT EXISTS portfolio_db; --crée la DB si elle existe pas
USE portfolio_db; --sélectionne la DB(database)

-- Création de la table users
CREATE TABLE IF NOT EXISTS users ( --crée la table user si elle existe pas 
    id INT AUTO_INCREMENT PRIMARY KEY,  --crée un identifiant pour chaque users
    username VARCHAR(50) NOT NULL UNIQUE,   -- empêche les doublons de pseudo
    email VARCHAR(100) NOT NULL UNIQUE,     -- empêche les doublons d'email
    password VARCHAR(255) NOT NULL,  -- sert a stocker les mot de passe hashé
    reset_token VARCHAR(255) DEFAULT NULL --sert a la rénitialisation des mot de passes
);
