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
  document.querySelectorAll('[data-id=clearCart').forEach(clear => clear.addEventListener('click', function() {
    localStorage.removeItem("products");
      // Recharger la page pour mettre à jour l'affichage du panier
    document.location.reload();
  }));
  

  // ----- Début de la boucle prévue à l'affichage des produits du panier
  for ( let cartProduct of productAlreadyInCart) {

    // ----- Calcul prix produit part sa quantité
    cartProduct.fullPrice = cartProduct.price * cartProduct.quantity; 

      // Création du contenu HTML affichant les éléments du panier qui s'incrémente par produit présent dans le tableau
      document.getElementById('cartProducts').innerHTML +=
              `<tr>
                  <td><a href="/../../products/camera_product.html?id=${cartProduct.id}">${cartProduct.name}</a></td>
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
                  <td class="d-none d-md-table-cell" data-id="${cartProduct.id}" class="productTotalPrice">${convertPrice(cartProduct.fullPrice)}</td>
                  <td class="d-none d-md-table-cell"><button data-id="${cartProduct.id}" class="btn-delete">X</button></td>
              </tr>
              <tr class="d-md-none border-dark">
                <td>
                  <button data-id="${cartProduct.id}" class="btn-delete">supprimer</button>
                </td>
                <td>
                <span class="fw-bold text-end">Total : </span>
                </td>
                <td class="d-md-none border-dark" data-id="${cartProduct.id}" class="productTotalPrice">
                ${convertPrice(cartProduct.fullPrice)}
                </td>
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
          let textToUpdate = document.querySelectorAll(`td[data-id="${quantityToUpdate}"]`);
          console.log(textToUpdate)
            // affichage du prix mis à jour pour le client
          textToUpdate.forEach(ttu => ttu.innerText = `${convertPrice(updatedProduct.fullPrice)}`);
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


// ------- Code du formulaire

// Récupération du formulaire
let form = document.querySelector("#command_form");

// Validation de l'Email
//    Ecoute des changements des inputs
form.lname.addEventListener("change", function(){validLname(this)});
form.fname.addEventListener("change", function(){validFname(this)});
form.zipcode.addEventListener("change", function(){validZipcode(this)});
form.city.addEventListener("change", function(){validCity(this)});
form.email.addEventListener("change", function(){validEmail(this)});
form.password.addEventListener("change", function(){validPassword(this)});


// Fonction de validation des différents élements grace aux expressions régulières

  // nom
const validLname = function(inputLname) {

let small = inputLname.nextElementSibling;
      
if(!/[0-9]/.test(inputLname.value)){
  small.innerText =""
  small.classList.remove("text-danger");
  inputLname.classList.remove("is-invalid")
  return true;
}else{
  small.innerText ="Votre nom ne peut pas contenir de chiffres"
  small.classList.add("text-danger");
  inputLname.classList.add("is-invalid")
  return false;
}
}

  // prénom
const validFname = function(inputFname) {

let small = inputFname.nextElementSibling;
      
if(!/[0-9]/.test(inputFname.value)){
  small.innerText =""
  small.classList.remove("text-danger");
  small.classList.add("text-success");
  inputFname.classList.remove("is-invalid")
  return true;
}else{
  small.innerText ="Votre prénom ne peut pas contenir de chiffres"
  small.classList.remove("text-success");
  small.classList.add("text-danger");
  inputFname.classList.add("is-invalid")
  return false;
}
}

  // Code postal
const validZipcode = function(inputZipcode) {

let zipcodeRegExp = new RegExp("^[0-9]{5}(-\s[0-9]{4})?$", "g");
let small = inputZipcode.nextElementSibling;
      
if(zipcodeRegExp.test(inputZipcode.value)){
  small.innerText ="";
  small.classList.remove("text-danger");
  inputZipcode.classList.remove("is-invalid")
  return true;
}else{
  small.innerText ="Votre code postal n'est pas valide"
  small.classList.add("text-danger");
  inputZipcode.classList.add("is-invalid")
  return false;
}
}

  // ville
const validCity = function(inputCity) {
let small = inputCity.nextElementSibling;
      
if(!/[0-9]/.test(inputCity.value)){
  small.innerText =""
  small.classList.remove("text-danger");
  small.classList.add("text-success");
  inputCity.classList.remove("is-invalid")
  return true;
}else{
  small.innerText ="Votre ville ne peut pas contenir de chiffres"
  small.classList.remove("text-success");
  small.classList.add("text-danger");
  inputCity.classList.add("is-invalid")
  return false;
}
}
  
  // Email
const validEmail = function(inputEmail) {

let emailRegExp = new RegExp("^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$", "g");

let small = inputEmail.nextElementSibling;

if(emailRegExp.test(inputEmail.value)){
  small.innerText ="l'adresse e-mail est valide"
  small.classList.remove("text-danger");
  small.classList.add("text-success");
  inputEmail.classList.remove("is-invalid")
  return true;
}else{
  small.innerText ="l'adresse e-mail est invalide"
  small.classList.remove("text-success");
  small.classList.add("text-danger");
  inputEmail.classList.add("is-invalid")
  return false;
}
}

  // Mot de passe
const validPassword = function(inputPassword) {
    let msg;
    let valid = false;

    // le mot de passe doit contenir
    if(inputPassword.value.length < 8) { // au moins huit caractères
      msg = "le mot de passe doit contenir au moins huit caractères";
    }else if(!/[A-Z]/.test(inputPassword.value)) { // une majuscule
      msg = "le mot de passe doit contenir au moins une majuscule";
    }else if(!/[a-z]/.test(inputPassword.value)) { // une minuscule
      msg = "le mot de passe doit contenir au moins une minuscule";
    }else if(!/[0-9]/.test(inputPassword.value)) { // un chiffre
      msg = "le mot de passe doit contenir au moins un chiffre";
    }else{ // mot de passe valide
      msg = "le mot de passe est valide";
      valid = true;
    }
    

    let small = inputPassword.nextElementSibling;

    if(valid){
      small.classList.remove("text-danger")
      small.classList.add("text-success")
      small.innerText = msg;
      inputPassword.classList.remove("is-invalid")
      return true;
    }else{
      small.classList.add("text-danger")
      small.classList.remove("text-success")
      small.innerText = msg;
      inputPassword.classList.add("is-invalid")
      return false;
    }

}


// Récupération de la case à cocher pour les CGV
let formCheck = document.querySelector("#form_check");


// Vérification du formulaire.

let formIsValid = false;

// Si tous les inputs du formulaire sont correctement remplis
function validateForm() {
  if(    validLname(form.lname) 
    && validFname(form.fname) 
    && validZipcode(form.zipcode) 
    && validCity(form.city)
    && validEmail(form.email)
   && validPassword(form.password)
  ) {
    formIsValid = true;     
    console.log("hee hee")
  }else{
    formIsValid = false;
    console.log("ho no")

  }
};



// Récupération du clic sur "procéder au paiement"
form.addEventListener('submit', function(e) {
  e.preventDefault();
  validateForm();
    
    if(!productAlreadyInCart) {
    //  Si aucun produit n'est présent dans le panier
      e.preventDefault();
    // Proposer à l'utilisateur de retourner à l'accueil
      if (window.confirm("Vous devez ajouter un produit à votre panier")){
        document.location.href = "index.html"
      }
    // Si le formulaire n'est pas valide
    }else if(formIsValid == false){
      e.preventDefault();
      alert("Vous devez remplir les informations de facturation")
      
    // Si formulaire et check des CGV sont ok et que le panier est rempli  
    }else if (formIsValid && formCheck.checked && productAlreadyInCart) {
      if (window.confirm("Votre commande a bien été prise en compte. \n Cliquez sur ok pour retourner à l'accueil")){
        document.location.href = "index.html"}
      // Vider le localstorage et le formulaire, recharger la page pour imiter un envoi de formulaire
      localStorage.clear();
      form.reset();
      document.location.reload();
        
    // form.submit(); non utilisé mais présent en prévision de la mise en route du site.

    // Message au client si tout ok mais CGV non cochées
    }else{
      e.preventDefault();
      alert("Vous devez accepter les conditions générales de vente.")
    }
});





