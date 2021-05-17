const urlApi = "http://localhost:3000/api/teddies";

main()

async function main(){
    // Attendre l'appel de l'API via fetch pour les produits
    const products = await getProducts();
    // Remplir la page des produits dès que l'API a transmis les infos
    fillPage(products)
}

function getProducts(){

}

function fillPage(products){

}

function showProduct(product){
    
}