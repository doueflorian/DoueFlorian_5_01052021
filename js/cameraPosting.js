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
            document.getElementById('camera_img').src = camera.imageUrl;
            document.getElementById('camera_name').innerText = camera.name;
            document.getElementById('camera_description').innerText = camera.description;
            document.getElementById('camera_price').innerText = convertPrice(camera.price); 

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

// ----- Appel de la fonction d'affichage du produit et code utile au localStorage
displayProduct().then(camera => {

    // Récupération du choix d'option produit
    let chosenOption = document.querySelector('#option_produit');

    // Récupération du clic d'ajout au panier
    document.getElementById('addToCart').addEventListener('click', (e) => {
       e.preventDefault();
        // envoi sur la pager panier au clic
        if (window.confirm("Produit ajouté au panier \n Souhaitez vous être redirigé vers le panier ?")) {
            document.location.href = "../panier.html" 
        }
        
       
        // Déclaration de l'objet à remplir avant envoi au panier
        let productToCart = {
            id : camera._id,
            name : camera.name,
            // Récupération de la valeur du choix du produit
            option : chosenOption.value,
            price : camera.price,
            quantity : 1,
            fullPrice : "",     
        }

        // Création d'une variable qui variable pour stocker true ou false
        // sur la présence ou non du produit dans le panier 
        let alreadyThere;

            // Déclaration d'un tableau qui reçoit tous les IDs de produits présents dans le panier
            let inCartIDs = [];
            // Push des IDs présent dans le tableau inCartIDs
            if(productAlreadyInCart) {
                productAlreadyInCart.forEach(p => inCartIDs.push(p.id));
            }

            // Boucle qui renvoie true si l'ID est déjà présent dans le panier
            // Recherche de l'ID
                if(inCartIDs.includes(productToCart.id)){
                    // Renvoi que le produit est déjà dans le panier
                    alreadyThere = true;
                }else{
                    // Renvoi que le produit n'est pas dans le panier
                    alreadyThere = false;
                }
        

        if(productAlreadyInCart && alreadyThere){ 
            // Si produit déjà présent, augmenter sa valeur de + 1, renvoi du panier dans le localStorage
            let addQuantityToProduct = productAlreadyInCart.find( el => el.id == productToCart.id);
            addQuantityToProduct.quantity += 1;
            localStorage.setItem("products", JSON.stringify(productAlreadyInCart));
            //  mettre icone panier à jour
            displayCart();
        }else if (productAlreadyInCart && alreadyThere == false){                   
            // Si produit déjà présent, augmenter sa valeur de + 1, renvoi du panier dans le localStorage
            productAlreadyInCart.push(productToCart);
            localStorage.setItem("products", JSON.stringify(productAlreadyInCart));
            //  mettre icone panier à jour
            displayCart();
        }else{     
            // Si panier vide, redéclaration d'un tableau vide et ajout du produit.
             productAlreadyInCart = [];
             productAlreadyInCart.push(productToCart)
             localStorage.setItem("products", JSON.stringify(productAlreadyInCart));
            //  mettre icone panier à jour
             displayCart();
        }       

    });

});