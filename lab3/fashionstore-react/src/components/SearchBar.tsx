import React, { useState, useCallback, useMemo } from 'react';
import { useStore } from '../store/context';
import { Product } from '../store/types';

const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchQuery = useStore((state) => state.searchQuery);
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const searchProducts = useStore((state) => state.searchProducts);
  const addToCart = useStore((state) => state.addToCart);
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const favorites = useStore((state) => state.favorites);
  
  const suggestions = useMemo(() => {
    return searchProducts(searchQuery).slice(0, 5);
  }, [searchQuery, searchProducts]);
  
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsOpen(value.length > 0);
  }, [setSearchQuery]);
  
  const handleAddToCart = useCallback((product: Product) => {
    addToCart(product);
  }, [addToCart]);
  
  const handleToggleFavorite = useCallback((productId: number) => {
    toggleFavorite(productId);
  }, [toggleFavorite]);
  
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Поиск товаров..."
        value={searchQuery}
        onChange={handleSearchChange}
        onFocus={() => setIsOpen(true)}
        className="search-input"
      />
      
      {isOpen && suggestions.length > 0 && (
        <div className="search-suggestions">
          {suggestions.map((product: Product) => {
            const isFavorite = favorites.includes(product.id);
            
            return (
              <div key={product.id} className="suggestion-item">
                <div className="suggestion-info">
                  <h4>{product.name}</h4>
                  <div className="suggestion-price">{product.price} ₽</div>
                </div>
                <div className="suggestion-actions">
                  <button
                    className={`like-btn ${isFavorite ? 'active' : ''}`}
                    onClick={() => handleToggleFavorite(product.id)}
                  >
                    {isFavorite ? '❤️' : '🤍'}
                  </button>
                  <button
                    className="cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    В корзину
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {isOpen && searchQuery && suggestions.length === 0 && (
        <div className="search-suggestions">
          <div className="no-results">Ничего не найдено</div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;