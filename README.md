# Mise en place API REST

Voir [expressjs](https://expressjs.com/)

# Interaction avec MongoDB

- Créer une [base de données hébergée dans le cloud](https://cloud.mongodb.com)
- Utiliser [mongoose](https://mongoosejs.com/) pour interagir avec la base de données

# Env
Le parametrage de l'application doit être extrait du code :

  - url de connection à la BDD
  - port d'écoute du serveur HTTP

Voir : [dotenv](https://www.npmjs.com/package/dotenv)

# Validation de modèles

 - Le titre d'une note doit faire au moins 5 caracteres
 - Le contenu d'une note doit faire au moins 10 caracteres

# Refactorisation des modèles

 - Chaque modèle dans un fichier dédié

# Gestion des sessions et des droits utilisateurs

 - CRUD de compte utilisateur
 - Autorisation sur les routes Express

 Voir : [passportjs](https://www.passportjs.org/)


# Refactorisation des routes

- Chaque domaine fonctionnel dans un fichier dédié

Voir : [expressjs Routing](https://expressjs.com/en/guide/routing.html)

# Déployer en prod
- Heroku ?
- Vercel.com ?