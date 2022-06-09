// récuparation de l'élément items
const items = document.querySelector(".items");

// affichage de l'ensemble des produits
fetch("http://127.0.0.1:3000/api/products/")
    .then((res) => res.json())
    .then((data) => {
        for (let produit of data) {

            const produitId = produit._id;
            console.log(produitId);

            const produits = document.createElement("a");
            produits.classList.add("produit");
            produits.setAttribute("href", "./product.html?id=" + produitId);

            const produitInfo = document.createElement("article");
            produitInfo.classList.add("produit-info");

            const produitName = document.createElement("h3");
            produitName.classList.add("produit-name");
            produitName.textContent = produit.name;

            const produitImg = document.createElement("img");
            produitImg.classList.add("produit-img");
            produitImg.setAttribute("src", produit.imageUrl);
            produitImg.setAttribute("alt", produit.altTxt);

            const produitDescription = document.createElement("p");
            produitDescription.classList.add("produit-description");
            produitDescription.textContent = produit.description;

            items.appendChild(produits);
            produits.appendChild(produitInfo);
            produitInfo.appendChild(produitImg);
            produitInfo.appendChild(produitName);
            produitInfo.appendChild(produitDescription);
        }
    });