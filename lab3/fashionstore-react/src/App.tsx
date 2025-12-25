import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './store/context';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import './styles/globals.css';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <footer className="footer">
            <div className="footer-content">
              <div className="footer-section">
                <h4>О компании</h4>
                <p>FashionStore - интернет-магазин модной одежды с доставкой по всей России.</p>
              </div>
              <div className="footer-section">
                <h4>Покупателям</h4>
                <ul className="footer-links">
                  <li><a href="#">Доставка и оплата</a></li>
                  <li><a href="#">Возврат и обмен</a></li>
                  <li><a href="#">Политика конфиденциальности</a></li>
                  <li><a href="#">Условия использования</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Контакты</h4>
                <ul className="footer-links">
                  <li><a href="tel:+78001234567">8 (800) 123-45-67</a></li>
                  <li><a href="mailto:info@fashionstore.ru">info@fashionstore.ru</a></li>
                </ul>
              </div>
            </div>
            <div className="copyright">
              <p>© 2025 FashionStore. Все права защищены.</p>
              <p>Политика и безопасность | Cookie</p>
            </div>
          </footer>
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;