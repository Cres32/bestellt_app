function getDishHtml(dish) {
    return `
        <div class="menu_item"> 
            <img src="${dish.image}" alt="${dish.name}" class="item_image">
            <div class="item_info">
                <h3>${dish.name}</h3>
                <p class="description">${dish.description}</p>
                <span class="dish_price">${dish.price.toFixed(2)}€</span>
            </div>
            <button onclick="addToCart(${dish.id})" class="add_button">+</button> 
        </div>
    `; 
}


function getCartItemHtml(item) {
  return `
        <div class="cart_item">
            <div class="cart_item_top">
                <span class="item_name">${item.name}</span>
                <span class="item_price">${(item.price * item.count).toFixed(
                  2
                )}€</span>
            </div>
            
            <div class="cart_item_bottom">
                <div class="quantity_controls">
                    <button class="quantity_btn" onclick="decreaseAmount(${
                      item.id
                    })">-</button>
                    <span class="item_count">${item.count}x</span>
                    <button class="quantity_btn" onclick="addToCart(${
                      item.id
                    })">+</button>
                </div>
                <button class="delete_btn" onclick="removeItem(${item.id})">
                    <img src="./assets/icons/trash.png" alt="Löschen" class="trash_icon">
                </button>
            </div>
        </div>
    `;
}