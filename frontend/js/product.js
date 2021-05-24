const urlApi = "http://localhost:3000/api/teddies/";

main()

async function main(){
    // Attendre d'avoir l'id du produit
    const productId = await getProductId();
    // Attendre l'appel de l'API via fetch pour recevoir les données du produit
    const productData = await getProductData(productId);
    // Remplir la page des données du produit dès qu'on a son id et que l'API a transmis les infos
    fillPage(productData)
}

function getProductId(){
    // Récupérer l'id du produit
    return new URLSearchParams(document.location.search).get("id");
}

function getProductData(productId){
    // Appel de l'API via fetch pour recevoir les données du produit
    return fetch(urlApi + productId)
        .then(function(response){
            // Récupérer la réponse en JSON
            return response.json();
        })
        .then(function(productData) {
            let teddy = new Teddy(productData);
            return teddy;
        })
        .catch(function(error){
            // Une erreur s'est produit
            alert("Le produit est indisponible pour le moment, veuillez nous excusez pour la gêne occasionnée");
    });
}

function fillPage(teddy){
    // Récupérer les données du produit
    document.getElementById("productImage").src = teddy.imageUrl;
    document.getElementById("productImage").alt += " " + teddy.name;
    document.getElementById("productName").textContent = teddy.name;
    document.getElementById("productDescription").textContent = teddy.description;
    document.getElementById("productPrice").textContent = teddy.price/100 + ",00 €";
    // Sélection d'options
    getColorsOptions(teddy);
    // Au clic du bouton
    addToShoppingCart(teddy);
    // Afficher le nombre de produits du panier dans le menu de navigation
    getCartLength();
}

function getColorsOptions(teddy){
    for (i = 0; i < teddy.colors.length; i++) {
        // Récupérer le template
        const templateElt = document.getElementById("optionTemplate");
        // Cloner le template
        const cloneTempElt = document.importNode(templateElt.content, true);
        // Remplir pour chaque clone du template
        cloneTempElt.getElementById("productColor").textContent = teddy.colors[i];
        cloneTempElt.getElementById("productColor").id = "productColor" + [i+1];
        // Afficher les clones du template à l'endroit souhaité
        document.getElementById("productOptions").appendChild(cloneTempElt);
    };
}

function addToShoppingCart(teddy){
    document.getElementById("addToCart").addEventListener("click", function(){
        // Récupérer le panier
        let getCart = JSON.parse(localStorage.getItem("cart")); // Transformer cart (du JSON récupéré dans le stockage du navigateur) en objet JS
        // Si la panier est vide
        if (getCart === null){
            // Créer un tableau
            getCart = [];
        };
        // Déclarer que l'ours n'est pas encore dans le panier
        let teddyAlreadyInCart = false;
        // Initialiser la quantité à 1
        teddy.quantity = 1;
        // Pour tous les articles du panier
        for (let index = 0; index < getCart.length; index++) {
            const article = getCart[index];
            // Si l'id de l'article = l'id de l'ours
            if (article._id === teddy._id) {
                // L'article et l'ours sont le même produit = même index
                teddyAlreadyInCart = index;
            }
        }; // Fin boucle
        // Si l'ours est déjà dans le panier
        if (teddyAlreadyInCart !== false) {
            // Incrémenter la quantité de cet ours dans le panier
            getCart[teddyAlreadyInCart].quantity += 1;
        } else { // Si l'ours n'est pas encore dans le panier
            // Ajouter le produit dans le tableau du panier
            getCart.push(teddy);
        }
        // Modifier cart (re-transformé en JSON)
        localStorage.setItem("cart", JSON.stringify(getCart));
        // Afficher l'alerte pour confirmer l'ajout
        alertAddedToCart();
        // Fermer l'alerte
        dismissAlert();
        // Nombre de produits dans le panier
        getCartLength();
    })
}

function alertAddedToCart(){
    // Récupérer le template de l'alerte
    const templateAltElt = document.getElementById("alertTemplate");
    // Cloner le template de l'alerte
    const cloneTempAltElt = document.importNode(templateAltElt.content, true);
    // Afficher l'alerte à l'endroit souhaité
    document.getElementById("mainContent").appendChild(cloneTempAltElt);
}

function dismissAlert(){
    // Récupérer le bouton de fermeture
    let btnClose = document.querySelector(".btn-close");
    // Au clic du bouton
    btnClose.addEventListener("click", function(event){
        event.preventDefault();
        // Récupérer le conteneur de l'alerte
        let alert = document.getElementById("alertAddedToCart");
        // Supprimer le conteneur de l'alerte
        alert.remove();
    });
}

function getCartLength(){
    // Récupérer le panier stocké dans le navigateur
    let getCart = JSON.parse(localStorage.getItem("cart"));
    // Récupérer l'emplacement du nombre de produit du panier
    let NumberOfProductsInCart = document.getElementById("NumberOfProductsInCart");
    if (getCart){
        let NumberOfProducts = 0;
        for (let index = 0; index < getCart.length; index++) {
            const element = getCart[index];
        // Nombre de produit dans le panier incrémenter de la valeur de la qté par élément du panier
        NumberOfProducts += element.quantity;
        }
        NumberOfProductsInCart.textContent = NumberOfProducts;
    }
}
