// Favorites state and functions
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// DOM elements
const favoriteCountElements = document.querySelectorAll('.favorite-count');

// Initialize favorites
function initFavorites() {
    updateFavoriteCount();
}

// Toggle favorite
function toggleFavorite(productId) {
    const index = favorites.indexOf(productId);
    
    if (index === -1) {
        // Add to favorites
        favorites.push(productId);
        showNotification('Товар добавлен в избранное');
    } else {
        // Remove from favorites
        favorites.splice(index, 1);
        showNotification('Товар удален из избранного');
    }
    
    // Update localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Update UI
    updateFavoriteCount();
    updateFavoriteButtons();
    
    return index === -1; // Return true if added, false if removed
}

// Update favorite count
function updateFavoriteCount() {
    const count = favorites.length;
    favoriteCountElements.forEach(element => {
        element.textContent = count;
    });
}

// Update favorite buttons
function updateFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        const productId = parseInt(button.dataset.id);
        if (favorites.includes(productId)) {
            button.classList.remove('far');
            button.classList.add('fas', 'active');
        } else {
            button.classList.remove('fas', 'active');
            button.classList.add('far');
        }
    });
}

// Check if product is in favorites
function isFavorite(productId) {
    return favorites.includes(productId);
}

// Get favorite products
function getFavoriteProducts() {
    return favorites.map(id => getProductById(id)).filter(Boolean);
}