const urlApi = "http://localhost:3000/api/teddies/";

// Récupérer les infos envoyées dans le panier (transformé de JSON en objet JS et stocké dans le navigateur)
let getCart = JSON.parse(localStorage.getItem("cart"));

main()

async function main(){
    // Attendre d'avoir la liste du panier
    const cartList = await getCartList();
    // Attendre l'appel de l'API via fetch pour recevoir les données des produits du panier
    const cartProductData = await getCartProductData(cartList);
    // Remplir la page des données du produit dès qu'on a la liste du panier et que l'API a transmis les infos
    fillPage(cartProductData)
}

function fillPage(){
    getCartList();
    showTotalCartAmount();
}

function getCartList(){
    // Si la panier est vide
    if (getCart != null){
        for (let i = getCart.length - 1; i >= 0; i--) {
            // Appel de l'API via fetch pour récupérer les données du stockage
            return fetch(urlApi + getCart[i]._id)
                .then(function(response){
                    // Récupérer la réponse en JSON
                    return response.json();
                })
                .then(function(cartProductData) {
                    // Récupérer les données stockées dans le panier (stockage navigateur)
                    return cartProductData;
                })
                .catch(function(error){
                    // Une erreur s'est produit
                    alert("Le panier est indisponible pour le moment, veuillez nous excusez pour la gêne occasionnée");
                })
        }
    }
}

function getCartProductData(){

}

function showTotalCartAmount(){

}

function totalCartAmount(){

}

function formCheck(){

}

function sendOrder(){

}