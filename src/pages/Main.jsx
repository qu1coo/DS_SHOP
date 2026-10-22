import React from 'react';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

export default function Main({ 
  onAddToBasket, 
  onSelectProduct,
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory 
}) {
  const filteredProducts = productsData.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category?.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    return matchesSearch && matchesCategory;
  });

  const handleResetFilters = () => {
    if (setSelectedCategory) setSelectedCategory(null);
    if (setSearchQuery) setSearchQuery('');
  };

  const hasResults = filteredProducts.length > 0;

  return (
    <div className="main-page">
      <main className="main-content">
        
        {selectedCategory && hasResults && (
          <div className="category-active-bar">
            <h2 className="category-active-title">
              CATEGORY: {selectedCategory.toUpperCase()}
            </h2>
            <button 
              className="show-all-btn"
              onClick={handleResetFilters} 
              type="button"
            >
              SHOW ALL PRODUCTS
            </button>
          </div>
        )}

        <div className="products-grid">
          {hasResults ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToBasket={() => onAddToBasket(product)}
                onSelect={() => onSelectProduct && onSelectProduct(product)}
              />
            ))
          ) : (
            <div className="no-products-container">
              <p className="no-products-text">
                NO PRODUCTS FOUND...
              </p>
              <button 
                className="show-all-btn clear-search-btn"
                onClick={handleResetFilters}
                type="button"
              >
                SHOW ALL PRODUCTS
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}