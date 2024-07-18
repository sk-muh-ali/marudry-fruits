let quantity = 1;
let alert_div = document.querySelector(".alert");
function addToCart(productName, price, unit) {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.push({ productName, price, unit, quantity });
  localStorage.setItem('cart', JSON.stringify(cartItems));

  alert_div.style.display = "flex";
}