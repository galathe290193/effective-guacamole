document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartContainer = document.querySelector('.cart');
    const payButton = document.getElementById('pay-button');
    let cart = [];

    function updateCartDisplay() {
        cartContainer.innerHTML = '<h2>Panier</h2>';
        
        if (cart.length === 0) {
            cartContainer.innerHTML += '<p>Votre panier est vide.</p>';
            payButton.style.display = 'none';
            return;
        }

        const ul = document.createElement('ul');
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} x${item.quantity} - ${item.price}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = '-';
            removeButton.className = 'remove-item';
            removeButton.dataset.productName = item.name;
            
            li.appendChild(removeButton);
            ul.appendChild(li);

            const priceValue = parseFloat(item.price.replace('€', ''));
            total += priceValue * item.quantity;
        });

        cartContainer.appendChild(ul);
        payButton.textContent = `Payer €${total.toFixed(2)}`;
        payButton.style.display = 'block';
    }

    addToCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const card = button.closest('.card');
            const productName = card.querySelector('h3').textContent;
            const productPrice = card.querySelector('.price').textContent;
            let existingItem = cart.find(item => item.name === productName);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            updateCartDisplay();
        });
    });

    cartContainer.addEventListener('click', (event) => {
        if (event.target && event.target.className === 'remove-item') {
            const productName = event.target.dataset.productName;
            const itemIndex = cart.findIndex(item => item.name === productName);
            
            if (itemIndex !== -1) {
                cart[itemIndex].quantity--;

                if (cart[itemIndex].quantity <= 0) {
                    cart.splice(itemIndex, 1);
                }

                updateCartDisplay();
            }
        }
    });

    payButton.addEventListener('click', () => {
        let message = 'Détails du panier :\n';

        cart.forEach(item => {
            message += `${item.name} x${item.quantity} - ${item.price}\n`;
        });

        alert(message);
    });

    updateCartDisplay(); // Initialiser l'affichage du panier lors du chargement de la page
});