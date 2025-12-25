var ShoppingApp = /** @class */ (function () {
    function ShoppingApp() {
        this.cartCount = 0;
        this.init();
    }
    ShoppingApp.prototype.init = function () {
        var _this = this;
        document.addEventListener('DOMContentLoaded', function () {
            _this.setupCartButtons();
            _this.setupFavoriteButtons();
            _this.updateCartCount();
        });
    };
    ShoppingApp.prototype.setupCartButtons = function () {
        var _this = this;
        var addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                _this.handleCartButtonClick(button);
            });
        });
    };
    ShoppingApp.prototype.handleCartButtonClick = function (button) {
        if (button.textContent === 'В корзину') {
            button.textContent = 'В корзине';
            button.classList.add('in-cart');
            button.style.backgroundColor = '#2ecc71';
            this.cartCount++;
        }
        else {
            button.textContent = 'В корзину';
            button.classList.remove('in-cart');
            button.style.backgroundColor = '#3498db';
            this.cartCount = Math.max(0, this.cartCount - 1);
        }
        this.updateCartCount();
    };
    ShoppingApp.prototype.setupFavoriteButtons = function () {
        var _this = this;
        var favoriteButtons = document.querySelectorAll('.favorite');
        favoriteButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                _this.handleFavoriteButtonClick(button);
            });
        });
    };
    ShoppingApp.prototype.handleFavoriteButtonClick = function (button) {
        var icon = button.querySelector('i');
        if (icon && icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.classList.add('active');
        }
        else if (icon) {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.classList.remove('active');
        }
    };
    ShoppingApp.prototype.updateCartCount = function () {
        var _this = this;
        var countElements = document.querySelectorAll('.count');
        countElements.forEach(function (element) {
            if (_this.isCartCountElement(element)) {
                element.textContent = _this.cartCount.toString();
            }
        });
    };
    ShoppingApp.prototype.isCartCountElement = function (element) {
        var parentLink = element.closest('a');
        if (!parentLink) {
            return false;
        }
        var href = parentLink.getAttribute('href');
        return href === 'cart.html' || parentLink.classList.contains('icon');
    };
    return ShoppingApp;
}());
var app = new ShoppingApp();
