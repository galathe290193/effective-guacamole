document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartContainer = document.querySelector('.cart');
    const payButton = document.getElementById('pay-button');
    let cart = {};

    function updateCartDisplay() {
        cartContainer.innerHTML = '<h2>Panier</h2>';
        
        if (Object.keys(cart).length === 0) {
            cartContainer.innerHTML += '<p>Votre panier est vide.</p>';
            payButton.style.display = 'none';  // Cacher le bouton "Payer" si le panier est vide
            return;
        }

        const ul = document.createElement('ul');
        let total = 0;

        for (const [productName, productInfo] of Object.entries(cart)) {
            const { price, quantity } = productInfo;
            const li = document.createElement('li');
            li.textContent = `${productName} x${quantity} - ${price}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = '-';
            removeButton.className = 'remove-item';
            removeButton.dataset.productName = productName;
            
            li.appendChild(removeButton);
            ul.appendChild(li);

            const priceValue = parseFloat(price.replace('€', ''));
            total += priceValue * quantity;
        }

        cartContainer.appendChild(ul);
        payButton.textContent = `Payer €${total.toFixed(2)}`;
        payButton.style.display = 'block';  // Afficher le bouton "Payer" si le panier n'est pas vide
        
        console.log(payButton.style.display);  // Débogage : Afficher la valeur de la propriété display du bouton
        console.log(cartContainer.innerHTML);  // Débogage : Afficher le contenu de l'élément .cart
    }

    addToCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const card = button.closest('.card');
            const productName = card.querySelector('h3').textContent;
            const productPrice = card.querySelector('.price').textContent;

            if (cart[productName]) {
                cart[productName].quantity++;
            } else {
                cart[productName] = {
                    price: productPrice,
                    quantity: 1
                };
            }

            updateCartDisplay();
        });
    });

    cartContainer.addEventListener('click', (event) => {
        if (event.target && event.target.className === 'remove-item') {
            const productName = event.target.dataset.productName;
            
            if (cart[productName]) {
                cart[productName].quantity--;

                if (cart[productName].quantity <= 0) {
                    delete cart[productName];
                }

                updateCartDisplay();
            }
        }
    });

    payButton.addEventListener('click', () => {
        let message = 'Détails du panier :\n';

        for (const [productName, productInfo] of Object.entries(cart)) {
            const { price, quantity } = productInfo;
            message += `${productName} x${quantity} - ${price}\n`;
        }

        alert(message);
    });

    updateCartDisplay();  // Initialiser l'affichage du panier lors du chargement de la page
});