import React from 'react';
import { FaTshirt, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useStore } from '../store/context';
import { CartItem } from '../store/types';

const Header: React.FC = () => {
  const cart = useStore((state) => state.cart);
  const favorites = useStore((state) => state.favorites);
  
  const cartCount = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
  const favoriteCount = favorites.length;

  return (
    <header className="header">
      <div className="logo">
        <FaTshirt className="logo-icon" />
        <Link to="/" className="logo-text">FashionStore</Link>
      </div>
      
      <div className="search-container">
        <SearchBar />
      </div>
      
      <div className="header-icons">
        <Link to="/" className="icon-link">
          <FaHeart className="icon" />
          {favoriteCount > 0 && <span className="count">{favoriteCount}</span>}
        </Link>
        
        <Link to="/cart" className="icon-link">
          <FaShoppingCart className="icon" />
          {cartCount > 0 && <span className="count">{cartCount}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;