// Main application logic
let currentCategory = 'all';
let searchQuery = '';

// DOM elements
const productsGrid = document.getElementById('products-grid');
const productsCount = document.getElementById('products-count');
const categoryItems = document.querySelectorAll('.category-item');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');

// Initialize application
function initApp() {
    initFavorites();
    initCart();
    initSearch();
    
    if (productsGrid) {
        renderProducts();
        updateCategoryCounts();
        addProductEventListeners();
    }
    
    // Add category event listeners
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.dataset.category;
            filterByCategory(category);
        });
    });
}

// Render products
function renderProducts() {
    if (!productsGrid) return;
    
    let filteredProducts = getProductsByCategory(currentCategory);
    
    if (searchQuery) {
        filteredProducts = searchProducts(searchQuery).filter(product =>
            currentCategory === 'all' || product.category === currentCategory
        );
    }
    
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--gray-color); margin-bottom: 1rem;"></i>
                <h3>Товары не найдены</h3>
                <p>Попробуйте изменить параметры поиска или выберите другую категорию</p>
            </div>
        `;
    } else {
        filteredProducts.forEach(product => {
            const isFavorite = favorites.includes(product.id);
            const isInCart = cart.find(item => item.id === product.id);
            
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.id = product.id;
            
            productCard.innerHTML = `
                <div class="product-image">
                    <i class="fas fa-tshirt"></i>
                    ${product.originalPrice > product.price ? 
                        `<div class="product-badge">-${Math.round((1 - product.price/product.originalPrice) * 100)}%</div>` : 
                        ''}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">${product.price} ₽</span>
                        ${product.originalPrice ? 
                            `<span class="original-price">${product.originalPrice} ₽</span>` : 
                            ''}
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-primary ${isInCart ? 'btn-in-cart' : ''}" 
                                data-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i>
                            ${isInCart ? 'В корзине' : 'В корзину'}
                        </button>
                        <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                                data-id="${product.id}">
                            <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                    </div>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
    }
    
    // Update products count
    if (productsCount) {
        productsCount.textContent = `${filteredProducts.length} товаров`;
    }
    
    // Add event listeners
    addProductEventListeners();
}

// Add product event listeners
function addProductEventListeners() {
    // Add to cart buttons
    document.querySelectorAll('.btn-primary[data-id]').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            addToCart(productId, 1);
        });
    });
    
    // Favorite buttons
    document.querySelectorAll('.favorite-btn[data-id]').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            toggleFavorite(productId);
        });
    });
}

// Filter by category
function filterByCategory(category) {
    currentCategory = category;
    
    // Update active category
    categoryItems.forEach(item => {
        if (item.dataset.category === category) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Render filtered products
    renderProducts();
}

// Update category counts
function updateCategoryCounts() {
    const counts = getCategoryCounts();
    
    categoryItems.forEach(item => {
        const category = item.dataset.category;
        const countElement = item.querySelector('.category-count');
        if (countElement && counts[category] !== undefined) {
            countElement.textContent = counts[category];
        }
    });
}

// Show notification
function showNotification(message) {
    if (!notification || !notificationText) return;
    
    notificationText.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);