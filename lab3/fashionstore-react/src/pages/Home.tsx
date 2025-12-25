import React, { useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import { useStore } from '../store/context';
import { Product } from '../store/types';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const searchQuery = useStore((state) => state.searchQuery);
  const searchProducts = useStore((state) => state.searchProducts);
  const products = useStore((state) => state.products);
  
  const filteredProducts = React.useMemo(() => {
    let result = searchQuery ? searchProducts(searchQuery) : products;
    
    if (selectedCategory !== 'all') {
      result = result.filter((product: Product) => product.category === selectedCategory);
    }
    
    return result;
  }, [products, searchQuery, searchProducts, selectedCategory]);
  
  const categories = [
    { id: 'all', name: 'Все товары', count: products.length },
    { id: 'hoodies', name: 'Худи', count: products.filter((p: Product) => p.category === 'hoodies').length },
    { id: 'shorts', name: 'Шорты', count: products.filter((p: Product) => p.category === 'shorts').length },
    { id: 't-shirts', name: 'Футболки', count: products.filter((p: Product) => p.category === 't-shirts').length },
  ];
  
  return (
    <div className="home-page">
      <div className="container">
        <aside className="sidebar">
          <h3>Категории</h3>
          <ul className="categories">
            {categories.map(category => (
              <li
                key={category.id}
                className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span>{category.name}</span>
                <span className="category-count">{category.count}</span>
              </li>
            ))}
          </ul>
        </aside>
        
        <main className="content">
          <div className="section-header">
            <h2>Все товары</h2>
            <span className="products-count">{filteredProducts.length} товаров</span>
          </div>
          
          <ProductGrid products={filteredProducts} />
          
          {filteredProducts.length === 0 && (
            <div className="no-results">
              <p>Товары не найдены. Попробуйте изменить параметры поиска.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;