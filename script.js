function initPage() { 
    menuContainer = document.getElementById('menu'); 
    hamburgerIcon = document.getElementById('hamburger_icon');
    headerMenu = document.getElementById('header_menu');
    cartList = document.getElementById('cart_list');
    totalElement = document.getElementById('total');
    subtotalElement = document.getElementById('subtotal');
    shippingCostElement = document.getElementById('shipping_cost');
    buyBtn = document.getElementById('buy');
    cartAside = document.getElementById('shopping_cart'); 
    
    initHamburger();
    initBuyButton();
    loadCart(); 
    renderMyDishes(); 
}


let shoppingCart = [];

function saveCart() {

    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
}


function loadCart() {
    let savedCart = localStorage.getItem('shoppingCart');
    
    if (savedCart) {
        shoppingCart = JSON.parse(savedCart);
    }
}

function initHamburger() {

    if (hamburgerIcon && headerMenu) {
        hamburgerIcon.addEventListener('click', () => {
            headerMenu.classList.toggle('active'); 
        });
    }
}

function groupCartItems() {
    let groupedItems = new Map();
    shoppingCart.forEach(item => {
        if (!groupedItems.has(item.id)) {
            groupedItems.set(item.id, { ...item, count: 0 });
        }
        groupedItems.get(item.id).count++;
    });
    return groupedItems;
}

function addToCart(productId) { 
    let selectedProduct = myDishes.find(p => p.id === productId); 
    if (selectedProduct) {
        shoppingCart.push(selectedProduct);
        updateCart();
    }
}

function decreaseAmount(productId) {
    const index = shoppingCart.findIndex(item => item.id === productId);
    if (index !== -1) {
        shoppingCart.splice(index, 1); 
        updateCart();
    }
}

function removeItem(productId) {
    shoppingCart = shoppingCart.filter(item => item.id !== productId);
    updateCart();
}


function renderMyDishes() {
    if (!menuContainer || !myDishes) return;
    
    menuContainer.innerHTML = '';
    myDishes.forEach(dish => {
        menuContainer.innerHTML += getDishHtml(dish);
    });

    updateCart(); 
}


function renderCartList(groupedItems) {
    cartList.innerHTML = '';
    let subtotal = 0;
    
    groupedItems.forEach(item => {
        let itemTotal = item.price * item.count;
        subtotal += itemTotal;
        
        let li = document.createElement('li');
        li.classList.add('cart_item');
        li.dataset.id = item.id;

        li.innerHTML = getCartItemHtml(item); 
        cartList.appendChild(li);
    });
    return subtotal;
}


function updateCart() {
    
    const groupedItems = groupCartItems();
    const subtotal = renderCartList(groupedItems);

    let selectedDelivery = document.querySelector('input[name="delivery"]:checked');
    let shippingCost = selectedDelivery ? parseFloat(selectedDelivery.value) : 0.00;
    let total = subtotal + shippingCost;

    subtotalElement.textContent = subtotal.toFixed(2) + '€';
    shippingCostElement.textContent = shippingCost.toFixed(2) + '€';
    totalElement.textContent = total.toFixed(2) + '€';
    
    saveCart(); 
}


function initBuyButton() {
    if (buyBtn) {
        buyBtn.addEventListener('click', () => {
            if (shoppingCart.length > 0) { 
                alert('Vielen Dank für Ihren Kauf! Ihre Bestellung ist unterwegs.');
                shoppingCart = [];
                updateCart(); 
            } else { 
                alert('Ihr Warenkorb ist leer. Bitte fügen Sie Artikel hinzu!');
            } 
        });
    }
}