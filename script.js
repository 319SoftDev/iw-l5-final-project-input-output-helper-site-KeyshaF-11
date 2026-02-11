const buttons = document.querySelectorAll('.button');
const itemCountSpan = document.querySelector('.span1');


let cart = JSON.parse(localStorage.getItem('cart')) || {};


// ---------- UPDATE BAG NUMBER ----------
function updateCartCount() {
    let totalItems = 0;
    for (let item in cart) {
        totalItems += cart[item].quantity;
    }
    if(itemCountSpan) itemCountSpan.textContent = totalItems;
}


// ---------- DISPLAY CART ----------
function displayCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');


    if(!cartItemsDiv || !cartTotal) return;


    cartItemsDiv.innerHTML = "";
    let total = 0;


    for (let item in cart) {
        const quantity = cart[item].quantity;
        const price = cart[item].price;
        const itemTotal = quantity * price;


        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.alignItems = 'center';
        div.style.marginBottom = '10px';
        div.style.padding = '6px 10px';
        div.style.backgroundColor = 'rgba(255,255,255,0.2)';
        div.style.borderRadius = '8px';


        const span = document.createElement('span');
        span.textContent = `${item} x${quantity} - $${itemTotal.toFixed(2)}`;


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
        displayCart();
        alert(`${quantity} ${name}(s) added to your bag!`);
    });
});


// ---------- SIDEBAR ----------
function openNav() {
    document.getElementById("mySidebar").style.width = "300px";
    displayCart();
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


// ---------- INITIALIZE CART ----------
updateCartCount();
displayCart();


// --------------------- RESERVATION FORM ---------------------
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Thank you! Your reservation has been made.");
        reservationForm.reset();
    });
}


// --------------------- ACCOUNT FORM ---------------------
const accountForm = document.getElementById('accountForm');
if(accountForm){
    // Prefill with stored data if available
    const storedAccount = JSON.parse(localStorage.getItem('account')) || {};
    accountForm.querySelector('input[placeholder="Your Name"]').value = storedAccount.name || '';
    accountForm.querySelector('input[placeholder="Your Email"]').value = storedAccount.email || '';
    accountForm.querySelector('input[placeholder="Phone Number"]').value = storedAccount.phone || '';
    accountForm.querySelector('input[placeholder="Your Address"]').value = storedAccount.address || '';


    accountForm.addEventListener('submit', (e)=>{
        e.preventDefault();


        const name = accountForm.querySelector('input[placeholder="Your Name"]').value;
        const email = accountForm.querySelector('input[placeholder="Your Email"]').value;
        const phone = accountForm.querySelector('input[placeholder="Phone Number"]').value;
        const address = accountForm.querySelector('input[placeholder="Your Address"]').value;


        const accountData = { name, email, phone, address };
        localStorage.setItem('account', JSON.stringify(accountData));


        alert("Your information has been updated!");
    });
}
