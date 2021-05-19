// Récupérer l'identifiant de la commande
const orderId

// Récupérer les infos du client de la commande stocké dans le navigateur
const contact

// Récupérer le montant de la commande stocké dans le navigateur
const orderAmount

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