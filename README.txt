CATALOGUE XBOX — VERSION DE DÉPART

Cette archive contient le squelette fonctionnel du site (interface, recherche, filtres et pagination).
La liste complète n'est PAS encore incluse : elle doit être collectée et vérifiée depuis les pages de Speedy Games Downloads.

Contenu :
- index.html : page principale
- style.css : présentation responsive
- app.js : recherche, filtres et pagination
- data/games.json : données du catalogue (actuellement vide)
- jeux/ : structure prévue pour les dossiers par plateforme/catégorie

Lancer en local :
- Certains navigateurs bloquent fetch() lorsqu'on ouvre index.html directement en file://.
- Pour tester, utiliser un hébergement statique ou un petit serveur HTTP local.
- Après ajout des données, publier l'ensemble du dossier sur un hébergement statique.

Format d'une entrée dans data/games.json :
{
  "title": "Titre du jeu",
  "platform": "Xbox 360",
  "type": "Arcade",
  "year": "2010",
  "genre": "Action",
  "publisher": "Éditeur",
  "developer": "Développeur",
  "description": "Description",
  "views": 123,
  "cover": "images/nom-du-jeu/jaquette.jpg",
  "url": "https://speedygamesdownloads.com/..."
}

Aucun jeu, aucune jaquette et aucune capture n'ont été inventés ou ajoutés à cette version de départ.
Les bandes-annonces ne sont pas intégrées.
