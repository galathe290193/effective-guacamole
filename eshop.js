document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event triggered");

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartContainer = document.querySelector('.cart');
    const payButton = document.getElementById('pay-button');
    const cart = {};

    function updateTotalAndButtonText() {
        console.log("updateTotalAndButtonText function called");

        let total = 0;

        // Parcourir chaque produit dans le panier
        for (const [productName, productInfo] of Object.entries(cart)) {
            const { price, quantity } = productInfo;
            
            // Convertir le prix en nombre
            const priceValue = parseFloat(price.replace('€', ''));

            // Calculer le total pour ce produit
            total += priceValue * quantity;
        }

        console.log("Total calculated:", total);

        // Mettre à jour le texte et l'affichage du bouton "Payer"
        if (total > 0) {
            console.log("Displaying payButton");
            payButton.style.display = 'block';
            payButton.textContent = `Payer €${total.toFixed(2)}`;
        } else {
            console.log("Hiding payButton");
            payButton.style.display = 'none';
        }
    }

    function updateCartDisplay() {
        console.log("updateCartDisplay function called");

        // Réinitialiser le contenu du conteneur du panier
        cartContainer.innerHTML = '<h2>Panier</h2>';

        // Vérifier si le panier est vide
        if (Object.keys(cart).length === 0) {
            console.log("Cart is empty, displaying message");
            cartContainer.innerHTML += '<p>Votre panier est vide.</p>';
            updateTotalAndButtonText();
            return;
        }

        // Créer une liste pour afficher les produits dans le panier
        const ul = document.createElement('ul');

        // Parcourir chaque produit dans le panier
        for (const [productName, productInfo] of Object.entries(cart)) {
            const { price, quantity } = productInfo;
            const li = document.createElement('li');
            li.textContent = `${productName} x${quantity} - ${price}`;

            // Créer un bouton pour supprimer le produit du panier
            const removeButton = document.createElement('button');
            removeButton.textContent = '-';
            removeButton.className = 'remove-item';
            removeButton.dataset.productName = productName;
            
            li.appendChild(removeButton);
            ul.appendChild(li);
        }

        // Ajouter la liste au conteneur du panier
        cartContainer.appendChild(ul);
        updateTotalAndButtonText();
    }

    // Ajouter un écouteur d'événement à chaque bouton "Ajouter au panier"
    addToCartButtons.forEach((button) => {
        console.log("Adding click event listener to addToCartButton");

        button.addEventListener('click', () => {
            const card = button.closest('.card');
            const productName = card.querySelector('h3').textContent;
            const productPrice = card.querySelector('.price').textContent;

            console.log("addToCartButton clicked for:", productName);

            // Vérifier si le produit est déjà dans le panier
            if (cart[productName]) {
                cart[productName].quantity++;
            } else {
                cart[productName] = {
                    price: productPrice,
                    quantity: 1
                };
            }

            // Mettre à jour l'affichage du panier
            updateCartDisplay();
        });
    });

    // Ajouter un écouteur d'événement pour le bouton "Payer"
    payButton.addEventListener('click', () => {
        console.log("payButton clicked");

        let message = 'Détails du panier :\n';

        // Générer le message avec les détails du panier
        for (const [productName, productInfo] of Object.entries(cart)) {
            const { price, quantity } = productInfo;
            message += `${productName} x${quantity} - ${price}\n`;
        }

        // Afficher le message dans une boîte de dialogue
        alert(message);
    });

    // Fonction initiale pour mettre à jour le texte et l'affichage du bouton "Payer"
    updateTotalAndButtonText();
});
