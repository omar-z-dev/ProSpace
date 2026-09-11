/============================================

Présentation de l'architecture du projet.

=============================================/

Le projet ProSpace est organisé en plusieurs dossiers afin de séparer les différents éléments du site et de faciliter sa maintenance.

ProSpace/
│
├── public/
│ │
│ ├── data/
│ │ └── espaces.json
│ │
│ ├── css/
│ │ └── style.css
│ │
│ ├── fonts/
│ │ └──
│ │
│ ├── js/
│ │ ├── favoris.js
│ │ ├── filtres.js
│ │ └── espaces.js
│ │
│ ├── pages/
│ │ ├── contact.html
│ │ ├── fiche.html
│ │ └── mes-espaces.html
│ │
│ └── assets/
│  
│
├── index.html
│
└── README.md
│
└── scores

/============================================

SEO

=============================================/

Le référencement naturel (SEO) permet d'améliorer la compréhension du site par les moteurs de recherche et d'améliorer sa visibilité.

Balise title :

Chaque page possède un titre spécifique grâce à cette balise qui Indique le titre de la page aux moteurs de recherche.

Meta description :

Les pages utilisent également une description destinée à présenter le contenu de la page aux moteurs de recherche.

Encodage :

Le site utilise l'encodage UTF-8 :

Responsive design :

Le site est conçu pour s'adapter aux différentes tailles d'écran.

La balise viewport est utilisée : <meta
name="viewport"
content="width=device-width, initial-scale=1.0"

>

Structure des titres :

Les pages utilisent une hiérarchie de titres cohérente :

<h1>Titre principal</h1>

<h2>Section</h2>

<h3>Sous-section</h3>

/==========================================================

Documentation de l'API et du paramétrage URLSearchParams

===========================================================/

API :

ProSpace utilise une API pour récupérer certaines données nécessaires au fonctionnement du site.
Une API permet à l'application de communiquer avec une autre source de données en utilisant des requêtes HTTP , dans mon cas les donnees sont stock" dans le dossier data.
Les données sont récupérées au format JSON.

Fonctionnement :

Le JavaScript effectue une requête vers l'API.
Les données reçues sont ensuite converties depuis le format JSON afin de pouvoir être utilisées dans l'application.

/================================/

Paramétrage avec URLSearchParams :

URLSearchParams est utilisé pour gérer les paramètres présents dans l'URL dans mon cas recuperer l'id de la fiche.

const params = new URLSearchParams(window.location.search);
// recuperer l'id
const id = params.get("id");
