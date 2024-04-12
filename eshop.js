document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartContainer = createCartContainer();
    let selectedDonation = null;

    function createCartContainer() {
        const container = document.createElement('div');
        container.className = 'cart-container';
        container.style.position = 'fixed';
        container.style.top = '10px';
        container.style.right = '10px';
        container.style.backgroundColor = '#ffffff';
        container.style.border = '1px solid #ddd';
        container.style.borderRadius = '4px';
        container.style.padding = '10px';
        container.style.zIndex = '1000';
        return container;
    }

    function updateCartDisplay() {
        cartContainer.innerHTML = ''; // Clear the cart container

        if (selectedDonation) {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${selectedDonation.label} (${selectedDonation.amount}€)</span>
                <span class="remove-from-cart">-</span>
            `;
            cartContainer.appendChild(cartItem);
        }

        addPayButton();
        addRemoveButton();
    }

    function addPayButton() {
        const existingPayButton = document.querySelector('#pay-button');
        if (!existingPayButton && selectedDonation) {
            const payButton = document.createElement('a');
            payButton.id = 'pay-button';
            payButton.href = selectedDonation.paymentLink;
            payButton.innerText = 'Payer';
            payButton.target = '_blank';
            payButton.style.display = 'block';
            payButton.style.marginTop = '10px';
            cartContainer.appendChild(payButton);
        }
    }

    function addRemoveButton() {
        const removeButton = document.querySelector('.remove-from-cart');
        if (removeButton) {
            removeButton.addEventListener('click', function() {
                selectedDonation = null;
                updateCartDisplay();
            });
        }
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const card = event.target.closest('.card');
            const productName = card.querySelector('h3').innerText;

            switch (productName) {
                case 'Super don':
                    selectedDonation = {
                        label: 'Super don',
                        amount: '1',
                        paymentLink: 'https://buy.stripe.com/5kA6p0aHb3M75s45ko'
                    };
                    break;
                case 'Mega don':
                    selectedDonation = {
                        label: 'Mega don',
                        amount: '5',
                        paymentLink: 'https://buy.stripe.com/28obJk3eJ2I3g6I8wz'
                    };
                    break;
                case 'WTF don':
                    selectedDonation = {
                        label: 'WTF don',
                        amount: '100',
                        paymentLink: 'https://buy.stripe.com/dR6eVw16B0zV6w88wy'
                    };
                    break;
                default:
                    selectedDonation = null;
            }

            updateCartDisplay();
        });
    });

    document.body.appendChild(cartContainer);
});
