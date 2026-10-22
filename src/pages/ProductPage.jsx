import React, { useState } from 'react';
import pointerIcon from '../assets/pointer.png';
import starIcon from '../assets/star.png';

export default function ProductPage({ product, onNavigate, onAddToBasket }) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('rating'); 
  const [questionText, setQuestionText] = useState('');
  const [questionSubmitted, setQuestionSubmitted] = useState(false);

  if (!product) {
    return (
      <div className="product-page-empty">
        <h2>Product not found</h2>
        <button onClick={() => onNavigate('main')} className="back-btn">
          BACK TO THE MAIN
        </button>
      </div>
    );
  }

  const getImageUrl = (path) => {
    if (!path) return '';
    const cleanPath = path.replace(/^\//, '');
    return `${import.meta.env.BASE_URL}${cleanPath}`;
  };

  const formattedPrice = typeof product.price === 'number' 
    ? product.price.toLocaleString('ru-RU') 
    : product.price;

  const reviews = [
    {
      id: 1,
      author: 'Peter',
      date: 'May 29th',
      rating: 5,
      text: 'Cool book! I hope the gifted one, a fan of Dark Souls, will be very happy with her :)'
    },
    {
      id: 2,
      author: 'Alina',
      date: 'May 15th',
      rating: 5,
      text: "I couldn't help but leave a review. One of my favorite games and lore source!"
    },
    {
      id: 3,
      author: 'Alex',
      date: 'May 1st',
      rating: 4,
      text: 'A gorgeous quality edition.'
    }
  ];

  const questionsList = [
    {
      id: 1,
      author: 'Elden Fan',
      date: 'June 2nd',
      question: 'Is this edition translated into English?',
      answer: 'Yes, full English hardbound translation.'
    }
  ];

  const renderStars = (count) => {
    return [...Array(count)].map((_, i) => (
      <img key={i} src={starIcon} alt="star" className="custom-star-icon" />
    ));
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    setQuestionSubmitted(true);
    setQuestionText('');
    setTimeout(() => setQuestionSubmitted(false), 4000);
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-top">
        <button 
          className="back-btn" 
          onClick={() => onNavigate('main')}
          type="button"
        >
          <img src={pointerIcon} alt="Back" className="pointer-icon" />
          BACK TO THE MAIN
        </button>
      </div>

      <div className="product-detail-main">
        <div className="product-detail-image-box">
          <img 
            src={getImageUrl(product.image)} 
            alt={product.title} 
            className="product-detail-img" 
          />
        </div>

        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.title}</h1>

          <div className="product-detail-rating-summary">
            <span className="rating-score">5</span>
            <div className="stars-container">{renderStars(5)}</div>
            <span className="rating-count">7 ratings</span>
          </div>

          <button 
            className="buy-btn" 
            onClick={() => onAddToBasket(product)}
            type="button"
          >
            Buy ({formattedPrice} ₽)
          </button>

          <div className="product-detail-description">
            {product.specs && <p className="specs-text">{product.specs}</p>}
            
            <h4 className="desc-heading">Description</h4>
            
            <div className={`desc-content ${isDescriptionExpanded ? 'expanded' : ''}`}>
              <p>{product.description || "No description available for this item."}</p>
            </div>
            
            <button 
              className="show-in-full-btn"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              type="button"
            >
              {isDescriptionExpanded ? 'Hide' : 'Show in full'}
            </button>
          </div>
        </div>
      </div>

      <div className="product-reviews-section">
        <div className="reviews-tabs">
          <h2 
            className={`reviews-tab ${activeTab === 'rating' ? 'active' : ''}`}
            onClick={() => setActiveTab('rating')}
          >
            RATING
          </h2>
          <h2 
            className={`reviews-tab ${activeTab === 'questions' ? 'active' : ''}`}
            onClick={() => setActiveTab('questions')}
          >
            QUESTIONS
          </h2>
        </div>

        {activeTab === 'rating' && (
          <>
            <div className="rating-sub-summary">
              <span className="big-rating">5</span>
              <div className="stars-row">{renderStars(5)}</div>
              <span className="rating-count">7 ratings</span>
            </div>

            <div className="reviews-cards-wrapper">
              <div className="reviews-cards-grid">
                {reviews.map((rev) => (
                  <div key={rev.id} className="review-card">
                    <div className="review-header">
                      <span className="review-author">{rev.author}</span>
                      <span className="review-date">{rev.date}</span>
                      <div className="review-stars">
                        {renderStars(rev.rating)}
                      </div>
                    </div>
                    <p className="review-text">{rev.text}</p>
                  </div>
                ))}
              </div>
              <button className="reviews-next-btn" type="button" aria-label="Next reviews">
                &rarr;
              </button>
            </div>
          </>
        )}

        {activeTab === 'questions' && (
          <div className="questions-tab-content">
            <div className="questions-list">
              {questionsList.map((q) => (
                <div key={q.id} className="review-card question-card">
                  <div className="review-header">
                    <span className="review-author">{q.author}</span>
                    <span className="review-date">{q.date}</span>
                  </div>
                  <p className="question-body"><strong>Q:</strong> {q.question}</p>
                  <p className="answer-body"><strong>A:</strong> {q.answer}</p>
                </div>
              ))}
            </div>

            <form className="ask-question-card" onSubmit={handleQuestionSubmit}>
              <h3 className="ask-title">Ask a question about this product</h3>
              
              <div className="ask-input-row">
                <textarea
                  className="ask-textarea"
                  placeholder="Write your question here..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  rows="2"
                  required
                />
                <button type="submit" className="ask-submit-btn">
                  Send
                </button>
              </div>

              {questionSubmitted && (
                <p className="question-success-msg">Your question has been sent!</p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}