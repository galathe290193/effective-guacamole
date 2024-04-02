document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const payButton = document.querySelector('#pay-button');
    let cart = [];

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const card = button.closest('.card');
            const productName = card.querySelector('h3').textContent;
            const productPrice = card.querySelector('.price').textContent;

            cart.push({
                name: productName,
                price: productPrice
            });

            updateCartDisplay();
        });
    });

    payButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Votre panier est vide.');
            return;
        }

        let message = 'Détails du panier :\n';

        cart.forEach((product, index) => {
            message += `${index + 1}. ${product.name} - ${product.price}\n`;
        });

        message += '\nCeci est une démo. Vous ne pouvez pas effectuer de vraies transactions.';

        alert(message);
        cart = [];
        updateCartDisplay();
    });

    function updateCartDisplay() {
        const cartDisplay = document.querySelector('.cart');
        cartDisplay.innerHTML = '<h2>Panier</h2>';
        
        if (cart.length === 0) {
            cartDisplay.innerHTML += '<p>Votre panier est vide.</p>';
            return;
        }

        const ul = document.createElement('ul');

        cart.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - ${product.price}`;
            ul.appendChild(li);
        });

        cartDisplay.appendChild(ul);
    }
});