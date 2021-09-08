// ----- Afficher "Votre panier est vide"
//si le tableau issu de localStorage est vide.
if(productAlreadyInCart === null) {
    document.getElementById('panier').innerHTML =
    `<div class="mt-4 h4">Le panier est vide</div>`
      // -- Cacher la fin du tableau de récapitulatif produit
    document.getElementById('tfoot').classList.add("d-none")
  }else{
  // ------ Début de la condition qui affiche le panier 
    // Lien pour vider le panier
    document.getElementById('clearCart').addEventListener('click', function() {
      localStorage.removeItem("products");
        // Recharger la page pour mettre à jour l'affichage du panier
      document.location.reload();
    });
    
  
    // ----- Début de la boucle prévue à l'affichage des produits du panier
    for ( let cartProduct of productAlreadyInCart) {
  
      // ----- Calcul prix produit part sa quantité
      cartProduct.fullPrice = cartProduct.price * cartProduct.quantity; 
  
        // Création du contenu HTML affichant les éléments du panier qui s'incrémente par produit présent dans le tableau
        document.getElementById('cartProducts').innerHTML +=
                `<tr class="line">
                    <td><a href="../products/camera_product.html?id=${cartProduct.id}">${cartProduct.name}</a></td>
                    <td>
                        <select data-id="${cartProduct.id}" class="form-select quantity">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        </select>
                    </td>
                    <td class="productPrice">${convertPrice(cartProduct.price)}</td>
                    <td id="${cartProduct.id}" class="productTotalPrice">${convertPrice(cartProduct.fullPrice)}</td>
                    <td><button data-id="${cartProduct.id}" class="btn-delete">X</button></td>
                </tr>`

        // ----- Récupérer la quantité depuis le localStorage 
        // ----- et afficher la bonne quantité au chargement de la page
        // Récupération des options de quantité
        document.querySelectorAll(".quantity").forEach((function(q) {   
                // Création d'une variable qui contient l'id du produit à mettre à jour
            let quantityToShow = q.getAttribute("data-id");
                // Récupération du produit correspondant à l'ip dans le tableau récupéré depuis localStorage
            let originalQuantity = productAlreadyInCart.find( el => el.id == quantityToShow);
                // récupération de l'élément HTML correspondant au produit ciblé via son ID
            let quantityToDisplay = document.querySelector(`select[data-id="${quantityToShow}"]`);
                // mise à jour de l'index par la quantité du produit -1 pour correspondre à un index partant de 0
            quantityToDisplay.selectedIndex = originalQuantity.quantity - 1;
        }));

        // ----- Modification de la quantité depuis le panier, mise à jour du prix.
        // Récupération des changements de quantité
        document.querySelectorAll(".quantity").forEach(q => q.addEventListener('change', function(e) {   
              // Création d'une variable qui contient l'id du produit à mettre à jour
            let quantityToUpdate = q.getAttribute("data-id");
              // Récupération du produit correspondant à l'ip dans le tableau récupéré depuis localStorage
            let updatedProduct = productAlreadyInCart.find( el => el.id == quantityToUpdate);
              // mise à jour de la quantité, converti le résultat obtenu en chiffre
            updatedProduct.quantity = parseInt(e.target.value);
             // mise à jour du prix
            updatedProduct.fullPrice = updatedProduct.price * e.target.value;
             // renvoi du tableau modifié dans le local storage
            localStorage.setItem("products", JSON.stringify(productAlreadyInCart)); 
              // récupération de l'élément HTML correspondant au prix total du produit par son ID contenant l'ID du produit
            let textToUpdate = document.getElementById(quantityToUpdate);
              // affichage du prix mis à jour pour le client
            textToUpdate.innerText = `${convertPrice(updatedProduct.fullPrice)}`;
          }));
        
  
        // ----- Suppression d'un produit par son ID
        // Récupération du clic de suppression d'un élément 
        document.querySelectorAll(".btn-delete").forEach(del => del.addEventListener("click", function(e){
        if( productAlreadyInCart.length === 1) {
            // Si la longueur du tableau récupéré du localStorage est égal à 1
            // vider le localStorage et recharger la page pour mettre à jour l'affichage du panier
            // condition implatée afin de s'assurer de vider le storage et ne pas y laisser un tableau vide 
          localStorage.clear();
          document.location.reload();
        }else{ 
          e.preventDefault;
            // Création d'une variable qui contient l'id du produit à mettre à jour
          productToDelete = del.getAttribute("data-id");
            // Elimination du produit dans le tableau récupéré du localStorage
          productAlreadyInCart = productAlreadyInCart.filter( el => el.id !== productToDelete);
            // renvoi du tableau modifié dans le local storage
          localStorage.setItem('products', JSON.stringify(productAlreadyInCart));
            // Rafraichissement de la page afin de prendre la suppresion en compte
          document.location.reload();
  
        };
      }));
  
    }
    //  fin de la boucle des produits du panier. -----
  
    // ----- Fonction de Calcul du prix total du panier
    // Vérification de présence de produits dans le panier
    function CalculateCartTotalPrice() {
        if(productAlreadyInCart) {
            // Récupération de l'emplacement du prix
        let cartTotalPrice = document.getElementById("cart_total_price");
            // Création d'un tableau pour stocker les différents prix
            let allProductPrices = [];
            // Récupération des prix (prix produit * quantité) dans le tableau
        for ( let product of productAlreadyInCart) {
            allProductPrices.push(product.fullPrice)
        }
            // Calcul des prix et conversion
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        cartTotalPrice.innerText = convertPrice(allProductPrices.reduce(reducer));
        }else{
        // Imprimer que le panier est vide dans la console
        console.log("Cart is empty")
        };
    }

    // Appel de la fonction afin d'afficher le prix au chargement de la page
    CalculateCartTotalPrice()

    // Appel de la fonction à chaque changement de quantité par l'utilisateur
    document.querySelectorAll(".quantity").forEach(q => q.addEventListener('change', function() {
        CalculateCartTotalPrice()
    }));
  
  }
  //  fin de la condition qui affiche les paniers -----
  
  
