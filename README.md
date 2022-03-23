# Express API

## Quickstart

- A la racine du dossier, créer un fichier `.env` qui devra contenir 2 lignes :

```
DB_ACCESS="string de connexion mongoDB"
TOKEN_KEY="clé de chiffrement JsonWebToken"
```

_Pour générer la clé de chiffrement [voir ici](https://mkjwk.org/)_

- Dans le dossier racine ➡️ `npm install` , puis `npm start`.<br>(_le terminal doit confirmer le lancement du serveur sur le port 3000 et la connexion à MongoDB_)

#### Vous pouvez utiliser l'API 👍

## Endpoints

#### /api/articles

- "/" GET
- "/" POST
- "/:id" GET
- "/:id" PUT
- "/:id" DELETE

#### /api/users

- "/" GET
- "/signup" POST
- "/login" POST
