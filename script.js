let basket = [];
let currentShippingCost = 5;

function initPage() {
  renderMenu();
}

function renderMenu() {
  let menuContainer = document.getElementById("menu");
  if (!menuContainer) return;
  menuContainer.innerHTML = "";
  for (let i = 0; i < myDishes.length; i++) {
    menuContainer.innerHTML += getDishHtml(myDishes[i]);
  }
}

function addToCart(id) {
  const dish = myDishes.find((d) => d.id === id);
  const basketItem = basket.find((item) => item.id === id);

  if (basketItem) {
    basketItem.count++;
  } else {
    basket.push({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      count: 1,
    });
  }
  renderBasket();
}

function decreaseAmount(id) {
  const basketItem = basket.find((item) => item.id === id);
  if (basketItem) {
    basketItem.count--;
    if (basketItem.count <= 0) {
      removeItem(id);
    }
  }
  renderBasket();
}

function removeItem(id) {
  basket = basket.filter((item) => item.id !== id);
  renderBasket();
}

function renderBasket() {
  let container = document.getElementById("basket_items_container");
  let emptyMsg = document.getElementById("empty-cart-message");
  let cartContent = document.getElementById("cart_content");

  container.innerHTML = "";

  if (basket.length > 0) {
    emptyMsg.classList.add("d-none");
    cartContent.classList.remove("d-none");
    for (let i = 0; i < basket.length; i++) {
      container.innerHTML += getCartItemHtml(basket[i]);
    }
  } else {
    emptyMsg.classList.remove("d-none");
    cartContent.classList.add("d-none");
  }
  updateCart();
}

function updateCart(shippingValue) {
  if (shippingValue !== undefined) {
    currentShippingCost = shippingValue;
  }
  let subtotal = 0;
  for (let i = 0; i < basket.length; i++) {
    subtotal += basket[i].price * basket[i].count;
  }
  let total = basket.length > 0 ? subtotal + currentShippingCost : 0;

  document.getElementById("subtotal").innerHTML = `${subtotal.toFixed(2)}€`;
  document.getElementById(
    "shipping_cost"
  ).innerHTML = `${currentShippingCost.toFixed(2)}€`;
  document.getElementById("total").innerHTML = `${total.toFixed(2)}€`;
}

// --- INTERFAZ Y MODALES ---
function toggleCart() {
  let basketEl = document.getElementById("shopping_cart");
  let overlay = document.getElementById("overlay"); // EL FONDO OSCURO
  let mobileBtn = document.getElementById("mobile_basket_header");

  basketEl.classList.toggle("show_cart");
  overlay.classList.toggle("show_overlay"); // Según tu CSS

  if (basketEl.classList.contains("show_cart")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}

function checkout() {
  if (basket.length > 0) {
  
    document.getElementById("order_overlay").classList.remove("d-none");
   
    document.getElementById("shopping_cart").classList.remove("show_cart");
    document.getElementById("overlay").classList.remove("show_overlay");
  
    basket = [];
    renderBasket();
  }
}

function closeOrderModal() {
  document.getElementById("order_overlay").classList.add("d-none");
  document.body.style.overflow = "auto";
}