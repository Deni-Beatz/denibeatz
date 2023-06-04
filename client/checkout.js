// cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// Open Cart
cartIcon.onclick = () =>{
    cart.classList.add('active');
}
// Close Cart
closeCart.onclick = () =>{
    cart.classList.remove('active');
}
// Cart Working JS
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

// Making Function
function ready(){
    // Quantity Changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');  
    for (var i = 0; i < quantityInputs.length; i ++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    // Add to Cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
    // Buy Button Work
    document.querySelector('.btn-buy').addEventListener('click', buyButtonClicked);
}
// Initialize total variable to 0
let total = 0;  

function buyButtonClicked() {
    const cartContent = document.querySelector('.cart-content');
    const items = cartContent.querySelectorAll('.cart-box');
  
    if (items.length === 0) {
      alert('Your cart is empty!');
    } else {
      alert("Let's continue to checkout!");
      window.location.href = 'checkout.html';
    }
  
    while (cartContent.firstChild) {
      cartContent.removeChild(cartContent.firstChild);
    }
  
    // Clear cartProducts array
    cartProducts = [];
  
    // Set cartCount and cartTotal to zero
    cartCount = 0;
    var cartTotal = document.querySelector('.cart-total-price');
    cartTotal.innerHTML = '$0';
  
    // Update cart notification
    updateCartNotification();
  
  // Set total to 0 at the end of the function
  total = 0;
}

// update cart notification function
function updateCartNotification() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartItemsCount = cartContent.getElementsByClassName('cart-box').length;
    var cartNotification = document.getElementById('cart-notification');
    cartNotification.innerText = cartItemsCount === 0 ? '0' : cartItemsCount;
}


// Quantity Changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

// Add to Cart /GRESKA/ 
var cartProducts = []; // Array to store added products and their options

var cartCount = 0; // initialize cart count to zero

function addCartClicked(event) {
    var button = event.target;
    var productContainer = button.parentElement.parentElement;
    var title = productContainer.getElementsByClassName('product-title')[0].innerText;
    var price = productContainer.getElementsByClassName('price')[0].innerText;
    var productImg = productContainer.getElementsByClassName('product-img')[0].src;
    var licence = productContainer.getElementsByClassName('licence')[0].value;

    if (licence === "Select Licence") {
        alert('Please select a licence');
        return;
    }

    if (licence === "Exclusive") {
    alert('Exclusive licence includes Stems, Tagged Mastered MP3 & Untagged Unmastered Wav');
  }

  for (var i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].title === title && cartProducts[i].option === licence) {
        alert('You have already added this product with the same licence')
        return;
    }
  }

    // Add product to cartProducts array
    cartProducts.push({title: title, option: licence});

    addProductsToCart(title, price, productImg, licence);
    updatetotal();   
}

// Add event listener to Buy button
const buyButton = document.getElementById('buy-btn');
buyButton.addEventListener('click', buyButtonClicked);


// Handle case when user clicks add to cart button multiple times
var addToCartButtons = document.getElementsByClassName('add-cart');
for (var i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', addCartClicked);
}

function addProductsToCart(title, price, productImg, licence) {
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
  
    /* Check if the product already exists in the cart
    for (var i = 0; i < cartItemsNames.length; i++) {
      if (cartItemsNames[i].innerText === title) {
        alert('You have already added this product to your cart.');
        return;
      }
    } */
  
    // Create the cart item element and add it to the cart
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
  
    var cartBoxContent =
    `
    <img src="${productImg}" alt="" class="cart-img product-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <select class="licence">
            <option>${licence}</option>
        </select>
    </div>
    `;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    // Store the selected product in localStorage
    var cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    cartProducts.push({title: title, option: licence});
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  
    // Update the cart notification with the number of items in the cart
    var cartNotification = document.getElementById('cart-notification');
    var cartItemsCount = cartItems.getElementsByClassName('cart-box').length;
    cartNotification.innerText = cartItemsCount === 0 ? '0' : cartItemsCount;
  
    // Update the total amount in the cart
    updatetotal();
  
    // Update the cart notification with the number of items in the cart
    var cartNotification = document.getElementById('cart-notification');
    var cartItemsCount = cartItems.getElementsByClassName('cart-box').length;
    cartNotification.innerText = cartItemsCount === 0 ? '0' : cartItemsCount;
}

// Remoev items
function updateCartNotification() {
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsCount = cartItems.getElementsByClassName('cart-box').length;
    var cartNotification = document.getElementById('cart-notification');
    
    if (cartItemsCount === 0) {
        cartNotification.innerText = '0';
    } else {
        cartNotification.innerText = cartItemsCount;
    }
}


// Handle case when user clicks add to cart button multiple times
var addToCartButtons = document.getElementsByClassName('add-cart');
for (var i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', addCartClicked);
}

// Notification

// Update Total
function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = document.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        total += price;
    }
    // If price Contain some Cents Value
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
}