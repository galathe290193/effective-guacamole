document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartContainer = document.querySelector('.cart');
    const payButton = document.querySelector('#pay-button');
    const cart = {};

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
            updatePayButtonVisibility();
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
                updatePayButtonVisibility();
            }
        }
    });

    payButton.addEventListener('click', () => {
        let total = 0;
        let message = 'Détails du panier :\n';

        for (const [productName, productInfo] of Object.entries(cart)) {
            const { price, quantity } = productInfo;
            message += `${productName} x${quantity} - ${price}\n`;

            const priceValue = parseFloat(price.replace('€', ''));
            total += priceValue * quantity;
        }

        message += `\nTotal : €${total.toFixed(2)}`;

        alert(message);
    });

    function updateCartDisplay() {
        cartContainer.innerHTML = '<h2>Panier</h2>';
        
        if (Object.keys(cart).length === 0) {
            cartContainer.innerHTML += '<p>Votre panier est vide.</p>';
            return;
        }

        const ul = document.createElement('ul');

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
        }

        cartContainer.appendChild(ul);
    }

    function updatePayButtonVisibility() {
        if (Object.keys(cart).length === 0) {
            payButton.style.display = 'none';
        } else {
            payButton.style.display = 'block';
        }
    }
});