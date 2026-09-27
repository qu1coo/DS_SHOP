import React from 'react';
import basketIcon from '../assets/Basket.png';

export default function ProductCard({ product, onAddToBasket, title, price, image }) {
  
  const itemTitle = product ? product.title : title;
  const itemPrice = product ? product.price : price;
  const itemImage = product ? product.image : image;

  const formattedPrice = typeof itemPrice === 'number' 
    ? itemPrice.toLocaleString('ru-RU') 
    : itemPrice;

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={itemImage} alt={itemTitle} className="product-image" />
      </div>
      
      <h3 className="product-title">{itemTitle}</h3>
      
      <div className="product-footer">
        <span className="product-price">{formattedPrice} ₽</span>
        
        <button 
          className="add-to-basket-btn" 
          title="Add to basket"
          onClick={onAddToBasket}
          type="button"
        >
          <img src={basketIcon} alt="Basket" className="header-btn-img" />
        </button>
      </div>
    </div>
  );
}