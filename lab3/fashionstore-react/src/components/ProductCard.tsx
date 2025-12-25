import React, { useCallback } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Product, CartItem } from '../store/types';
import { useStore } from '../store/context';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useStore((state) => state.addToCart);
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const favorites = useStore((state) => state.favorites);
  const cart = useStore((state) => state.cart);
  
  const isFavorite = favorites.includes(product.id);
  const isInCart = cart.some((item: CartItem) => item.id === product.id);
  
  const handleAddToCart = useCallback(() => {
    addToCart(product);
  }, [addToCart, product]);
  
  const handleToggleFavorite = useCallback(() => {
    toggleFavorite(product.id);
  }, [toggleFavorite, product.id]);
  
  return (
    <div className="product-card">
      <div className="product-image">
        <div className="image-placeholder">
          {product.category === 'hoodies' && '🎽'}
          {product.category === 'shorts' && '🩳'}
          {product.category === 't-shirts' && '👕'}
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        
        <div className="product-price">
          <span className="current-price">{product.price} ₽</span>
          {product.originalPrice && (
            <span className="original-price">{product.originalPrice} ₽</span>
          )}
        </div>
        
        <div className="product-actions">
          <button
            className={`add-to-cart-btn ${isInCart ? 'in-cart' : ''}`}
            onClick={handleAddToCart}
          >
            {isInCart ? 'В корзине' : 'В корзину'}
          </button>
          
          <button
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={handleToggleFavorite}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;