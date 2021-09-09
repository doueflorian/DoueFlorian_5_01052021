// -- Déclarer les adresses des APIs
const cameraAPI = ('https://orinocoapidfocr.herokuapp.com/api/cameras')

// -- Déclarer la classe Camera
class Camera {
    constructor(dataCamera){
        dataCamera && Object.assign(this, dataCamera);

    }
}

// -- Fonction conversion de Prix
function convertPrice(productPrice){
    productPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', } ).format(productPrice / 100 );
    return productPrice;
}

// -- Extraction de l'id contenu dans l'URL
const getUrlID = new URLSearchParams(window.location.search);
const id = getUrlID.get('id');

// -- Déclart l'array pour accueillir les informations à envoyer dans localStorage
let productAlreadyInCart = [];
productAlreadyInCart = JSON.parse(localStorage.getItem('products'));


// Afficher icone de panier "checked" ainsi que le nombre de produits
function displayCart(){
    if(productAlreadyInCart) {
        document.querySelectorAll(".logo_cart").forEach(lc => lc.innerHTML = `<img src="https://doueflorian.github.io/projet5test/images/ori-cart-check.png" width="25" height="25" alt="image de panier" aria-hidden="true"/>`
                       + `<span class="mx-1">${productAlreadyInCart.length}</span>`)
    };
}
displayCart()
