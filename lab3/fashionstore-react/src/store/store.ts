import { createStore as createZustandStore } from 'zustand';
import { Product, State } from './types';

// Начальные данные продуктов
const initialProducts: Product[] = [
  { id: 1, name: "Худи с принтом", price: 999, originalPrice: 1199, category: 'hoodies' },
  { id: 2, name: "Широкие шорты", price: 999, originalPrice: 1199, category: 'shorts' },
  { id: 3, name: "Шорты спортивные", price: 799, originalPrice: 999, category: 'shorts' },
  { id: 4, name: "Худи оверсайз", price: 1299, originalPrice: 1599, category: 'hoodies' },
  { id: 5, name: "Футболка с принтом", price: 599, originalPrice: 799, category: 't-shirts' },
  { id: 6, name: "Худи с капюшоном", price: 1399, originalPrice: 1699, category: 'hoodies' },
  { id: 7, name: "Шорты летние", price: 699, originalPrice: 899, category: 'shorts' },
  { id: 8, name: "Худи базовое", price: 899, originalPrice: 1099, category: 'hoodies' },
];

export const createAppStore = (initialState?: Partial<State>) => {
  return createZustandStore<State>((set, get) => ({
    products: initialProducts,
    cart: [],
    favorites: [],
    searchQuery: '',
    
    addToCart: (product: Product) => {
      set((state) => {
        const existingItem = state.cart.find(item => item.id === product.id);
        
        if (existingItem) {
          return {
            cart: state.cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        } else {
          return {
            cart: [...state.cart, { ...product, quantity: 1 }]
          };
        }
      });
    },
    
    removeFromCart: (productId: number) => {
      set((state) => ({
        cart: state.cart.filter(item => item.id !== productId)
      }));
    },
    
    updateQuantity: (productId: number, quantity: number) => {
      set((state) => {
        if (quantity <= 0) {
          return {
            cart: state.cart.filter(item => item.id !== productId)
          };
        }
        
        return {
          cart: state.cart.map(item =>
            item.id === productId
              ? { ...item, quantity }
              : item
          )
        };
      });
    },
    
    toggleFavorite: (productId: number) => {
      set((state) => {
        const isFavorite = state.favorites.includes(productId);
        
        return {
          favorites: isFavorite
            ? state.favorites.filter(id => id !== productId)
            : [...state.favorites, productId]
        };
      });
    },
    
    setSearchQuery: (query: string) => {
      set({ searchQuery: query });
    },
    
    searchProducts: (query: string) => {
      const { products } = get();
      if (!query.trim()) return products;
      
      const lowerQuery = query.toLowerCase();
      return products.filter(product =>
        product.name.toLowerCase().includes(lowerQuery)
      );
    },
    
    clearCart: () => {
      set({ cart: [] });
    },
    
    ...initialState,
  }));
};