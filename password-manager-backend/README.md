# Password Manager Backend

Ce projet est le backend d'un gestionnaire de mots de passe. Il fournit une API RESTful pour gérer les mots de passe des utilisateurs.

## Fonctionnalités

- Ajouter un nouveau mot de passe
- Supprimer un mot de passe
- Modifier un mot de passe existant

## Prérequis

- Node.js (v14.0.0 ou supérieur)
- MongoDB

## Installation

1. Clonez ce dépôt :
   ```
   git clone https://github.com/votre-nom/password-manager-backend.git
   ```

2. Installez les dépendances :
   ```
   cd password-manager-backend
   npm install
   ```

3. Créez un fichier `.env` à la racine du projet et ajoutez les variables d'environnement nécessaires :
   ```
   MONGODB_URI=votre_uri_mongodb
   PORT=5000
   ```

## Démarrage

Pour démarrer le serveur en mode développement :

```
npm run dev
```

Le serveur démarrera sur `http://localhost:5000` (ou le port spécifié dans votre fichier `.env`).

## Routes API

- `GET /api/passwords` : Récupère tous les noms d'utilisateur
- `POST /api/passwords` : Ajoute un nouveau mot de passe
- `DELETE /api/passwords` : Supprime un mot de passe
- `PUT /api/passwords` : Modifie un mot de passe existant

## Sécurité

Les mots de passe sont hachés avec bcrypt avant d'être stockés dans la base de données.

## Contribution

Les pull requests sont les bienvenues. Pour les changements majeurs, veuillez d'abord ouvrir une issue pour discuter de ce que vous aimeriez changer.

## Licence

[MIT](https://choosealicense.com/licenses/mit/)

