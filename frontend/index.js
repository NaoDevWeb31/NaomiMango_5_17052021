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
    // Remplir la page des produits en suivant le template
    for (const product of products) {
        showProduct(product);
    }
    // Afficher dans le menu de navigation le nombre de produit dans le panier
    getCartLength()
}

function showProduct(product){
    // Récupérer le template
    const templateElt = document.getElementById("templateProduct");
    // Cloner le template
    const cloneTempElt = document.importNode(templateElt.content, true);
    // Remplir chaque clone du template
    cloneTempElt.getElementById("productLink").href = "html/product.html?id=" + product._id;
    cloneTempElt.getElementById("productImage").src = product.imageUrl;
    cloneTempElt.getElementById("productImage").alt += " " + product.name;
    cloneTempElt.getElementById("productName").textContent = product.name;
    cloneTempElt.getElementById("productPrice").textContent = product.price/100 + ",00 €";
    // Afficher les clones du template à l'endroit souhaité
    document.getElementById("productsList").appendChild(cloneTempElt);
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