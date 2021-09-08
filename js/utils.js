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