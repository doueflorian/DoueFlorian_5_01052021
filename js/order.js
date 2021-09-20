
// Affichage de l'orderID
let orderID = localStorage.getItem('orderID');
document.getElementById('command_ID').innerText = orderID;

// Affichage du prix du panier
let cartPrice = localStorage.getItem('cartPrice');
document.getElementById('command_total_price').innerText = cartPrice;

// Affichage ddes informations client
let clientData = JSON.parse(localStorage.getItem('client'));

document.getElementById('last_name').innerText = clientData.lastName;
document.getElementById('first_name').innerText = clientData.firstName;
document.getElementById('address').innerText = clientData.address;
document.getElementById('city').innerText = clientData.city;

// // Vider le localStorage pour une autre commande.
// window.addEventListener("beforeunload", function() {
//     localStorage.clear();
//   });