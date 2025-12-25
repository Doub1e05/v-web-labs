import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { CartItem as CartItemType } from '../store/types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemoveItem }) => {
  return (
    <div className="cart-item">
      <div className="item-image">
        <div className="image-placeholder">
          {item.category === 'hoodies' && '🎽'}
          {item.category === 'shorts' && '🩳'}
          {item.category === 't-shirts' && '👕'}
        </div>
      </div>
      
      <div className="item-details">
        <h3 className="item-title">{item.name}</h3>
        <div className="item-price">{item.price} ₽</div>
        
        <div className="item-controls">
          <button
            className="quantity-btn minus"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          
          <span className="quantity">{item.quantity}</span>
          
          <button
            className="quantity-btn plus"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            disabled={item.quantity >= 10}
          >
            +
          </button>
          
          <button
            className="remove-btn"
            onClick={() => onRemoveItem(item.id)}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;