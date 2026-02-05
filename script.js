const orderButton = document.querySelector('.button');
const itemCountSpan = document.querySelector('span');

let itemCount = 0;
orderButton.addEventListener('click', () => {
    itemCount++;
    itemCountSpan.textContent = itemCount;
    // Item count stays updated across pages
    localStorage.setItem('itemCount', itemCount);

});
