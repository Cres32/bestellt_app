let shoppingCart = [];
let menuContainer,
  headerMenu,
  cartList,
  totalElement,
  subtotalElement,
  shippingCostElement,
  cartAside;

function initPage() {
  menuContainer = document.getElementById("menu");
  cartList = document.getElementById("cart_list");
  headerMenu = document.getElementById("header_menu");
  totalElement = document.getElementById("total");
  subtotalElement = document.getElementById("subtotal");
  shippingCostElement = document.getElementById("shipping_cost");
  cartAside = document.getElementById("shopping_cart");

  loadCart();
  renderMyDishes();
  updateCart();
}

function saveCart() {
  if (Array.isArray(shoppingCart)) {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  }
}

function loadCart() {
  let savedCart = localStorage.getItem("shoppingCart");

  if (savedCart) {
    shoppingCart = JSON.parse(savedCart);
  }
}

function groupCartItems() {
  let groupedItems = {};

  for (let i = 0; i < shoppingCart.length; i++) {
    let item = shoppingCart[i];
    let id = item.id;

    if (!groupedItems[id]) {
      groupedItems[id] = {
        id: item.id,
        name: item.name,
        price: item.price,
        count: 1,
      };
    } else {
      groupedItems[id].count++;
    }
  }

  return groupedItems;
}

function addToCart(productId) {
  let selectedProduct = myDishes.find((p) => p.id === productId);
  if (selectedProduct) {
    shoppingCart.push(selectedProduct);
    updateCart();
  }
}

function decreaseAmount(productId) {
  const index = shoppingCart.findIndex((item) => item.id === productId);
  if (index !== -1) {
    shoppingCart.splice(index, 1);
    updateCart();
  }
}

function removeItem(productId) {
  shoppingCart = shoppingCart.filter((item) => item.id !== productId);
  updateCart();
}

function renderMyDishes() {
  if (!menuContainer || !myDishes) return;

  menuContainer.innerHTML = "";
  myDishes.forEach((dish) => {
    menuContainer.innerHTML += getDishHtml(dish);
  });

}

function renderCartList(groupedItems) {
  let subtotal = 0;
  let htmlContent = "";

  for (let id in groupedItems) {
    let item = groupedItems[id];
    subtotal += item.price * item.count;

    htmlContent += `
        <li class="cart_item" data-id="${item.id}">
            ${getCartItemHtml(item)}
        </li>
        `;
  }

  cartList.innerHTML = htmlContent;

  return subtotal;
}

function toggleBasket() {

  if (window.innerWidth <= 1000) {
    cartAside.classList.toggle("basket_active");

    const overlay = document.getElementById("overlay");

    if (cartAside.classList.contains("basket_active")) {
      overlay.style.display = "block";
      document.body.style.overflow = "hidden";
    } else {
      overlay.style.display = "none";
      document.body.style.overflow = "auto";
    }
  } else {
    document.body.style.overflow = "auto";
  }
}

function updateCart() {
  const groupedItems = groupCartItems();
  const subtotal = renderCartList(groupedItems);

  let selectedDelivery = document.querySelector(
    'input[name="delivery"]:checked'
  );
  let shippingCost = selectedDelivery
    ? parseFloat(selectedDelivery.value)
    : 0.0;
  let total = subtotal + shippingCost;

  subtotalElement.textContent = subtotal.toFixed(2) + "€";
  shippingCostElement.textContent = shippingCost.toFixed(2) + "€";
  totalElement.textContent = total.toFixed(2) + "€";

  const msg = document.getElementById("empty-cart-message");
 
  if (shoppingCart.length > 0) {
    msg.style.display = "none"; 
    content.style.display = "block";
  } else {
    msg.style.display = "block";
    content.style.display = "none";
  }

  saveCart();
}

function updateCartTotals(subtotal) {
  let selectedDelivery = document.querySelector(
    'input[name="delivery"]:checked'
  );
  let shipping = selectedDelivery ? parseFloat(selectedDelivery.value) : 0.0;
  let total = subtotal + shipping;

  subtotalElement.textContent = subtotal.toFixed(2) + "€";
  shippingCostElement.textContent = shipping.toFixed(2) + "€";
  totalElement.textContent = total.toFixed(2) + "€";
}

function checkout() {
  const msgElement = document.getElementById("cart-validation-msg");

  if (shoppingCart.length > 0) {
    document.getElementById("order_overlay").classList.remove("d-none");
    shoppingCart = [];
    updateCart();
  } else {
    if (msgElement) {
      msgElement.style.display = "block";
      msgElement.style.color = "red";
      msgElement.style.marginTop = "10px";
      msgElement.innerHTML = "Ihr Warenkorb ist leer!";
    }
  }
}

function closeOrderModal() {
  let overlay = document.getElementById("order_overlay");
  overlay.classList.add("d-none"); 
}
