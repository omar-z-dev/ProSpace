/*const btn = document.createElement("button");   // ← c'est un bouton !
btn.className = "favori-btn";
btn.textContent = estFav ? "♥" : "♡";

btn.addEventListener("click", () => {
    toggleFavori(article.id);
});


function toggleFavori(id) {
    const index = favorisIds.indexOf(id);
    
    if (index === -1) {
        // Pas trouvé → on ajoute
        favorisIds.push(id);
    } else {
        // Déjà présent → on supprime
        favorisIds.splice(index, 1);
    }
    
    sauvegarderFavoris();  // sauvegarde dans localStorage
    afficherArticles();    // rafraîchit l'affichage
}

// Si c'est un favori → on met la classe "coeur-plein"
// Si ce n'est pas un favori → on met la classe "coeur-vide"

btn.className = `favori-btn ${estFav ? 'coeur-plein' : 'coeur-vide'}`;*/


// Pour basculer entre vide et plein au clic :
const coeurs = document.querySelectorAll('.favt-product');
coeurs.forEach(function(coeur){
    coeur.addEventListener('click', function() {
    this.classList.toggle('coeur-vide');
    this.classList.toggle('coeur-plein');
});

});

// prduit du sites 
const produits = [
        { id: 1, nom: "iPhone 15 Pro", prix: "1 199 €" },
        { id: 2, nom: "Samsung Galaxy S24", prix: "1 099 €" },
        { id: 3, nom: "MacBook Air M3", prix: "1 499 €" },
        { id: 4, nom: "Casque Sony XM5", prix: "399 €" }
    ];
    
 // STOCKAGE DES FAVORIS 
let favoris = []; 

// Charger favoris depuis localStorage
function chargerFavoris() {
    const saved = localStorage.getItem('mesFavoris');
    if (saved) {
        favoris = JSON.parse(saved);
    }
}

// Sauvegarder favoris
function sauvegarderFavoris() {
    localStorage.setItem('mesFavoris', JSON.stringify(favoris));
}

//////////////////////////////////////////////////////*********** */
// Vérifier si un produit est favori
    function estFavori(id) {
        return favoris.includes(id);
    }
    
    // Ajouter/supprimer un favori
    function toggleFavori(id) {
        if (estFavori(id)) {
            favoris = favoris.filter(favId => favId !== id);
        } else {
            favoris.push(id);
        }
        sauvegarderFavoris();
        
        // Rafraîchir l'affichage
        afficherProduits();
        afficherListeFavoris();
        mettreAJourCompteur();
    }
    
    // ===== AFFICHER LES PRODUITS =====
    function afficherProduits() {
        const container = document.getElementById('products-container');
        container.innerHTML = '';
        
        produits.forEach(produit => {
            const estFav = estFavori(produit.id);
            
            const div = document.createElement('div');
            div.className = 'product';
            div.innerHTML = `
                <div class="product-info">
                    <div class="product-title">${produit.nom}</div>
                    <div class="product-price">${produit.prix}</div>
                </div>
                <svg class="favt-product ${estFav ? 'coeur-plein' : 'coeur-vide'}" 
                     xmlns="http://www.w3.org/2000/svg" 
                     fill="none" 
                     viewBox="0 0 24 24" 
                     stroke-width="1.5" 
                     stroke="currentColor"
                     data-id="${produit.id}">
                    <path stroke-linecap="round" stroke-linejoin="round" 
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
            `;
            container.appendChild(div);
        });
        
        // Ajouter les écouteurs d'événements sur les cœurs
        document.querySelectorAll('.favt-product').forEach(coeur => {
            coeur.addEventListener('click', function(e) {
                e.stopPropagation();
                const id = parseInt(this.dataset.id);
                toggleFavori(id);
            });
        });
    }
    
    // ===== AFFICHER LA LISTE DES FAVORIS DANS LE MENU =====
    function afficherListeFavoris() {
        const container = document.getElementById('favoris-liste-container');
        
        if (favoris.length === 0) {
            container.innerHTML = '<div class="empty-message">Aucun favori pour le moment</div>';
            return;
        }
        
        const liste = document.createElement('ul');
        liste.className = 'favoris-liste';
        
        favoris.forEach(id => {
            const produit = produits.find(p => p.id === id);
            if (produit) {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${produit.nom}</span>
                    <span class="supprimer-fav" data-id="${id}">❌</span>
                `;
                liste.appendChild(li);
            }
        });
        
        container.innerHTML = '';
        container.appendChild(liste);
        
        // Ajouter les événements supprimer
        document.querySelectorAll('.supprimer-fav').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const id = parseInt(this.dataset.id);
                toggleFavori(id);
            });
        });
    }
    
    // ===== METTRE À JOUR LE COMPTEUR =====
    function mettreAJourCompteur() {
        const badge = document.getElementById('favoris-count');
        badge.textContent = favoris.length;
    }
    
    // ===== DROPDOWN (ouvrir/fermer la liste) =====
    const favorisMenu = document.querySelector('.favoris-menu');
    const dropdown = document.getElementById('favoris-dropdown');
    
    favorisMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });
    
    // Fermer le dropdown en cliquant ailleurs
    document.addEventListener('click', function() {
        dropdown.classList.remove('show');
    });
    
    // ===== INITIALISATION =====
    chargerFavoris();
    afficherProduits();
    afficherListeFavoris();
    mettreAJourCompteur();

