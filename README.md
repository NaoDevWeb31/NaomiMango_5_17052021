# NaomiMango_5_17052021 - Orinoco

### Projet 5 du parcours "Développeur web" d'OpenClassrooms - Construisez un site e-commerce

![Logo](https://raw.githubusercontent.com/NaoDevWeb31/NaomiMango_5_17052021/main/frontend/img/logo.png)

## Objectif

Créer un premier MVP pour démontrer le fonctionnement des applications thématiques d'Orinoco, une entreprise de commerce en ligne. Développer la partie front-end de l'application.

## Installation

- Prérequis

  - Node
  - `npm`

- Dans le terminal

  - se déplacer dans le dossier "backend"
  - exécuter `npm install`
  - exécuter `node server`
  - si tout va bien, le terminal affichera `Listening on port 3000` ou `Listening on port 3001`

- Ouvrir le fichier index.html dans un navigateur

## Fonctionnalités

#### Architecture générale - Application web de 4 pages

- Page de vue

  - liste de tous les articles disponibles à la vente

- Page “Produit”

  - affichage dynamique de l'élément sélectionné par l'utilisateur
  - permettre de personnaliser le produit grâce un menu déroulant permettant à l'utilisateur de choisir une option de personnalisation. Cependant, celle-ci ne sera ni envoyée au serveur ni reflétée dans la réponse du serveur. La personnalisation du produit ne sera pas fonctionnelle pour le MVP
  - permettre d’ajouter le produit à son panier

- Page “Panier”

  - résumé des produits dans le panier
  - affichage du prix total
  - formulaire permettant de passer une commande (les données du formulaire doivent être correctes et bien formatées avant d'être renvoyées au back-end)

- Page de confirmation de commande

  - remercier l'utilisateur pour sa commande
  - affichage du prix total et de l'identifiant de commande envoyé par le serveur

#### Catégorie de produits présentés et type de données/produit

- Ours en peluche faits à la main

  - colors (array de strings)
  - \_id (ObjectID)
  - name (string)
  - price (number)
  - description (string)
  - imageUrl (string)

#### URL de l'API et ses paramètres

- http://localhost:3000/api/teddies

  - pour une requête GET : "/" qui retourne un tableau de tous les éléments
  - pour une requête GET : "\_id" qui renvoie l'élément correspondant à l'identifiant "given_id"
  - pour une requête POST : "/order" qui retourne l'objet "contact" et le tableau "products" (demandés dans le corps de la requête JSON) et "orderId" (string)

#### Validation des données

- Pour les routes POST

  - l’objet "contact" envoyé au serveur : doit contenir les champs firstName, lastName, address, city et email
  - le tableau des produits envoyé au backend : doit être un array de strings "products"

- Les types de ces champs et leur présence : doivent être validés avant l’envoi des données au serveur

## Contraintes techniques

- Aucune maquette n'est fournie
- 2 fonctionnalités JS
  - localStorage pour le panier
  - les paramètres de requête de l’URL pour la page "produit"
- Coder en HTML, CSS et JavaScript
- Le code source devra être indenté
- Utiliser des commentaires
- Le code devra également utiliser des fonctions globales
- Pour l’API : utiliser des promesses pour éviter les rappels
- Les inputs des utilisateurs : doivent être validés avant l’envoi à l’API
