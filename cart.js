const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
const itemsContainer = document.querySelector('.items');
if (cartItems.length == 0) {
    itemsContainer.innerHTML = "<h1 class = 'empty'>Your cart is <span>empty!</span></h1>";
}
else {
    cartItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
          <div class="img" style="background-image: url(Product-${item.productName}.jpg);"></div>
          <div class="info">
              <h2>${item.productName}</h2>
              <div class="quantity">
                  <h3>Qty.</h3>
                  <div class="container">
                      <div class="qty">
                          <div class="sub" onclick="sub_qty(this, ${index})">-</div>
                          <div class="qty-num">${item.quantity || 1}</div>
                          <div class="add" onclick="add_qty(this, ${index})">+</div>
                      </div>
                      <h4>Pack of ${item.unit}</h4>
                  </div>
              </div>
              <div class="price-container">
                  <h3>$</h3>
                  <h3 class="item-price">${item.price || '0'}</h3>
                  <h3>/</h3>
                  <h3>${item.unit || 'Unit'}</h3>
              </div>
          </div>
          <input type="checkbox" class="checkbox" onclick="checkbox_clicked(this, ${index})">
          <p class="close-btn" onclick="closebtn_clicked(this, ${index})">X</p>
        `;
        itemsContainer.appendChild(itemDiv);
    })
}

function closebtn_clicked(element, index) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (element.classList == "close-btn") {
        if (index >= 0 && index < cartItems.length) {
            cartItems.splice(index, 1);
        }
    localStorage.setItem('cart', JSON.stringify(cartItems));

    element.parentElement.remove();
    }
}

const subtotal_element = document.querySelector(".subtotal");
const total_element = document.querySelector(".total");
let subtotal = 0;
let total = 0;
function checkbox_clicked(element, index) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let product_total = cartItems[index].quantity * cartItems[index].price;
    if(element.checked){
        subtotal += product_total;
    }
    else {
        let product_total = cartItems[index].quantity * cartItems[index].price;
        subtotal -= product_total;
    }
    total = subtotal + 1
    subtotal_element.textContent = "$" + subtotal;
    total_element.textContent = "$" + total;
}

function sub_qty(element, index) {
    var quantityElement = element.nextElementSibling;
    var currentQuantity = parseInt(quantityElement.textContent);
    
    currentQuantity = Math.max(1, currentQuantity - 1);
    
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems[index].quantity = currentQuantity;

    localStorage.setItem('cart', JSON.stringify(cartItems));

    quantityElement.textContent = cartItems[index].quantity || 1;
}

function add_qty(element, index) {
    var quantityElement = element.previousElementSibling;
    var currentQuantity = parseInt(quantityElement.textContent);
    
    currentQuantity += 1;
    
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems[index].quantity = currentQuantity;

    localStorage.setItem('cart', JSON.stringify(cartItems));

    quantityElement.textContent = cartItems[index].quantity || 1;
}