# Polls

Serveur API de sondages.

## API

### Créer un sondage

`POST /polls`//POST: méthode d'envoi, polls: thème de l'API

Paramètres :
- question: string
- answers: string[]

Réponse en cas de succès : `201 Created`

Erreurs :
- `400 Bad Request` : Paramètres incorrects

### Lister les sondages

`GET /polls`

Réponse en cas de succès : `200 OK`
Liste des sondages (id et question) en JSON :
```
[{"id": 1, "question": "Question ?"}, ...]
```

### Récupérer un sondage et ses résultats

`GET /polls/:id`

Réponse en cas de succès : `200 OK`
Sondage en JSON :
```
{"id": 1, "question": "Question ?", "answers": ["Réponse 0", "Réponse 1"], "votes": [0, 0, 1, 0, 1]}
```

Erreurs :
- `404 Page Not Found` : Sondage non trouvé

### Voter pour une réponse d'un sondage

`POST /polls/:id/votes`

Paramètres :
- answer: Index de la réponse (number)

Réponse en cas de succès : `201 Created`

Erreurs :
- `400 Bad Request` : Paramètres incorrects
- `404 Page Not Found` : Sondage non trouvé
