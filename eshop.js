document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event triggered");

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartContainer = document.querySelector('.cart');
    const payButton = document.getElementById('pay-button');
    const cart = {};

    function updateTotalAndButtonText() {
        console.log("updateTotalAndButtonText function called");

        let total = 0;

        for (const [productName, productInfo] of Object.entries(cart)) {
            const { price, quantity } = productInfo;
            const priceValue = parseFloat(price.replace('€', ''));
            total += priceValue * quantity;
        }

        console.log("Total calculated:", total);

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

        cartContainer.innerHTML = '<h2>Panier</h2>';

        if (Object.keys(cart).length === 0) {
            console.log("Cart is empty, displaying message");
            cartContainer.innerHTML += '<p>Votre panier est vide.</p>';
            updateTotalAndButtonText();
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
        updateTotalAndButtonText();
    }

    addToCartButtons.forEach((button) => {
        console.log("Adding click event listener to addToCartButton");

        button.addEventListener('click', () => {
            const card = button.closest('.card');
            const productName = card.querySelector('h3').textContent;
            const productPrice = card.querySelector('.price').textContent;

            console.log("addToCartButton clicked for:", productName);

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

            console.log("remove-item button clicked for:", productName);

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
        console.log("payButton clicked");

        let message = 'Détails du panier :\n';

        for (const [productName, productInfo] of Object.entries(cart)) {
            const { price, quantity } = productInfo;
            message += `${productName} x${quantity} - ${price}\n`;
        }

        alert(message);
    });

    updateTotalAndButtonText();
});
