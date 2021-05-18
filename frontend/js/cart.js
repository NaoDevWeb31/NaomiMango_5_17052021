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

}

function getCartList(){

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