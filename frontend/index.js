const urlApi = "http://localhost:3000/api/teddies";

main()

async function main(){
    // Attendre l'appel de l'API via fetch pour les produits
    const products = await getProducts();
    // Remplir la page des produits dès que l'API a transmis les infos
    fillPage(products)
}

function getProducts(){
    // Appel de l'API via fetch pour recevoir les 5 produits et leurs infos
    return fetch(urlApi)
        .then(function(response){
            // Récupérer la réponse en JSON
            return response.json();
        })
        .then(function(products) {
            return products;
        })
        .catch(function(error){
            // Une erreur s'est produit
            alert("Les produits sont indisponibles pour le moment, veuillez nous excusez pour la gêne occasionnée");
    });
}

function fillPage(products){

}

function showProduct(product){
    
}