const url = "http://127.0.0.1:3000/api/products/";

// récupération des éléments existants pour la partie panier
const panier = document.querySelector(".cart");
let panierProduits = document.querySelector("#cart__items");

// récupération des éléments existants pour la partie total article / prix
const totalQtePrix = document.querySelector(".cart__price");
let totalQte = document.querySelector("#totalQuantity");
let totalPrix = document.querySelector("#totalPrice");

// récupération des éléments existants pour la partie formulaire
const commande = document.querySelector(".cart__order");
let nom = document.querySelector("#lastName");
let prenom = document.querySelector("#firstName");
let adresse = document.querySelector("#address");
let ville = document.querySelector("#city");
let email = document.querySelector("#email");
let messagePrenom = document.querySelector("#firstNameErrorMsg");
let messageNom = document.querySelector("#lastNameErrorMsg");
let messageAdresse = document.querySelector("#addressErrorMsg");
let messageVille = document.querySelector("#cityErrorMsg");
let bouttonCommander = document.querySelector(
    '.cart__order__form__submit input[type="submit"]'
);

// initialisation des éléments du panier
let orderId = "";
let cartProduit = "";
let cartProduitImg = "";
let cartProduitContenu = "";
let produitDescription = "";
let produitCouleur = "";
let produitParams = "";
let produitParamsQuantité = "";
let qte = "";
let produitQuantité = "";
let produitParamsQuantitéSuppr = "";
let produitSuppr = "";
let produitImg = "";
let produitName = "";
let produitPrix = "";

// fonction pour créer les éléments du panier
function creationElement() {
    cartProduit = document.createElement("article");
    cartProduitImg = document.createElement("div");
    cartProduitContenu = document.createElement("div");
    produitDescription = document.createElement("div");
    produitCouleur = document.createElement("p");
    produitParams = document.createElement("div");
    produitParamsQuantité = document.createElement("div");
    qte = document.createElement("p");
    produitQuantité = document.createElement("input");
    produitParamsQuantitéSuppr = document.createElement("div");
    produitSuppr = document.createElement("p");
    produitImg = document.createElement("img");
    produitName = document.createElement("h2");
    produitPrix = document.createElement("p");

    panierProduits.appendChild(cartProduit);
    cartProduit.appendChild(cartProduitImg);
    cartProduitImg.appendChild(produitImg);
    cartProduit.appendChild(cartProduitContenu);
    cartProduitContenu.appendChild(produitDescription);
    produitDescription.appendChild(produitName);
    produitDescription.appendChild(produitCouleur);
    produitDescription.appendChild(produitPrix);
    cartProduitContenu.appendChild(produitParams);
    produitParams.appendChild(produitParamsQuantité);
    produitParamsQuantité.appendChild(qte);
    produitParamsQuantité.appendChild(produitQuantité);
    produitParams.appendChild(produitParamsQuantitéSuppr);
    produitParamsQuantitéSuppr.appendChild(produitSuppr);
}

// fonction pour attribuer une class aux éléments du panier
function attributClass() {
    cartProduit.classList.add("cart__item");
    cartProduitImg.classList.add("cart__item__img");
    cartProduitContenu.classList.add("cart__item__content");
    produitDescription.classList.add("cart__item__content__description");
    produitParams.classList.add("cart__item__content__settings");
    produitParamsQuantité.classList.add(
        "cart__item__content__settings__quantity"
    );
    produitQuantité.classList.add("itemQuantity");
    produitParamsQuantitéSuppr.classList.add(
        "cart__item__content__settings__delete"
    );
    produitSuppr.classList.add("deleteItem");
    produitPrix.classList.add("price");
}
// fonction pour l'ajout d'attribut aux éléments du panier qui reçoit en paramètre les info du produit
function ajoutAttribut(id, info, data) {
    produitQuantité.setAttribute("type", "number");
    produitQuantité.setAttribute("name", "itemQuantity");
    produitQuantité.setAttribute("min", "1");
    produitQuantité.setAttribute("max", "100");
    cartProduit.setAttribute("data-id", id);
    cartProduit.setAttribute("data-color", info.couleur);
    produitQuantité.setAttribute("value", info.qte);
    produitImg.setAttribute("src", data.imageUrl);
    produitImg.setAttribute("alt", data.altTxt);
}
// fonction pour l'ajout texte aux éléments du panier qui reçoit en paramètre les info du produit
function ajoutTexte(info, data) {
    qte.textContent = "Qté : ";
    produitSuppr.textContent = "Supprimer";
    produitCouleur.textContent = info.couleur;
    produitName.textContent = data.name;
    produitPrix.textContent = data.price + ".00 €";
}
// fonction pour afficher les produits du panier
function affichePanier() {
    let infoPanier = getPanier();
    for (let info of infoPanier) {
        let id = info.id;
        fetch(url + id)
            .then((res) => res.json())
            .then((data) => {
                creationElement();
                attributClass();
                ajoutAttribut(id, info, data);
                ajoutTexte(info, data);
            });
    }
}
// fonction d'affichage du total article / prix
function afficheTotalQuantitéPrix() {
    let infoPanier = getPanier();
    let quantité = 0;
    let price = 0;
    for (let info of infoPanier) {
        let id = info.id;
        fetch(url + id)
            .then((res) => res.json())
            .then((data) => {
                quantité += info.qte;
                price += data.price * info.qte;
                totalQte.textContent = quantité;
                totalPrix.textContent = price;
            });
    }
}
// fonction pour supprimer un produit du panier
function supprimeProduit() {
    let infoPanier = getPanier();
    for (let info of infoPanier) {
        let id = info.id;
        fetch(url + id)
            .then((res) => res.json())
            .then((data) => {
                document.querySelectorAll(".deleteItem").forEach((supprime) => {
                    supprime.addEventListener("click", function() {
                        let parent = supprime.closest("article");
                        panierProduits.removeChild(parent);
                        console.log(data);
                        infoPanier = infoPanier.filter(
                            (data) =>
                            parent.dataset.id != data.id ||
                            parent.dataset.color != data.couleur
                        );
                        console.log(infoPanier);
                        sauvegardePanier(infoPanier);
                        afficheTotalQuantitéPrix();
                        location.reload();
                    });
                });
            });
    }
}
// fonction pour modifier la quantité d'un produit du panier
function modifQuantité() {
    let infoPanier = getPanier();
    for (let info of infoPanier) {
        let id = info.id;
        fetch(url + id)
            .then((res) => res.json())
            .then(() => {
                document.querySelectorAll(".itemQuantity").forEach((quantitéModif) => {
                    quantitéModif.addEventListener("change", function() {
                        let parent = quantitéModif.closest("article");
                        if (
                            parent.dataset.id == info.id &&
                            parent.dataset.color == info.couleur
                        ) {
                            info.qte = parseInt(this.value);
                            quantitéModif.setAttribute("value", this.value);
                        }
                        sauvegardePanier(infoPanier);
                        afficheTotalQuantitéPrix();
                    });
                });
            });
    }
}
// fonction pour recupèrer le stockage local
function getPanier() {
    let infoPanier = localStorage.getItem("infoPanier");
    if (infoPanier == null) {
        return [];
    } else {
        return JSON.parse(infoPanier);
    }
}
// fonction pour sauvegarder le stockage local
function sauvegardePanier(infoPanier) {
    localStorage.setItem("infoPanier", JSON.stringify(infoPanier));
}

// fonction pour charger la page de confirmation qui reçoit en paramètre l'orderId
function pageConfirmation(orderId) {
    window.location.href = "./confirmation.html?orderId=" + orderId;
}

// fonction pour recupérer l'orderId qui reçoit en paramètre les info du formulaire
function recupOrderId(nomSaisie, prenomSaisie, adresseSaisie, villeSaisie, emailSaisie) {
    let infoPanier = getPanier();
    let contact = new Object();
    let products = new Object();
    contact.lastName = nomSaisie;
    contact.firstName = prenomSaisie;
    contact.address = adresseSaisie;
    contact.city = villeSaisie;
    contact.email = emailSaisie;
    products = [];
    for (let info of infoPanier) {
        console.log(info.id);
        products.push(info.id);
    }
    if (products.length != 0) {
        fetch("http://127.0.0.1:3000/api/products/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ contact, products }),
            })
            .then((res) => res.json())
            .then((data) => {
                orderId = data.orderId;
                //appel de fonction pour charger la page de confirmation        
                pageConfirmation(orderId)
            });
    } else {
        alert("Votre panier est vide !");
    }
}
// fonction pour valider le formulaire
function valideForm() {
    let valid = true;
    let nomPrenom = /[^A-Za-z-'éèàùêçëâï ]/g;
    let adresseVille = /[^0-9A-Za-z-'éèàùêçëâï, ]/g;
    let nomSaisie = nom.value;
    let prenomSaisie = prenom.value;
    let adresseSaisie = adresse.value;
    let villeSaisie = ville.value;
    let emailSaisie = email.value;
    for (let input of document.querySelectorAll(".cart__order__form input")) {
        valid &= input.reportValidity();
        if (nomPrenom.test(prenomSaisie)) {
            valid = !valid;
            messagePrenom.textContent = "Veuillez saisir un prénom valide !";
        }
        if (nomPrenom.test(nomSaisie)) {
            valid = !valid;
            messageNom.textContent = "Veuillez saisir un nom valide !";
        }
        if (adresseVille.test(adresseSaisie)) {
            valid = !valid;
            messageAdresse.textContent = "Veuillez saisir une adresse valide !";
        }
        if (adresseVille.test(villeSaisie)) {
            valid = !valid;
            messageVille.textContent = "Veuillez saisir une ville valide !";
        }
        if (!valid) {
            break;
        }
    }
    if (valid) {
        // appel de la fonction pour recupérer l'orderId
        recupOrderId(nomSaisie, prenomSaisie, adresseSaisie, villeSaisie, emailSaisie);
    }
}
// fonction pour passer la commande
function commander() {
    bouttonCommander.addEventListener("click", function(form) {
        form.preventDefault();
        // appel de la fonction pour valider le formulaire
        valideForm();
    });
}
// appel de la fonction pour affichager le panier
affichePanier();

// appel de la fonction d'affichage du total des produits et le total du prix du panier
afficheTotalQuantitéPrix();

// appel de la fonction pour modifier un produit
modifQuantité();

// appel de la fonction pour supprimer un produit
supprimeProduit();

// appel de la fonction pour valider le formulaire
commander();