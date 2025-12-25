type CartButton = HTMLButtonElement & {
    textContent: string;
    classList: DOMTokenList;
    style: CSSStyleDeclaration;
};

type FavoriteButton = HTMLButtonElement & {
    querySelector(selector: string): HTMLElement | null;
    classList: DOMTokenList;
};

type CountElement = HTMLElement & {
    closest(selector: string): HTMLElement | null;
    textContent: string | null;
};

class ShoppingApp {
    private cartCount: number = 0;

    constructor() {
        this.init();
    }

    private init(): void {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupCartButtons();
            this.setupFavoriteButtons();
            this.updateCartCount();
        });
    }

    private setupCartButtons(): void {
        const addToCartButtons: NodeListOf<CartButton> = document.querySelectorAll('.add-to-cart');
        
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.handleCartButtonClick(button);
            });
        });
    }

    private handleCartButtonClick(button: CartButton): void {
        if (button.textContent === 'В корзину') {
            button.textContent = 'В корзине';
            button.classList.add('in-cart');
            button.style.backgroundColor = '#2ecc71';
            this.cartCount++;
        } else {
            button.textContent = 'В корзину';
            button.classList.remove('in-cart');
            button.style.backgroundColor = '#3498db';
            this.cartCount = Math.max(0, this.cartCount - 1);
        }
        
        this.updateCartCount();
    }

    private setupFavoriteButtons(): void {
        const favoriteButtons: NodeListOf<FavoriteButton> = document.querySelectorAll('.favorite');
        
        favoriteButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.handleFavoriteButtonClick(button);
            });
        });
    }

    private handleFavoriteButtonClick(button: FavoriteButton): void {
        const icon: HTMLElement | null = button.querySelector('i');
        
        if (icon && icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.classList.add('active');
        } else if (icon) {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.classList.remove('active');
        }
    }

    private updateCartCount(): void {
        const countElements: NodeListOf<CountElement> = document.querySelectorAll('.count');
        
        countElements.forEach(element => {
            if (this.isCartCountElement(element)) {
                element.textContent = this.cartCount.toString();
            }
        });
    }

    private isCartCountElement(element: CountElement): boolean {
        const parentLink = element.closest('a');
        
        if (!parentLink) {
            return false;
        }
        
        const href = parentLink.getAttribute('href');
        return href === 'cart.html' || parentLink.classList.contains('icon');
    }
}

const app = new ShoppingApp();