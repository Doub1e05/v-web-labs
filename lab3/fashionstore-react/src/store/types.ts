export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'hoodies' | 'shorts' | 't-shirts';
  image?: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type State = {
  products: Product[];
  cart: CartItem[];
  favorites: number[];
  searchQuery: string;
  
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  toggleFavorite: (productId: number) => void;
  setSearchQuery: (query: string) => void;
  searchProducts: (query: string) => Product[];
  clearCart: () => void;
};

// Удаляем StoreApi из этого файла, так как он теперь определяется в context.tsx