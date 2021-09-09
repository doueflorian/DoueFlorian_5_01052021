// Récupérer les Appareils Photo et implanter les cartes

// récupérer les informations de l'API des appareils photo
fetch(cameraAPI)
    .then( function(response) {
        return response.json() })

// Déclarer camera qui sera un objet comprenant les informations d'un produit
    .then( dataCamera => {
        let camera = new Camera(dataCamera)  

// Loop les datas de l'API Pour afficher une carte à chaque produit
        for (camera of dataCamera) {
            document.getElementById('productsListCamera').innerHTML += `
            <div class="col-12 col-md-6 col-lg-3 g-2">
            <div class="card">
                <img src="${camera.imageUrl}" class="card-img-top" alt="appareil photo ${camera.name}">
                <div class="card-body d-flex flex-wrap justify-content-between">
                <h5 class="card-title">${camera.name}</h5>
                <span>${convertPrice(camera.price)}</span>
                <p class="product-description text-truncate">${camera.description}</p>

                <a class="stretched-link" href="camera_product.html?id=${camera._id}">Voir cet article</a>
                </div>
            </div>
        </div>`
        }
    })
// Renvoi d'une alerte en cas de non accès à l'API
    .catch((error) => {
        console.log(error, "Couldn't find products");
        alert("Couldn't find products");
    });