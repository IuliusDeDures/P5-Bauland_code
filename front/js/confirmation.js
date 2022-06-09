// récuperation de l'orderId
let url = new URL(window.location.href);
let search_parms = new URLSearchParams(url.search);
let orderId = "";
if (search_parms.has("orderId")) {
    orderId = search_parms.get("orderId");
}
console.log("L'orderId est");
console.log(orderId);

// affichage du numéro de commande
const confirmation = document.querySelector("#orderId");
confirmation.textContent = orderId;

// Suppression d'infoPanier
localStorage.removeItem("infoPanier");