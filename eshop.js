document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = {};

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const card = event.target.closest('.card');
            const productName = card.querySelector('h3').innerText;

            if (cartItems[productName]) {
                cartItems[productName].quantity++;
            } else {
                cartItems[productName] = {
                    price: card.querySelector('.price').innerText,
                    quantity: 1
                };
            }

            updateCartDisplay();
        });
    });

    function updateCartDisplay() {
        const cartContainer = document.createElement('div');
        cartContainer.className = 'cart-container';
        cartContainer.style.position = 'fixed';
        cartContainer.style.top = '10px';
        cartContainer.style.right = '10px';
        cartContainer.style.backgroundColor = '#ffffff';
        cartContainer.style.border = '1px solid #ddd';
        cartContainer.style.borderRadius = '4px';
        cartContainer.style.padding = '10px';
        cartContainer.style.zIndex = '1000';

        let totalItems = 0;
        let totalPrice = 0;

        for (const [productName, productInfo] of Object.entries(cartItems)) {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${productName} x${productInfo.quantity}</span>
                <span>${productInfo.price}</span>
                <button class="increase-quantity" data-product="${productName}">+</button>
                <button class="decrease-quantity" data-product="${productName}">-</button>
            `;
            cartContainer.appendChild(cartItem);

            totalItems += productInfo.quantity;
            totalPrice += parseFloat(productInfo.price.replace('€', '')) * productInfo.quantity;
        }

        const totalInfo = document.createElement('div');
        totalInfo.innerHTML = `
            <strong>Total (${totalItems} items): €${totalPrice.toFixed(2)}</strong>
        `;
        cartContainer.appendChild(totalInfo);

        const existingCartContainer = document.querySelector('.cart-container');
        if (existingCartContainer) {
            existingCartContainer.replaceWith(cartContainer);
        } else {
            document.body.appendChild(cartContainer);
        }

        addPayButton();
        addQuantityButtons();
    }

    function addPayButton() {
        const existingPayButton = document.querySelector('#pay-button');
        if (!existingPayButton) {
            const payButton = document.createElement('button');
            payButton.id = 'pay-button';
            payButton.innerText = 'Payer';
            payButton.addEventListener('click', function() {
                alert('Paiement effectué !');
                Object.keys(cartItems).forEach(key => delete cartItems[key]); // Clear cart
                updateCartDisplay(); // Update cart display after clearing
            });
            document.body.appendChild(payButton);
        }
    }

    function addQuantityButtons() {
        const increaseButtons = document.querySelectorAll('.increase-quantity');
        const decreaseButtons = document.querySelectorAll('.decrease-quantity');

        increaseButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                const productName = event.target.getAttribute('data-product');
                cartItems[productName].quantity++;
                updateCartDisplay();
            });
        });

        decreaseButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                const productName = event.target.getAttribute('data-product');
                if (cartItems[productName].quantity > 1) {
                    cartItems[productName].quantity--;
                } else {
                    delete cartItems[productName];
                }
                updateCartDisplay();
            });
        });
    }
});
