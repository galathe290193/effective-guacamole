document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartContainer = createCartContainer();

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const card = event.target.closest('.card');
            const productInfo = {
                name: card.querySelector('h3').innerText,
                price: card.querySelector('.price').innerText,
            };

            cartContainer.cartItems.push(productInfo);
            updateCartDisplay(cartContainer);
        });
    });

    function createCartContainer() {
        const cartContainer = document.createElement('div');
        cartContainer.className = 'cart-container';
        document.body.appendChild(cartContainer);
        cartContainer.cartItems = [];

        return cartContainer;
    }

    function updateCartDisplay(cartContainer) {
        const cartContent = cartContainer.querySelector('.cart-content');

        if (cartContent) {
            cartContent.innerHTML = ''; // Clear previous cart items
        } else {
            const newCartContent = document.createElement('div');
            newCartContent.className = 'cart-content';
            cartContainer.appendChild(newCartContent);
        }

        cartContainer.cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price}</span>
            `;
            cartContent.appendChild(cartItem);
        });

        addPayButton(cartContainer);
    }

    function addPayButton(cartContainer) {
        let payButton = document.getElementById('pay-button');

        if (payButton) {
            payButton.remove(); // Remove existing pay button
        }

        payButton = document.createElement('button');
        payButton.id = 'pay-button';
        payButton.innerText = 'Payer';
        payButton.addEventListener('click', function() {
            alert('Paiement effectué !');
            cartContainer.cartItems.length = 0; // Clear cart
            updateCartDisplay(cartContainer); // Update cart display after clearing
        });

        cartContainer.appendChild(payButton);
    }
});