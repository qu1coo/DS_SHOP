import React from 'react';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

export default function Main({ onAddToBasket }) {
  return (
    <div className="main-page">
      <main className="main-content">
        <div className="products-grid">
          
          {[...productsData, ...productsData].map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`}
              product={product}
              onAddToBasket={() => onAddToBasket(product)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}