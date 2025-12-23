// Cart state and functions
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let selectedItems = [];

// DOM elements
const cartCountElements = document.querySelectorAll('.cart-count, .cart-count-mobile');
const cartItemsList = document.getElementById('cart-items-list');
const cartSummary = document.getElementById('cart-summary');
const checkoutBtn = document.getElementById('checkout-btn');
const clearCartBtn = document.getElementById('clear-cart');
const selectAllBtn = document.getElementById('select-all');

// Initialize cart
function initCart() {
    updateCartCount();
    if (cartItemsList) {
        renderCart();
    }
}

// Add to cart
function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Update quantity (max 10)
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity <= 10) {
            existingItem.quantity = newQuantity;
            showNotification(`Количество товара "${product.name}" увеличено до ${newQuantity}`);
        } else {
            showNotification(`Максимальное количество на позицию "${product.name}" - 10`);
            return;
        }
    } else {
        // Add new item
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            quantity: quantity,
            image: product.image
        });
        showNotification(`Товар "${product.name}" добавлен в корзину`);
    }
    
    // Update product status
    updateProductCartStatus(productId, true, existingItem ? existingItem.quantity + quantity : quantity);
    
    // Update UI and storage
    updateCartUI();
    localStorage.setItem('cart', JSON.stringify(cart));
    
    return true;
}

// Remove from cart
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    
    if (index !== -1) {
        const productName = cart[index].name;
        cart.splice(index, 1);
        
        // Update product status
        updateProductCartStatus(productId, false, 0);
        
        // Update selected items
        const selectedIndex = selectedItems.indexOf(productId);
        if (selectedIndex !== -1) {
            selectedItems.splice(selectedIndex, 1);
        }
        
        showNotification(`Товар "${productName}" удален из корзины`);
        
        // Update UI and storage
        updateCartUI();
        localStorage.setItem('cart', JSON.stringify(cart));
        
        return true;
    }
    
    return false;
}

// Update cart quantity
function updateCartQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    if (newQuantity > 10) {
        showNotification('Максимальное количество на позицию - 10');
        return;
    }
    
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity = newQuantity;
        
        // Update product status
        updateProductCartStatus(productId, true, newQuantity);
        
        // Update UI and storage
        updateCartUI();
        localStorage.setItem('cart', JSON.stringify(cart));
        
        return true;
    }
    
    return false;
}

// Update cart UI
function updateCartUI() {
    updateCartCount();
    updateProductButtons();
    
    if (cartItemsList) {
        renderCart();
    }
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Update product buttons
function updateProductButtons() {
    const addToCartButtons = document.querySelectorAll('.btn-primary[data-id]');
    addToCartButtons.forEach(button => {
        const productId = parseInt(button.dataset.id);
        const cartItem = cart.find(item => item.id === productId);
        
        if (cartItem) {
            button.innerHTML = `<i class="fas fa-shopping-cart"></i> В корзине`;
            button.classList.add('btn-in-cart');
        } else {
            button.innerHTML = `<i class="fas fa-shopping-cart"></i> В корзину`;
            button.classList.remove('btn-in-cart');
        }
    });
}

// Render cart
function renderCart() {
    if (!cartItemsList) return;
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Ваша корзина пуста</h3>
                <p>Добавьте товары из каталога</p>
                <a href="index.html" class="btn btn-primary">
                    <i class="fas fa-shopping-bag"></i>
                    Перейти к покупкам
                </a>
            </div>
        `;
        
        // Hide summary if exists
        if (cartSummary) {
            cartSummary.classList.add('hidden');
        }
        
        // Disable checkout button
        if (checkoutBtn) {
            checkoutBtn.disabled = true;
        }
        
        return;
    }
    
    // Show summary if exists
    if (cartSummary) {
        cartSummary.classList.remove('hidden');
    }
    
    // Render cart items
    let cartHTML = '';
    let subtotal = 0;
    let totalItems = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        totalItems += item.quantity;
        const isSelected = selectedItems.includes(item.id);
        
        cartHTML += `
            <div class="cart-item-card">
                <div class="cart-item-select">
                    <input type="checkbox" class="cart-item-checkbox" 
                           data-id="${item.id}" 
                           ${isSelected ? 'checked' : ''}>
                </div>
                <div class="cart-item-image">
                    <i class="fas fa-tshirt"></i>
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">${item.price} ₽</div>
                    ${item.originalPrice ? 
                        `<div class="cart-item-original-price">${item.originalPrice} ₽</div>` : 
                        ''}
                    <div class="cart-item-actions">
                        <div class="quantity-controls">
                            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        </div>
                        <button class="cart-item-remove" data-id="${item.id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartItemsList.innerHTML = cartHTML;
    
    // Update summary
    if (document.getElementById('subtotal')) {
        const discount = Math.min(600, subtotal * 0.2);
        const total = subtotal - discount;
        
        document.getElementById('subtotal').textContent = `${subtotal} ₽`;
        document.getElementById('discount').textContent = `-${discount} ₽`;
        document.getElementById('total').textContent = `${total} ₽`;
        document.getElementById('total-items').textContent = totalItems;
        
        // Enable checkout button
        if (checkoutBtn) {
            checkoutBtn.disabled = false;
        }
    }
    
    // Add event listeners
    addCartEventListeners();
}

// Add cart event listeners
function addCartEventListeners() {
    // Decrease buttons
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                updateCartQuantity(productId, cartItem.quantity - 1);
            }
        });
    });
    
    // Increase buttons
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                updateCartQuantity(productId, cartItem.quantity + 1);
            }
        });
    });
    
    // Remove buttons
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            removeFromCart(productId);
        });
    });
    
    // Checkbox select
    document.querySelectorAll('.cart-item-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const productId = parseInt(this.dataset.id);
            if (this.checked) {
                if (!selectedItems.includes(productId)) {
                    selectedItems.push(productId);
                }
            } else {
                const index = selectedItems.indexOf(productId);
                if (index !== -1) {
                    selectedItems.splice(index, 1);
                }
            }
            updateSelectAllButton();
        });
    });
}

// Update select all button
function updateSelectAllButton() {
    if (!selectAllBtn) return;
    
    const allChecked = cart.length > 0 && selectedItems.length === cart.length;
    const icon = allChecked ? 'fas fa-check-square' : 'far fa-square';
    
    selectAllBtn.innerHTML = `<i class="${icon}"></i> ${allChecked ? 'Снять все' : 'Выбрать все'}`;
}

// Clear cart
function clearCart() {
    if (cart.length === 0) return;
    
    // Reset product states
    cart.forEach(item => {
        updateProductCartStatus(item.id, false, 0);
    });
    
    // Clear cart
    cart = [];
    selectedItems = [];
    
    // Update UI and storage
    updateCartUI();
    localStorage.setItem('cart', JSON.stringify(cart));
    
    showNotification('Все товары удалены из корзины');
}

// Toggle select all
function toggleSelectAll() {
    if (!selectAllBtn) return;
    
    const allChecked = selectedItems.length === cart.length;
    
    if (allChecked) {
        // Deselect all
        selectedItems = [];
    } else {
        // Select all
        selectedItems = cart.map(item => item.id);
    }
    
    // Update checkboxes
    document.querySelectorAll('.cart-item-checkbox').forEach(checkbox => {
        checkbox.checked = !allChecked;
    });
    
    updateSelectAllButton();
}

// Checkout
function checkout() {
    if (cart.length === 0) return;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = Math.min(600, subtotal * 0.2);
    const total = subtotal - discount;
    
    alert(`Заказ оформлен!\n\nСумма заказа: ${total} ₽\nСкидка: ${discount} ₽\nТоваров: ${cart.reduce((sum, item) => sum + item.quantity, 0)}\n\nСпасибо за покупку!`);
    
    // Clear cart after checkout
    clearCart();
}

// Event listeners for cart page
if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
}

if (selectAllBtn) {
    selectAllBtn.addEventListener('click', toggleSelectAll);
}

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', checkout);
}