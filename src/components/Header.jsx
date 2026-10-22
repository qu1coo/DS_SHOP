import { useState, useEffect, useRef } from 'react';
import searchIcon from '../assets/Search.png'; 
import basketIcon from '../assets/Basket.png';
import logoRed from '../assets/logor.png';
import logoWhite from '../assets/logow.png';

export default function Header({ 
  onOpenBasket, 
  basketCount = 0, 
  searchQuery, 
  setSearchQuery, 
  setSelectedCategory,
  setCurrentPage 
}) {
  const [activeTab, setActiveTab] = useState('main');
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const searchRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  const handleMainClick = (e) => {
    e.preventDefault();
    setActiveTab('main');
    setIsCatalogOpen(false);
    setSelectedCategory(null);
    if (setSearchQuery) setSearchQuery('');
    if (setCurrentPage) setCurrentPage('main');
  };

  const handleCatalogClick = (e) => {
    e.preventDefault();
    const nextState = !isCatalogOpen;
    setIsCatalogOpen(nextState);
    setActiveTab(nextState ? 'catalog' : 'main');
  };

  const handleCategorySelect = (e, categoryKey) => {
    e.preventDefault();
    setSelectedCategory(categoryKey);
    setIsCatalogOpen(false);
    setActiveTab('catalog');
    if (setCurrentPage) setCurrentPage('main');
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    setActiveTab('about');
    setIsCatalogOpen(false);

    const footerElement = document.getElementById('footer');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  return (
    <header className="header-wrapper" ref={searchRef}>
      <div className={`header ${isSearchOpen ? 'search-header' : ''}`}>
        
        <div className="header-logo" onClick={handleMainClick}>
          <img 
            src={isSearchOpen ? logoWhite : logoRed} 
            alt="DS Logo" 
            className="header-logo-img" 
          />
          <span className="header-logo-text">DS SHOP</span>
        </div>

        <div className="header-center">
          <nav className={`header-nav ${isSearchOpen ? 'hidden' : ''}`}>
            <a
              href="/"
              className={`nav-link ${activeTab === 'main' ? 'active' : ''}`}
              onClick={handleMainClick}
            >
              {activeTab === 'main' ? 'MAIN' : 'Main'}
            </a>

            <a
              href="/catalog"
              className={`nav-link ${activeTab === 'catalog' ? 'active' : ''}`}
              onClick={handleCatalogClick}
            >
              {activeTab === 'catalog' ? 'CATALOG' : 'Catalog'}
            </a>

            <a
              href="#footer"
              className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
              onClick={handleAboutClick}
            >
              {activeTab === 'about' ? 'ABOUT US' : 'About us'}
            </a>
          </nav>

          <div className={`search-bar-container ${isSearchOpen ? 'visible' : ''}`}>
            <input
              type="text"
              className="search-input"
              placeholder="SEARCH..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus={isSearchOpen}
            />
          </div>
        </div>

        <div className="header-icons">
          <button className="icon-btn" onClick={toggleSearch} type="button">
            <img
              src={searchIcon}
              alt="Search"
              className={`icon-search ${isSearchOpen ? 'white-icon' : ''}`}
            />
          </button>

          <button className="icon-btn header-basket-btn" onClick={onOpenBasket} type="button">
            <img
              src={basketIcon}
              alt="Basket"
              className={`icon-basket ${isSearchOpen ? 'white-icon' : ''}`}
            />
            {basketCount > 0 && (
              <span className="basket-badge">{basketCount}</span>
            )}
          </button>
        </div>
      </div>

      <div className={`catalog-dropdown ${isCatalogOpen && !isSearchOpen ? 'open' : ''}`}>
        <div className="catalog-dropdown-inner">
          <a href="#comics" className="category-item" onClick={(e) => handleCategorySelect(e, 'comics')}>COMICS</a>
          <a href="#books" className="category-item" onClick={(e) => handleCategorySelect(e, 'books')}>BOOKS</a>
          <a href="#accessories" className="category-item" onClick={(e) => handleCategorySelect(e, 'accessories')}>ACCESSORIES</a>
          <a href="#figurines" className="category-item" onClick={(e) => handleCategorySelect(e, 'figurines')}>FIGURINES</a>
          <a href="#clothes" className="category-item" onClick={(e) => handleCategorySelect(e, 'clothes')}>CLOTHES</a>
          <a href="#games" className="category-item" onClick={(e) => handleCategorySelect(e, 'games')}>GAMES</a>
        </div>
      </div>
    </header>
  );
}