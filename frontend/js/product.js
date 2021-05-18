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
            return productData;
        })
        .catch(function(error){
            // Une erreur s'est produit
            alert("Le produit est indisponible pour le moment, veuillez nous excusez pour la gêne occasionnée");
    });
}

function fillPage(product){
    // Récupérer les données du produit
    document.getElementById("productImage").src = product.imageUrl;
    document.getElementById("productImage").alt += " " + product.name;
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productDescription").textContent = product.description;
    document.getElementById("productPrice").textContent = product.price/100 + ",00 €";
}

function addToShoppingCart(product){

}