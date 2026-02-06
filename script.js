const orderButton = document.querySelectorAll('.button');
const itemCountSpan = document.querySelector('.span1');


// Load the saved item count from localStorage, default to 0 if not found
let itemCount = parseInt(localStorage.getItem('itemCount')) || 0;

// Display the current count when the page loads
itemCountSpan.textContent = itemCount;

orderButton.forEach(button => {
    button.addEventListener('click', () => {
        itemCount++;
        itemCountSpan.textContent = itemCount;
        // Save the updated count to localStorage
        localStorage.setItem('itemCount', itemCount);
    });
});

console.log("running");


/* Set the width of the sidebar to 250px and the right margin of the content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.querySelector(".main-content").style.marginRight = "250px";
}

/* Set the width of the sidebar to 0 and the right margin of the content to 0 */
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.querySelector(".main-content").style.marginRight = "0";
}