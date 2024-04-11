document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const card = event.target.closest('.card');
            const productInfo = {
                name: card.querySelector('h3').innerText,
                price: card.querySelector('.price').innerText,
            };

            cartItems.push(productInfo);
            updateCartDisplay();
        });
    });

    function updateCartDisplay() {
        const cartContainer = document.querySelector('.cart-container');

        if (cartContainer) {
            cartContainer.innerHTML = ''; // Clear previous cart items
        } else {
            const newCartContainer = document.createElement('div');
            newCartContainer.className = 'cart-container';
            document.body.appendChild(newCartContainer);
        }

        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price}</span>
            `;
            cartContainer.appendChild(cartItem);
        });

        addPayButton();
    }

    function addPayButton() {
        const payButton = document.querySelector('#pay-button');

        if (payButton) {
            payButton.remove(); // Remove existing pay button
        }

        const newPayButton = document.createElement('button');
        newPayButton.id = 'pay-button';
        newPayButton.innerText = 'Payer';
        newPayButton.addEventListener('click', function() {
            alert('Paiement effectué !');
            cartItems.length = 0; // Clear cart
            updateCartDisplay(); // Update cart display after clearing
        });

        const cartContainer = document.querySelector('.cart-container');
        if (cartContainer) {
            cartContainer.appendChild(newPayButton);
        }
    }
});