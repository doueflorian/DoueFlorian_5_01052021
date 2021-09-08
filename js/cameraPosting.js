// ----- Récupération des données relatives à l'ID envoyé dans l'URL

// Création d'une fonction qui renvoie une promesse afin de l'utiliser ultérieurement
function displayProduct() {
return new Promise((resolve) => {

// Récupération des informations du produit correspondant à l'ID depuis l'API
    fetch(`http://localhost:3000/api/cameras/${id}`)
    .then( function(response) {
        return response.json() })
// Intégration des informations principales du produit dans le code HTML statique
    .then( function(dataCamera) {
            camera = new Camera(dataCamera)
            document.getElementById('cameraImg').src = camera.imageUrl;
            document.getElementById('cameraName').innerText = camera.name;
            document.getElementById('cameraDescription').innerText = camera.description;
            document.getElementById('cameraPrice').innerText = convertPrice(camera.price); 

            resolve(dataCamera);
    })
    // création d'un menu "drop-down" pour les options du produit
    .then( function(){
        let cameraLense = document.getElementById('option_produit');
        for (let lense of camera.lenses) {
            cameraLense.innerHTML += `<option value="${lense}">${lense}</option>`;
            }
    })
    // renvoi d'une erreur si soucis lors de récupération des données
    .catch((error) => {
        console.log(error, "Couldn't find products");
        alert("Couldn't find products");
    });
})
}

// ----- Appel de la fonction d'affichage du produit
displayProduct()