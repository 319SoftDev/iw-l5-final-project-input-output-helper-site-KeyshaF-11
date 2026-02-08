const buttons = document.querySelectorAll('.button');
const itemCountSpan = document.querySelector('.span1');

let cart = JSON.parse(localStorage.getItem('cart')) || {};

// ---------- UPDATE RED BAG NUMBER ----------
function updateCartCount() {
    let totalItems = 0;
    for (let item in cart) {
        totalItems += cart[item].quantity;
    }
    itemCountSpan.textContent = totalItems;
}

// ---------- DISPLAY CART ----------
function displayCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    cartItemsDiv.innerHTML = "";

    let total = 0;

    for (let item in cart) {
        const quantity = cart[item].quantity;
        const price = cart[item].price;
        const itemTotal = quantity * price;

        // Create container for each item
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.alignItems = 'center';
        div.style.marginBottom = '10px';
        div.style.padding = '6px 10px';
        div.style.backgroundColor = 'rgba(255,255,255,0.2)';
        div.style.borderRadius = '8px';

        // Item text
        const span = document.createElement('span');
        span.textContent = `${item} x${quantity} - $${itemTotal.toFixed(2)}`;

        // Remove button
        const btn = document.createElement('button');
        btn.textContent = "Remove";
        btn.style.backgroundColor = '#b00000';
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.borderRadius = '6px';
        btn.style.padding = '4px 8px';
        btn.style.cursor = 'pointer';
        btn.addEventListener('click', () => {
            delete cart[item];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            displayCart();
        });

        div.appendChild(span);
        div.appendChild(btn);
        cartItemsDiv.appendChild(div);

        total += itemTotal;
    }

    cartTotal.textContent = total.toFixed(2);
}

// ---------- ADD TO BAG ----------
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);

        let quantity = parseInt(prompt(`How many ${name}s would you like?`));
        if (isNaN(quantity) || quantity <= 0) {
            alert("Enter a valid number!");
            return;
        }

        if (cart[name]) {
            cart[name].quantity += quantity;
        } else {
            cart[name] = { price, quantity };
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCart(); // <-- show immediately
        alert(`${quantity} ${name}(s) added to your bag!`);
    });
});

// ---------- SIDEBAR ----------
function openNav() {
    document.getElementById("mySidebar").style.width = "300px";
    displayCart(); // just in case
}
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}

// ---------- RESET CART ----------
const resetBtn = document.getElementById('resetCart');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to reset your order?")) {
            cart = {};
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            displayCart();
        }
    });
}

// ---------- INITIALIZE ----------
updateCartCount();
displayCart(); // display items immediately on page load
