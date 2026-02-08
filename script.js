const buttons = document.querySelectorAll('.button');
const itemCountSpan = document.querySelector('.span1');
let cart = JSON.parse(localStorage.getItem('cart')) || {};

function updateCartCount(){
    let totalItems = 0;
    for(let item in cart) totalItems += cart[item].quantity;
    itemCountSpan.textContent = totalItems;
}
updateCartCount();

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
        let quantity = parseInt(prompt(`How many ${name}s would you like?`));
        if(isNaN(quantity) || quantity <=0){ alert("Enter a valid number!"); return; }
        if(cart[name]) cart[name].quantity += quantity;
        else cart[name] = {price, quantity};
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${quantity} ${name}(s) added to your bag!`);
    });
});

function openNav(){
    document.getElementById("mySidebar").style.width="300px";
    displayCart();
}
function closeNav(){
    document.getElementById("mySidebar").style.width="0";
}

function displayCart(){
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    cartItemsDiv.innerHTML="";
    let total=0;

    for(let item in cart){
        const quantity = cart[item].quantity;
        const price = cart[item].price;
        const itemTotal = quantity*price;

        const div = document.createElement('div');
        div.classList.add('cart-item');

        const span = document.createElement('span');
        span.textContent = `${item} x${quantity} - $${itemTotal.toFixed(2)}`;

        const btn = document.createElement('button');
        btn.textContent="Remove";
        btn.addEventListener('click', ()=>{
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
    cartTotal.textContent=total.toFixed(2);
}

// Reset cart
document.getElementById('resetCart').addEventListener('click', ()=>{
    if(confirm("Are you sure you want to reset your order?")){
        cart={};
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCart();
    }
});
