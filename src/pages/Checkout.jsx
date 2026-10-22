import React, { useState } from 'react';
import pointerIcon from '../assets/pointer.png';

export default function Checkout({ basketItems = [], onNavigate, onOrderSuccess }) {
  const [formData, setFormData] = useState({
    phone: '',
    country: '',
    city: '',
    name: '',
    lastName: '',
    email: '',
    comments: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalAmount = basketItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const shippingCost = 0; 
  const finalTotal = totalAmount + shippingCost;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (onOrderSuccess) {
      onOrderSuccess();
    }
  };

  const getImageUrl = (path) => {
    if (!path) return '';
    const cleanPath = path.replace(/^\//, '');
    return `${import.meta.env.BASE_URL}${cleanPath}`;
  };

  if (isSubmitted) {
    return (
      <div className="checkout-page">
        <div className="checkout-top">
          <button 
            className="back-btn" 
            onClick={() => onNavigate('main')}
            type="button"
          >
            <img src={pointerIcon} alt="Back" className="pointer-icon" />
            BACK TO THE MAIN
          </button>
        </div>

        <div className="order-success-block">
          <h1 className="order-placement-title">THANK YOU FOR YOUR ORDER!</h1>
          <p className="order-success-text">
            Your order has been successfully placed. We will contact you soon.
          </p>
          <button 
            className="checkout-submit-btn" 
            onClick={() => onNavigate('main')}
            type="button"
            style={{ maxWidth: '300px', margin: '30px auto 0 auto' }}
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-top">
        <button 
          className="back-btn" 
          onClick={() => onNavigate('basket')}
          type="button"
        >
          <img src={pointerIcon} alt="Back" className="pointer-icon" />
          BACK TO THE BASKET
        </button>
      </div>

      <h1 className="order-placement-title">ORDER PLACEMENT</h1>

      <div className="checkout-grid">
       
        <form className="checkout-form-card" onSubmit={handleSubmit}>
          <div className="form-two-columns">
           
            <div className="form-column">
              <div className="form-group">
                <label className="form-label">Contact phone number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+7(926)111-11-11"
                  value={formData.phone}
                  onChange={handleChange}
                  className="checkout-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Delivery</label>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className="checkout-input"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="checkout-input"
                  style={{ marginTop: '12px' }}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Order comments</label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  className="checkout-textarea"
                  rows="4"
                ></textarea>
              </div>
            </div>

            {/* Правая колонка формы */}
            <div className="form-column">
              <div className="form-group">
                <label className="form-label">Customer</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="checkout-input"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="checkout-input"
                  style={{ marginTop: '12px' }}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="checkout-input"
                  style={{ marginTop: '12px' }}
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" className="checkout-submit-btn">
            Checkout
          </button>
        </form>

        <aside className="checkout-summary-panel">
      
          <div className="checkout-items-card">
            {basketItems.map((item) => (
              <div key={item.id} className="checkout-item-row">
                <img
                  src={getImageUrl(item.image)}
                  alt={item.title}
                  className="checkout-item-img"
                />
                <div className="checkout-item-title">{item.title}</div>
                <div className="checkout-item-qty-price">
                  {item.quantity || 1} x {item.price.toLocaleString('ru-RU')} ₽
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-subtotal-card">
            <div className="summary-line">
              <span>Sum by items</span>
              <span className="summary-val">{totalAmount.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="summary-line">
              <span>Shipping cost</span>
              <span className="summary-val">{shippingCost} ₽</span>
            </div>
          </div>

          <div className="checkout-total-card">
            <div className="summary-line total-line">
              <span>Total</span>
              <span className="summary-val">{finalTotal.toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}