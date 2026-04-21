#  GitHub Data Explorer - Portfolio Dynamique

Une application web moderne et robuste qui permet d'explorer les projets GitHub d'un utilisateur en temps réel, avec une gestion avancée des erreurs et une interface utilisateur élégante.

Ce projet a été réalisé dans le cadre du cours sur la **gestion des erreurs en JavaScript** et l'utilisation des **API REST**.

## - Fonctionnalités

- **Récupération de données réelles** : Utilisation de l'API REST de GitHub.
- **Gestion des erreurs robuste** : Traitement des erreurs 404 (utilisateur non trouvé), 403 (limite de requêtes API) et erreurs réseau via `try...catch`.
- **Tri intelligent** : Les projets sont automatiquement triés par nombre d'étoiles (stars).
- **Indicateurs d'état** : Gestion d'un état de chargement (*loader*) et affichage de messages d'erreur explicites.
- **UI Dynamique** : Badges de couleurs dynamiques selon le langage de programmation utilisé (JS, Python, PHP, etc.).
- **Responsive Design** : Interface fluide construite avec une approche moderne (compatible mobile/desktop).

## - Technologies utilisées

* **HTML5** : Structure sémantique.
* **Tailwind CSS** : Pour le stylisage rapide et moderne.
* **JavaScript (ES6+)** :
    * `Fetch API` pour les requêtes réseau.
    * `Async/Await` pour la gestion de l'asynchronisme.
    * `DOM Manipulation` pour l'affichage dynamique.

## - Structure du code

Le projet se concentre sur trois piliers du développement JavaScript :

1.  **La Gestion des Erreurs** : Utilisation de `throw new Error()` pour interrompre le flux en cas de problème et redirection vers le bloc `catch`.
2.  **L'Asynchronisme** : Utilisation de `await` pour attendre la réponse du serveur et la conversion du flux JSON.
3.  **L'Optimisation** : Utilisation des méthodes `sort()` et `filter()` pour traiter les données reçues avant l'affichage.

## - Installation

1. Clonez ce dépôt :
   ```bash
   git clone [https://github.com/votre-utilisateur/github-portfolio.git](https://github.com/votre-utilisateur/github-portfolio.git)