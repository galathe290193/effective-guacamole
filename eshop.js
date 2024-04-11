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
        const cartContainer = document.createElement('div');
        cartContainer.className = 'cart-container';
        
        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price}</span>
            `;
            cartContainer.appendChild(cartItem);
        });

        const existingCartContainer = document.querySelector('.cart-container');
        if (existingCartContainer) {
            existingCartContainer.replaceWith(cartContainer);
        } else {
            document.body.appendChild(cartContainer);
        }

        addPayButton();
    }

    function addPayButton() {
        const existingPayButton = document.querySelector('#pay-button');
        if (!existingPayButton) {
            const payButton = document.createElement('button');
            payButton.id = 'pay-button';
            payButton.innerText = 'Payer';
            payButton.addEventListener('click', function() {
                alert('Paiement effectué !');
                cartItems.length = 0; // Clear cart
                updateCartDisplay(); // Update cart display after clearing
            });
            document.body.appendChild(payButton);
        }
    }
});