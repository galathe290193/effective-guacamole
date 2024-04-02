document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
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
        });
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
        const cartDisplay = document.querySelector('.cart');
        cartDisplay.innerHTML = '<h2>Panier</h2>';
        
        if (Object.keys(cart).length === 0) {
            cartDisplay.innerHTML += '<p>Votre panier est vide.</p>';
            return;
        }

        const ul = document.createElement('ul');

        for (const [productName, productInfo] of Object.entries(cart)) {
            const { price, quantity } = productInfo;
            const li = document.createElement('li');
            li.textContent = `${productName} x${quantity} - ${price}`;
            ul.appendChild(li);
        }

        cartDisplay.appendChild(ul);
    }
});