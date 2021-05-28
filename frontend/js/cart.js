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
    getCartLength();
    showTotalCartAmount();
    deleteCartProduct();
    emptyCart();
    getOrder();
    order();
}

function getCartList(){
    // Si la panier est vide
    if (getCart != null){
        for (let i = getCart.length - 1; i >= 0; i--) {
            let cartProduct = getCart[i];
            // Appel de l'API via fetch pour récupérer les données du stockage
            return fetch(urlApi + cartProduct._id)
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
    // Si le panier est vide
    } else {
        emptyCartList()
    }
}

function emptyCartList(){
    let cartTable = document.getElementById("cartTable");
    let emptyCartRow = document.getElementById("emptyCartRow")
    let cartRowContent = document.getElementById("cartRowContent");
    cartTable.removeChild(cartRowContent);
    cartTable.removeChild(emptyCartRow);
    // Afficher l'alerte
    alertEmptyCart();
    // Fermer l'alerte
    dismissAlert();
}

function alertEmptyCart(){
    // Récupérer le template de l'alerte
    const templateAltElt = document.getElementById("alertTemplate");
    // Cloner le template de l'alerte
    const cloneTempAltElt = document.importNode(templateAltElt.content, true);
    // Afficher l'alerte à l'endroit souhaité
    document.getElementById("cartTable").appendChild(cloneTempAltElt);
}

function dismissAlert(){
    // Récupérer le bouton de fermeture
    let btnClose = document.querySelector(".btn-close");
    // Au clic du bouton
    btnClose.addEventListener("click", function(event){
        event.preventDefault();
        // Récupérer le conteneur de l'alerte
        let alert = document.getElementById("alertEmptyCart");
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
        if (NumberOfProducts < 1){
            NumberOfProductsInCart.innerText = "";
        }
    }
}

function getCartProductData(){
    // Pour chaque produit du panier
    for (let index = 0; index < getCart.length; index++) {
        let cartProduct = getCart[index];
        // Récupérer le template de la ligne du panier
        const templateElt = document.getElementById("cartRowTemplate");
        // Cloner le template
        const cloneTempElt = document.importNode(templateElt.content, true);
        // Remplir pour chaque clone du template
        cloneTempElt.getElementById("productImage").src = cartProduct.imageUrl;
        cloneTempElt.getElementById("productImage").alt += " " + cartProduct.name;
        cloneTempElt.getElementById("productLink").href = "product.html?id=" + cartProduct._id;
        cloneTempElt.getElementById("productName").textContent = cartProduct.name;
        cloneTempElt.getElementById("productPrice").textContent = cartProduct.price/100 + ",00 €";
        cloneTempElt.getElementById("productQuantity").selectedIndex = cartProduct.quantity - 1;
        cloneTempElt.getElementById("productTotalPrice").textContent = (cartProduct.quantity * cartProduct.price) / 100 + ",00 €";
        // Au changement de la quantité
        const quantityEltId = cloneTempElt.getElementById("productQuantity");
        quantityEltId.addEventListener("change", function(event){
            event.preventDefault();
            const newQuantity = event.target.selectedIndex + 1;
            const subtotalId = event.target.parentElement.parentElement.parentElement.parentElement.querySelector("#productTotalPrice");
            const newSubtotal = (cartProduct.price * newQuantity) / 100 + ",00 €";
            subtotalId.textContent = newSubtotal;
            // for (const cartProduct of getCart) {
            //     console.log(cartProduct.newQuantity);
            // }
        })
        // Afficher le clone du template à l'endroit souhaité
        document.getElementById("cartList").appendChild(cloneTempElt);
    }
}

//                                     PAS ENCORE BON

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
    let totalCartPrices = [];
    // Récupérer les prix dans le panier
    for (let index = 0; index < getCart.length; index++) {
        let element = getCart[index];
        let productSubtotal = element.price/100 * element.quantity;
        // Mettre tous les prix dans le tableau
        totalCartPrices.push(productSubtotal)
    }
    // Additionner les prix du tableau
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalAmount = totalCartPrices.reduce(reducer, 0);
    // Envoyer le nouveau montant du panier dans le stockage du navigateur
    localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
    return totalAmount;
}

//                                     PAS ENCORE BON - FIN

function deleteCartProduct(){
    // Récupérer tous les icônes de suppression
    let deleteBtn = document.querySelectorAll("#deleteProduct");
    // En cliquant sur chaque icône de suppression
    for (let index = 0; index < deleteBtn.length; index++) {
        deleteBtn[index].addEventListener("click", function(event){
            event.preventDefault();
            // Supprimer l'id du produit à supprimer du panier
            let cartProductIdToDelete = getCart[index]._id;
            // Filtrer les produits à garder dans le panier
            getCart = getCart.filter(cartProduct => cartProduct._id != cartProductIdToDelete);
            // Renvoyé "cart" modifié(re-transformé en JSON) dans le stockage du navigateur
            localStorage.setItem("cart", JSON.stringify(getCart));
            document.location.reload();
        })
    }
    // Si le total = 0,00€
    if (document.getElementById("totalCartPrice").textContent == "0,00€") {
        emptyCartList();
        localStorage.clear();
    }
}

function emptyCart(){
    let btnEmptyCart = document.getElementById("emptyCart");
    btnEmptyCart.addEventListener("click", function(event){
        event.preventDefault();
        localStorage.clear();
        document.location.reload();
    })
}

//                                      FORMULAIRE
const firstNameId = document.getElementById("firstName");
const lastNameId = document.getElementById("lastName");
const addressId = document.getElementById("address");
const zipId = document.getElementById("zip");
const cityId = document.getElementById("city");
const emailId = document.getElementById("email");

// Tableau de champs
const formFields = [firstNameId, lastNameId, addressId, zipId, cityId, emailId];

// Validation pour noms et ville
const nameRegEx = (value) => {
    return /^[A-Za-zéÉèÈêÊàÀôëçî'-]{3,20}$/.test(value);
}
// Validation pour adresse
const adressRegEx = (value) => {
    return /^(?:[0-9]{1,3})+(?: [a-zA-Z]{3,15})+(?:[ a-zA-ZéÉèÈêÊàÀôëçùî^_¨'-]{2,50})$/.test(value);
}
// Validation pour code postal
const zipRegEx = (value) => {
    return /^[0-9]{5}$/.test(value);
}
// Validation pour email
const emailRegEx = (value) => {
    return /^[a-zA-Z0-9&^_¨-]+(?:.[a-zA-Z0-9&^_¨-]+)@[a-zA-Z]+[.](?:[a-z]{2,3})$/.test(value);
}

function formCheck(formField, regEx){
    // À la saisie du champ sélectionné
    formField.addEventListener("input", function(event){
        // Si l'expression régulière sélectionnée est correcte
        if (regEx(event.target.value)){
            event.target.classList.add("is-valid");
            event.target.classList.replace("is-invalid","is-valid");
            return true;
        // Sinon
        } else if (regEx(event.target.value) == false ){
            event.target.classList.add("is-invalid");
            event.target.classList.replace("is-valid", "is-invalid");
            console.log("FALSE");
            return false;
        }
    });
    // Après une première saisie, quand le champ est en focus
    formField.addEventListener("focus", function(event){
        if (event.target.value === "") {
            event.target.classList.remove("is-valid", "is-invalid");
            console.log("EN COURS");
        }
    });
}

// Valider le champ de prénom
formCheck(firstNameId, nameRegEx);
// Valider le champ de nom
formCheck(lastNameId, nameRegEx);
// Valider le champ d'adresse
formCheck(addressId, adressRegEx);
// Valider le champ de code postal
formCheck(zipId, zipRegEx);
// Valider le champ de ville
formCheck(cityId, nameRegEx);
// Valider le champ d'email
formCheck(emailId, emailRegEx);

function getOrder(){
    // Récupérer tous les inputs du formulaire
    let inputs = document.querySelectorAll("input");
    for (let index = 0; index < inputs.length; index++){
        const element = inputs[index];
        // Pour chaque input, écouter une fois la saisie achevée
        element.addEventListener("change", function(){
            // Si l'input est validé (bordure verte)
            if (element.className === "form-control is-valid"){
                console.log("CHAMP "+element.id+" VALIDÉ");
                // Créer l'objet "contact" à envoyer et ajouter la valeur
                let contact = {
                    "firstName" : firstNameId.value,
                    "lastName" : lastNameId.value,
                    "address" : addressId.value + " " + zipId.value,
                    "city" : cityId.value,
                    "email" : emailId.value
                };
                // Stocker "contact" dans le navigateur
                localStorage.setItem("contact", JSON.stringify(contact));
            }
        })
    }
    // Créer le tableau "products" à envoyer
    let products = [];
    // Ajouter les id des articles du panier dans le tableau products
    for (let e = 0; e < getCart.length; e++) {
        const element = getCart[e];
        products.push(element._id)
    }
    // Modifier le tableau products (re-transformé en JSON)
    localStorage.setItem("products", JSON.stringify(products));
}

function sendOrder(){
    const contact = JSON.parse(localStorage.getItem("contact"));
    const products = JSON.parse(localStorage.getItem("products"));
    // Regrouper infos client + produits et montant total
    const customerOrder = JSON.stringify({contact, products});
    // Si les 6 inputs sont validés (6 bordures vertes)
    if (document.querySelectorAll(".form-control.is-valid").length == 6) {
        // Faire la requête POST
        fetch(urlApi + "order",{
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: customerOrder
        })
            .then(function(response){
                // Récupérer la réponse en JSON
                return response.json();
            })
            .then(function(response) {
                // Stocker l'objet qui regroupe les infos client + produits et le montant total dans le navigateur
                localStorage.setItem("customerOrder", customerOrder);
                localStorage.removeItem("cart");localStorage.removeItem("products");localStorage.removeItem("contact");
                localStorage.setItem("orderId", response.orderId)
                window.location.href = "orderConfirmation.html?orderId=" + response.orderId;
            })
            .catch(function(error){
                // Une erreur s'est produit
                alert("Erreur lors de l'envoi de la commande");
            });
    // Si les 6 inputs ne sont pas validés
    } else {
        alert("Veuillez correctement remplir le formulaire !")
    }
}

function order(){
    // Récupérer le bouton "commander"
    document.getElementById("formSubmit").addEventListener("click", function(event){
        event.preventDefault();
        // Au clic du bouton,récupérer et envoyer les infos du panier et le formulaire
        sendOrder();
    })
}
