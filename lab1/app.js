document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent === 'В корзину') {
                this.textContent = 'В корзине';
                this.classList.add('in-cart');
                this.style.backgroundColor = '#2ecc71';
            } else {
                this.textContent = 'В корзину';
                this.classList.remove('in-cart');
                this.style.backgroundColor = '#3498db'; 
            }
            
            updateCartCount();
        });
    });
    
    const favoriteButtons = document.querySelectorAll('.favorite');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.classList.add('active');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.classList.remove('active');
            }
        });
    });
    
    function updateCartCount() {
        const cartCount = document.querySelectorAll('.add-to-cart.in-cart').length;
        const countElements = document.querySelectorAll('.count');
        
        countElements.forEach(element => {
            if (element.closest('a[href="cart.html"]') || element.closest('.icon')) {
                element.textContent = cartCount;
            }
        });
    }
    
    updateCartCount();
});