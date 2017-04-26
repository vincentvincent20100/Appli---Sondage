const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid/v4")

var app = express(); // instance d'application express
// use ajoute un middleware
app.use(bodyParser.json()); // va traiter les données au format .json et les rendre au format javascript
app.use(bodyParser.urlencoded()); // va traiter les données au format "url encodées" et les rendre au format javascript

/* création du sondage en dur */
const polls = [
  {
    id: 3,
    question: "Question ?",
    answers: ["Réponse 1", "Réponse 2", "Réponse 3"],
    votes: []
  },
  {
    id: 2,
    question: "Question 2 ?",
    answers: ["Réponse 1", "Réponse 2", "Réponse 3"],
    votes: [1,0,0,2,1,0,1,1] //réponses données par les utilisateurs
  }
]


/* création du sondage via une requete POST */

app.post('/nouveausondage', function (req, res){
  // vérifie que la question est une chaine de caractère
  if (typeof (req.body.question) !== 'string'){
    return res.sendStatus(400);
  }
  // vérifie si answers est un tableau
  if (!Array.isArray(req.body.answers) ||
    req.body.answers.some(a => typeof (a) !== 'string')){ //vérifie qu'au moins un élément ne soit pas de type string
    return res.sendStatus(400);
  }

  // créé un nouvel id unique, supérieur à tous les autres
  const id = polls.reduce((max,p) => max > p.id ? max : p.id, 0) + 1;

  // créé un nouvel objet sondage
  const poll = {
    "id":uuid(),
    "question": req.body.question,
    "answers": req.body.answers,
    "votes": []
  };
  polls.push(poll); //ajoute le dernier poll au tableau des polls
  res.send(201, poll); //retourne le poll avec le bon code HTTP
});


/* affichage de la liste des sondages */
  /* get : définition d'une route,
  function : appelée à chaque fois qu'une requete est faite
  req : objet Request,rep : objet Response */
app.get('/sondage', function (req, res){
  res.send(polls);
});


/* afficher un sondage et ses résultats */
app.get("/sondage/:id", function (req, res) {
  const id = parseInt(req.params.id); // params contient tous les paramètres extraits
  const poll = polls.find(p => p.id === id); // find parcours les objets (qu'on nomme p) du tableau polls
  if (typeof(poll) === 'undefined'){
    res.sendStatus(404); // retourn erreur 404
  }else{
    res.send(poll); // retourne le sondage
  }
});


/* voter pour une réponse d'un sondage */



/* insertion en BDD
db.polls.insert(
  {
    "id":uuid(),
    "question": req.body.question,
    "answers": req.body.answers,
    "votes": []
  }
  {

  }
)
*/


app.listen(3000); // écoute sur le port 3000
