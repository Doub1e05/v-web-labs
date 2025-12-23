// Search functionality
const searchInput = document.getElementById('search-input');
const searchSuggestions = document.getElementById('search-suggestions');

// Initialize search
function initSearch() {
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        
        const query = this.value.trim();
        
        if (query.length === 0) {
            hideSuggestions();
            return;
        }
        
        searchTimeout = setTimeout(() => {
            showSuggestions(query);
        }, 300);
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && !searchSuggestions.contains(event.target)) {
            hideSuggestions();
        }
    });
    
    // Handle Enter key
    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            performSearch(this.value);
            hideSuggestions();
        }
    });
}

// Show search suggestions
function showSuggestions(query) {
    if (!searchSuggestions) return;
    
    const results = searchProducts(query).slice(0, 5);
    
    if (results.length === 0) {
        searchSuggestions.innerHTML = `
            <div class="search-suggestion-item">
                <div class="text-center" style="width: 100%; color: var(--gray-color);">
                    <i class="fas fa-search"></i>
                    <p>Ничего не найдено</p>
                </div>
            </div>
        `;
    } else {
        let suggestionsHTML = '';
        
        results.forEach(product => {
            const isFavorite = favorites.includes(product.id);
            const isInCart = cart.find(item => item.id === product.id);
            
            suggestionsHTML += `
                <div class="search-suggestion-item" data-id="${product.id}">
                    <div class="suggestion-image">
                        <i class="fas fa-tshirt"></i>
                    </div>
                    <div class="suggestion-info">
                        <div class="suggestion-title">${product.name}</div>
                        <div class="suggestion-price">${product.price} ₽</div>
                    </div>
                    <div class="suggestion-actions">
                        <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                                data-id="${product.id}">
                            <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                        <button class="btn btn-small ${isInCart ? 'btn-in-cart' : 'btn-primary'}" 
                                data-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i>
                            ${isInCart ? 'В корзине' : 'В корзину'}
                        </button>
                    </div>
                </div>
            `;
        });
        
        searchSuggestions.innerHTML = suggestionsHTML;
        
        // Add event listeners to suggestion buttons
        document.querySelectorAll('.search-suggestion-item .favorite-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const productId = parseInt(this.dataset.id);
                toggleFavorite(productId);
                updateSuggestionButtons(productId);
            });
        });
        
        document.querySelectorAll('.search-suggestion-item .btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const productId = parseInt(this.dataset.id);
                addToCart(productId, 1);
                updateSuggestionButtons(productId);
            });
        });
        
        // Add click event to suggestion items
        document.querySelectorAll('.search-suggestion-item').forEach(item => {
            item.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                // In a real app, this would navigate to product page
                showNotification(`Переход на страницу товара: ${getProductById(productId).name}`);
                hideSuggestions();
                searchInput.value = '';
            });
        });
    }
    
    searchSuggestions.style.display = 'block';
}

// Hide suggestions
function hideSuggestions() {
    if (searchSuggestions) {
        searchSuggestions.style.display = 'none';
    }
}

// Update suggestion buttons after interaction
function updateSuggestionButtons(productId) {
    const suggestionItem = document.querySelector(`.search-suggestion-item[data-id="${productId}"]`);
    if (!suggestionItem) return;
    
    const isFavorite = favorites.includes(productId);
    const isInCart = cart.find(item => item.id === productId);
    
    const favoriteBtn = suggestionItem.querySelector('.favorite-btn');
    const cartBtn = suggestionItem.querySelector('.btn');
    
    if (favoriteBtn) {
        favoriteBtn.className = `favorite-btn ${isFavorite ? 'active' : ''}`;
        favoriteBtn.innerHTML = `<i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>`;
    }
    
    if (cartBtn) {
        cartBtn.className = `btn btn-small ${isInCart ? 'btn-in-cart' : 'btn-primary'}`;
        cartBtn.innerHTML = `<i class="fas fa-shopping-cart"></i> ${isInCart ? 'В корзине' : 'В корзину'}`;
    }
}

// Perform search (for main search)
function performSearch(query) {
    if (window.location.pathname.includes('index.html')) {
        // On main page, filter products
        // This would be handled by the main page logic
        showNotification(`Поиск: "${query}"`);
    } else {
        // On other pages, just show notification
        showNotification(`Поиск выполнен: "${query}"`);
    }
}