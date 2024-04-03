document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartContainer = document.querySelector('.cart');
    const payButton = document.getElementById('pay-button');
    const cart = {};

    function updateCartDisplay() {
        cartContainer.innerHTML = '<h2>Panier</h2>';
        
        if (Object.keys(cart).length === 0) {
            cartContainer.innerHTML += '<p>Votre panier est vide.</p>';
            payButton.style.display = 'none';
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
        updatePayButton(total);
    }

    function updatePayButton(total) {
        if (total > 0) {
            payButton.textContent = `Payer €${total.toFixed(2)}`;
            payButton.style.display = 'block';
        } else {
            payButton.style.display = 'none';
        }
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

    updateCartDisplay(); // Initialiser l'affichage du panier lors du chargement de la page
});