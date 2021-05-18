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

}

function getProductData(productId){

}

function fillPage(product){

}

function addToShoppingCart(product){

}