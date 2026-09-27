import React from 'react';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import pointerIcon from '../assets/pointer.png';
import trashIcon from '../assets/trash.png'; 
import arrowIcon from '../assets/arrow.png';

export default function Basket({ onNavigate, basketItems = [], setBasketItems }) {
  const recentlyViewed = productsData.slice(0, 1);

  const totalAmount = basketItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleQuantityChange = (id, delta) => {
    if (!setBasketItems) return;
    setBasketItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = (item.quantity || 1) + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (id) => {
    if (!setBasketItems) return;
    setBasketItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="basket-page">
      <header className="basket-header">
        <button
          className="back-btn"
          onClick={() => onNavigate('main')}
          type="button"
        >
          <img src={pointerIcon} alt="Back" className="pointer-icon" />
          BACK TO THE MAIN
        </button>
        <div className="header-logo">DS SHOP</div>
        <div className="basket-header-spacer"></div>
      </header>

      <main className="basket-main">
        <h1 className="basket-title">BASKET</h1>

        {basketItems.length === 0 ? (
          /* Пустая корзина */
          <div className="empty-basket-block">
            <h2 className="empty-basket-message">YOUR SHOPPING BASKET IS EMPTY</h2>
            <button
              className="continue-shopping-link"
              onClick={() => onNavigate('main')}
              type="button"
            >
              CLICK HERE TO CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          /* Заполненная корзина */
          <div className="basket-content-grid">
            <div className="basket-items-list">
              {basketItems.map((item) => (
                <div key={item.id} className="basket-item-card">
                  <img 
  src={`${import.meta.env.BASE_URL}${item.image ? item.image.replace(/^\//, '') : ''}`} 
  alt={item.title} 
  className="basket-item-img" 
/>
                  <span className="basket-item-title">{item.title}</span>

                  <div className="basket-quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.id, -1)} 
                      type="button"
                    >
                      -
                    </button>
                    <span>{item.quantity || 1}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, 1)} 
                      type="button"
                    >
                      +
                    </button>
                  </div>

                  <span className="basket-item-price">
                    {(item.price * (item.quantity || 1)).toLocaleString('ru-RU')} ₽
                  </span>

                  <button
                    className="delete-item-btn"
                    onClick={() => handleRemoveItem(item.id)}
                    type="button"
                    title="Delete item"
                  >
                    <img src={trashIcon} alt="Delete" />
                  </button>
                </div>
              ))}
            </div>

            <aside className="basket-summary">
              <div className="summary-row">
                <span className="summary-label">Total</span>
                <span className="summary-value">
                  {totalAmount.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <div className="promo-input-group">
                <input
                  type="text"
                  placeholder="Do you have a promo code or a certificate?"
                />
                <img src={arrowIcon} alt="Apply" className="promo-arrow-img" />
              </div>
              <button className="checkout-btn" type="button">
                Checkout
              </button>
            </aside>
          </div>
        )}

        <section className="recently-viewed-section">
          <h2 className="recently-viewed-title">RECENTLY VIEWED</h2>
          <div className="recently-viewed-grid">
            {recentlyViewed.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}