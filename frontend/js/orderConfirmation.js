// Récupérer l'identifiant de la commande pour l'URL
function getOrderId(){
    return new URLSearchParams(document.location.search).get("orderId")
}
getOrderId()

// Récupérer l'identifiant de la commande stocké dans le navigateur
const orderId = localStorage.getItem("orderId");
// Récupérer les infos de la commande du client stocké dans le navigateur
const customerOrder = JSON.parse(localStorage.getItem("customerOrder"));
// Récupérer le tableau de produits
const products = customerOrder.products;
// Récupérer les infos du client
const contact = customerOrder.contact;
// Récupérer le montant de la commande
const orderAmount = localStorage.getItem("totalAmount");

function showOrderData(){
    // Récupérer le template de la page de confirmation
    const templateElt = document.getElementById("orderDataTemplate");
    // Cloner le template
    const cloneTempElt = document.importNode(templateElt.content, true);
    // Remplir chaque élément du clone du template
    cloneTempElt.getElementById("orderId").textContent = orderId;
    cloneTempElt.getElementById("customerFirstName").textContent = contact.firstName;
    cloneTempElt.getElementById("orderAmount").textContent = orderAmount + ",00 €";
    cloneTempElt.getElementById("customerEmail").textContent = contact.email;
    // Afficher le clone du template à l'endroit souhaité
    document.getElementById("mainContent").appendChild(cloneTempElt);
}
showOrderData()

const btnToHomepage = document.querySelector("button.btn");
btnToHomepage.addEventListener("click", function(){
    localStorage.clear();
})
