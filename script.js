const buttons = document.querySelectorAll('.button');
const itemCountSpans = document.querySelectorAll('.span1');








let cart = JSON.parse(localStorage.getItem('cart')) || {};








//UPDATE BAG NUMBER
function updateCartCount() {
  let totalItems = 0;
  for (let item in cart) {
      totalItems += cart[item].quantity;
  }
  itemCountSpans.forEach(s => s.textContent = totalItems);
}








// DISPLAY CART
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








// ADD TO BAG
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








//SIDEBAR
function openNav() {
  document.getElementById("mySidebar").style.width = "300px";
  displayCart();
}
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
}








//RESET CART
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








//INITIALIZE CART
updateCartCount();
displayCart();








// RESERVATION FORM
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
  reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Thank you! Your reservation has been made.");
      reservationForm.reset();
  });
}








// ACCOUNT FORM
const accountForm = document.getElementById('accountForm');
if(accountForm){




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




// PURCHASE BUTTON
const purchaseBtn = document.getElementById('purchaseBtn');
if(purchaseBtn){
  purchaseBtn.addEventListener('click', ()=>{
      if(Object.keys(cart).length === 0){
          alert("Your bag is empty!");
          return;
      } else {
          // LOYALTY: count total items and add to running total
          let loyaltyItems = parseInt(localStorage.getItem('loyaltyItems')) || 0;
          for (let item in cart) {
              loyaltyItems += cart[item].quantity;
          }
          localStorage.setItem('loyaltyItems', loyaltyItems);




          // PAST ORDERS: save this order to history
          let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
          const now = new Date();
          const total = Object.values(cart).reduce((sum, i) => sum + i.price * i.quantity, 0);
          orderHistory.unshift({
              id: Date.now(),
              date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
              items: JSON.parse(JSON.stringify(cart)),
              total: parseFloat(total.toFixed(2))
          });
          if (orderHistory.length > 15) orderHistory = orderHistory.slice(0, 15);
          localStorage.setItem('orderHistory', JSON.stringify(orderHistory));




          alert("Thank you for your purchase! Your order is being processed.\n⭐ Check your Loyalty Rewards to see your progress!");
          cart = {};
          localStorage.setItem('cart', JSON.stringify(cart));
          updateCartCount();
          displayCart();
      }
  });
}







const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu   = document.getElementById('mobileMenu');


if (hamburgerBtn && mobileMenu) {
 hamburgerBtn.addEventListener('click', () => {
   const isOpen = mobileMenu.classList.toggle('open');
   hamburgerBtn.classList.toggle('open', isOpen);
   hamburgerBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
 });


 // Close when a link is tapped
 mobileMenu.querySelectorAll('a').forEach(link => {
   link.addEventListener('click', () => {
     mobileMenu.classList.remove('open');
     hamburgerBtn.classList.remove('open');
   });
 });


 // Close when tapping outside
 document.addEventListener('click', (e) => {
   if (!e.target.closest('.mobile-nav')) {
     mobileMenu.classList.remove('open');
     hamburgerBtn.classList.remove('open');
   }
 });
}
