// récuperation de l'id
let url = new URL(window.location.href);
let search_parms = new URLSearchParams(url.search);
let id = "";
if (search_parms.has("id")) {
    id = search_parms.get("id");
}
console.log("la valeur de l'id est");
console.log(id);

// récupération des éléments existants
const produitImage = document.querySelector(".item__img");
const produitName = document.querySelector("#title");
const produitPrix = document.querySelector("#price");
const produitDescription = document.querySelector("#description");
const produitCouleurs = document.querySelector("#colors");
const quantité = document.querySelector("#quantity");
const ajoutProduit = document.querySelector("#addToCart");

// création des nouveaux éléments
const optionCouleur = document.createElement("option");
const produitImg = document.createElement("img");
produitImg.classList.add("produit-img");

//fonction pour recupèrer le stockage local
function getPanier() {
    let infoPanier = localStorage.getItem("infoPanier");
    if (infoPanier == null) {
        return [];
    } else {
        return JSON.parse(infoPanier);
    }
}
//fonction pour sauvegarder le stockage local
function sauvegardePanier(infoPanier) {
    localStorage.setItem("infoPanier", JSON.stringify(infoPanier));
}

// fonction pour ajouter le produit au panier
function ajoutPanier() {
    let infoPanier = getPanier();
    let produit = new Object();
    produit.id = id;
    produit.qte = parseInt(quantité.value);
    produit.couleur = produitCouleurs.value;
    let produitIdentique = false;
    for (let data of infoPanier) {
        if (data.id == produit.id && data.couleur == produit.couleur) {
            data.qte += produit.qte;
            produitIdentique = true;
            break;
        }
    }
    if (produitIdentique == false) {
        infoPanier.push(produit);
    }
    sauvegardePanier(infoPanier);
    console.log(infoPanier);
}

// affichage du produit selectionné
fetch("http://127.0.0.1:3000/api/products/" + id)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        produitImg.setAttribute("src", data.imageUrl);
        produitImg.setAttribute("alt", data.altTxt);
        produitName.textContent = data.name;
        produitPrix.textContent = data.price;
        produitDescription.textContent = data.description;

        for (let couleur of data.colors) {
            const optionCouleur = document.createElement("option");
            optionCouleur.setAttribute("value", couleur);
            optionCouleur.textContent = couleur;
            console.log(couleur);
            produitCouleurs.appendChild(optionCouleur);
        }
        produitImage.appendChild(produitImg);

        // ajout du produit affiché au panier
        ajoutProduit.addEventListener("click", function() {
            ajoutPanier();
            if (
                // message de confirmation
                confirm(
                    'Votre produit a bien été ajouté au panier.\r\nPour consulter votre panier cliquez sur "OK"\r\nPour continuer votre commande cliquez sur "Annuler"'
                )
            ) {
                window.location.href = "./cart.html";
            }
        });
    });