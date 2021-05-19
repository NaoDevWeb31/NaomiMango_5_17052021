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
    getCartLength()
    showTotalCartAmount();
    deleteCartProduct();
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

function getCartLength(){
    // Récupérer l'emplacement du nombre de produit du panier
    let NumberOfProductsInCart = document.getElementById("NumberOfProductsInCart");
    if (getCart.length > 0){
        // Nombre de produit dans le panier
        NumberOfProductsInCart.textContent = getCart.length;
    }
}

function getCartProductData(){
    // Pour tous les produits du panier
    for (let cartProduct of getCart) {
        // Récupérer le template de la ligne du panier
        const templateElt = document.getElementById("cartRowTemplate");
        // Cloner le template
        const cloneTempElt = document.importNode(templateElt.content, true);
        // Remplir pour chaque clone du template
        cloneTempElt.getElementById("productImage").src = cartProduct.imageUrl;
        cloneTempElt.getElementById("productImage").alt += " " + cartProduct.name;
        cloneTempElt.getElementById("productName").textContent = cartProduct.name;
        cloneTempElt.getElementById("productPrice").textContent = cartProduct.price/100 + ",00 €";
        cloneTempElt.getElementById("productTotalPrice").textContent = "Fonction à rajouter";
        // Afficher le clone du template à l'endroit souhaité
        document.getElementById("cartList").appendChild(cloneTempElt);
    }
}

function showTotalCartAmount(){
    // Afficher le montant total du panier quand il n'est pas vide
    if (getCart != null){
        // Récupérer le template de la ligne de total du panier
        const templateTotalElt = document.getElementById("totalCartRowTemplate");
        // Cloner le template
        const cloneTempTotalElt = document.importNode(templateTotalElt.content, true);
        // Remplir pour le clone du template
        cloneTempTotalElt.getElementById("totalCartPrice").textContent = totalCartAmount() + ",00€";
        // Afficher le clone du template à l'endroit souhaité
        document.getElementById("cartFoot").appendChild(cloneTempTotalElt);
    }
}

function totalCartAmount(){
    // Tableau des prix totaux
    let totalCartPrice = [];
    // Récupérer les prix dans le panier
    for (let index = 0; index < getCart.length; index++) {
        sumOfPricesOfProductsInCart = getCart[index].price/100;
        // Mettre tous les prix dans le tableau
        totalCartPrice.push(sumOfPricesOfProductsInCart)
    }
    // Additionner les prix du tableau
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalAmount = totalCartPrice.reduce(reducer, 0);
    // Envoyer le nouveau montant du panier dans le stockage du navigateur
    localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
    return totalAmount;
}

function deleteCartProduct(){
    // Récupérer tous les icônes de suppression
    let deleteBtn = document.querySelectorAll("#deleteProduct");
    // console.log(deleteBtn);

    // En cliquant sur chaque icône de suppression
    for (let index = 0; index < deleteBtn.length; index++) {
        deleteBtn[index].addEventListener("click", function(event){
            event.preventDefault();
            // console.log(event)

            // Supprimer l'id du produit à supprimer du panier
            let cartProductIdToDelete = getCart[index]._id;
            // console.log(cartProductIdToDelete);

            // Filtrer les produits à garder dans le panier
            getCart = getCart.filter(cartProduct => cartProduct._id != cartProductIdToDelete);
            // console.log(getCart)

            // Renvoyé "cart" modifié(re-transformé en JSON) dans le stockage du navigateur
            localStorage.setItem("cart", JSON.stringify(getCart));
            document.location.reload();
        })
    }
}

function formCheck(){
}

function sendOrder(){
}