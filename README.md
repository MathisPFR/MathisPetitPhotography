Backend - Laravel API

1. Introduction
   Ce projet est une API Laravel pour une application de photographie. Il permet de gérer les utilisateurs, les partenaires, les photos, les catégories, ainsi que les fonctionnalités de like. Il inclut également une authentification via Jetstream et Sanctum.

2. Installation
   Cloner le projet :

git clone https://github.com/MathisPFR/MathisPetitPhotography

Accéder au répertoire backend :

cd PhotographyBack

Installer les dépendances :

composer install

Configurer les variables d'environnement : Renomme le fichier .env.example en .env et configure les informations de ta base de données, par exemple :

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nom_de_ta_base
DB_USERNAME=ton_utilisateur
DB_PASSWORD=ton_mot_de_passe

Générer la clé de l'application :

php artisan key:generate

Migrer la base de données :

php artisan migrate --seed

Démarrer le serveur :

php artisan serve

3. Fonctionnalités

Authentification via Jetstream et Sanctum : Permet la gestion des utilisateurs et des tokens d'authentification.
Gestion des photos : Ajouter, modifier, supprimer et visualiser des photos avec des catégories et likes.
Gestion des partenaires : Les utilisateurs peuvent s'inscrire comme partenaires.
Gestion des catégories : Ajouter, modifier et supprimer des catégories.

4. Swagger Documentation

L'API est documentée avec Swagger. Pour générer et consulter la documentation :

Générer la documentation Swagger :

php artisan l5-swagger:generate

Accéder à la documentation via :

http://localhost:8000/api/documentation

5. Dépendances principales

Laravel 9.x
Jetstream (pour l'authentification)
Sanctum (pour les tokens API)
Swagger (pour la documentation API)
Faker (pour les données de seeding)

Frontend - React

1. Introduction
   Le frontend de ce projet est une application Single Page Application (SPA) construite avec React. Il affiche les portfolios, permet d’aimer des photos, et offre une gestion des utilisateurs connectés.

2. Installation
   Accéder au répertoire frontend :

cd PhotographyFront

Installer les dépendances :

npm install

Configurer les variables d'environnement : Crée un fichier .env à la racine du projet et configure les URLs de l'API :

REACT_APP_API_URL=http://localhost:8000/api

Démarrer l'application :

npm start

3. Fonctionnalités

Affichage du portfolio : Les utilisateurs peuvent naviguer parmi les photos, filtrer par partenaires et aimer les photos.
Gestion des utilisateurs : Connexion, enregistrement, et modification des informations personnelles.
Tableau de bord : Les partenaires peuvent gérer leurs photos, et les administrateurs peuvent gérer les utilisateurs et les photos.
Système de likes : Les utilisateurs peuvent liker des photos et retrouver leurs photos préférées dans une page dédiée.

4. Dépendances principales

React 18.x
Axios (pour les requêtes HTTP)
React Router DOM (pour la gestion des routes)
Tailwind CSS (pour le style)
Flowbite (pour les composants UI)

5. Structure des dossiers

src/ : Contient tous les fichiers source de l'application.
components/ : Tous les composants réutilisables du projet.
pages/ : Pages principales du projet.
assets/ : Fichiers CSS et images.
