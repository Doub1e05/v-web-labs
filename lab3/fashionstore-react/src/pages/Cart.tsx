import React, { useCallback, useMemo } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useStore } from '../store/context';
import CartItem from '../components/CartItem';
import { CartItem as CartItemType } from '../store/types';

const Cart: React.FC = () => {
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);
  
  const subtotal = useMemo(() => {
    return cart.reduce((sum: number, item: CartItemType) => sum + (item.price * item.quantity), 0);
  }, [cart]);
  
  const totalItems = useMemo(() => {
    return cart.reduce((sum: number, item: CartItemType) => sum + item.quantity, 0);
  }, [cart]);
  
  const discount = useMemo(() => {
    return Math.min(500, subtotal * 0.2);
  }, [subtotal]);
  
  const total = useMemo(() => {
    return subtotal - discount;
  }, [subtotal, discount]);
  
  const handleQuantityChange = useCallback((productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  }, [updateQuantity]);
  
  const handleRemoveItem = useCallback((productId: number) => {
    removeFromCart(productId);
  }, [removeFromCart]);
  
  const handleCheckout = useCallback(() => {
    if (cart.length > 0) {
      alert(`Заказ оформлен! Сумма: ${total} ₽`);
      clearCart();
    }
  }, [cart.length, total, clearCart]);
  
  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <FaShoppingCart className="empty-cart-icon" />
        <h2>Ваша корзина пуста</h2>
        <p>Добавьте товары из каталога</p>
      </div>
    );
  }
  
  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1><FaShoppingCart /> Корзина</h1>
        <div className="cart-actions">
          <button className="clear-btn" onClick={clearCart}>
            Очистить корзину
          </button>
        </div>
      </div>
      
      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item: CartItemType) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
            />
          ))}
        </div>
        
        <div className="cart-summary">
          <h3>Итого</h3>
          
          <div className="summary-details">
            <div className="summary-row">
              <span>Товары ({totalItems})</span>
              <span>{subtotal} ₽</span>
            </div>
            
            <div className="summary-row">
              <span>Скидка</span>
              <span className="discount">-{discount} ₽</span>
            </div>
            
            <div className="summary-row total">
              <span>К оплате</span>
              <span>{total} ₽</span>
            </div>
          </div>
          
          <button className="checkout-btn" onClick={handleCheckout}>
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;