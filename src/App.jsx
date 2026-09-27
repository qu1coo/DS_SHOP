import { useState } from 'react';
import Header from './components/Header';
import Main from './pages/Main';
import Footer from './components/Footer';
import Basket from './pages/Basket';
import productsData from './data/products.json';

export default function App() {
  const [currentPage, setCurrentPage] = useState('main');

  const [basketItems, setBasketItems] = useState([
    {
      ...productsData[0],
      quantity: 1,
    },
  ]);

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

  return (
    <div className="app-container">
      {currentPage === 'main' ? (
        <>
          <Header
            onOpenBasket={() => setCurrentPage('basket')}
            basketCount={totalBasketCount}
          />
          <Main onAddToBasket={addToBasket} />
          <Footer />
        </>
      ) : (
        <>
          <Basket
            onNavigate={(page) => setCurrentPage(page)}
            basketItems={basketItems}
            setBasketItems={setBasketItems}
          />
          <Footer />
        </>
      )}
    </div>
  );
}