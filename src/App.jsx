import { useState } from 'react';
import Header from './components/Header';
import Main from './pages/Main';
import Footer from './components/Footer';
import Basket from './pages/Basket';
import ProductPage from './pages/ProductPage';
import Checkout from './pages/Checkout';
import productsData from './data/products.json';

export default function App() {
  const [currentPage, setCurrentPage] = useState('main'); 

  const [basketItems, setBasketItems] = useState([
    {
      ...productsData[0],
      quantity: 1,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const totalBasketCount = basketItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const addToBasket = (product) => {
    setBasketItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
    
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 4); 
    });

    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = () => {
    setBasketItems([]);
  };

  return (
    <div className="app-container">
      
      {currentPage === 'main' && (
        <>
          <Header
            onOpenBasket={() => setCurrentPage('basket')}
            basketCount={totalBasketCount}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSelectedCategory={setSelectedCategory}
            setCurrentPage={setCurrentPage}
          />
          <Main 
            onAddToBasket={addToBasket} 
            onSelectProduct={handleOpenProduct}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <Footer />
        </>
      )}

      {currentPage === 'basket' && (
        <>
          <Basket
            onNavigate={(page) => setCurrentPage(page)}
            basketItems={basketItems}
            setBasketItems={setBasketItems}
            recentlyViewed={recentlyViewed}
            onSelectProduct={handleOpenProduct}
            onAddToBasket={addToBasket}
          />
          <Footer />
        </>
      )}

      {currentPage === 'product' && (
        <>
          <Header
            onOpenBasket={() => setCurrentPage('basket')}
            basketCount={totalBasketCount}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSelectedCategory={setSelectedCategory}
            setCurrentPage={setCurrentPage}
          />
          <ProductPage
            product={selectedProduct}
            onNavigate={(page) => setCurrentPage(page)}
            onAddToBasket={addToBasket}
          />
          <Footer />
        </>
      )}

      {currentPage === 'checkout' && (
        <>
          <Header
            onOpenBasket={() => setCurrentPage('basket')}
            basketCount={totalBasketCount}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSelectedCategory={setSelectedCategory}
            setCurrentPage={setCurrentPage}
          />
          <Checkout
            basketItems={basketItems}
            onNavigate={(page) => setCurrentPage(page)}
            onOrderSuccess={handleOrderSuccess}
          />
          <Footer />
        </>
      )}
    </div>
  );
}