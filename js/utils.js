// -- Déclarer les adresses des APIs
const cameraAPI = ('http://localhost:3000/api/cameras')

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



