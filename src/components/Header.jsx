import { useState } from 'react';
import searchIcon from '../assets/Search.png'; 
import basketIcon from '../assets/Basket.png';

export default function Header({ onOpenBasket, basketCount = 0 }) {
  const [activeTab, setActiveTab] = useState('main');
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMainClick = (e) => {
    e.preventDefault();
    setActiveTab('main');
    setIsCatalogOpen(false);
  };

  const handleCatalogClick = (e) => {
    e.preventDefault();
    const nextState = !isCatalogOpen;
    setIsCatalogOpen(nextState);
    setActiveTab(nextState ? 'catalog' : 'main');
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
    <header className="header-wrapper">
      <div className={`header ${isSearchOpen ? 'search-header' : ''}`}>
        <div className="header-logo">DS SHOP</div>

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
              className={`nav-link ${activeTab === 'catalog' && isCatalogOpen ? 'active' : ''}`}
              onClick={handleCatalogClick}
            >
              {activeTab === 'catalog' && isCatalogOpen ? 'CATALOG' : 'Catalog'}
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
              placeholder="SEARCH"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
          <a href="#comics" className="category-item">COMICS</a>
          <a href="#books" className="category-item">BOOKS</a>
          <a href="#accessories" className="category-item">ACCESSORIES</a>
          <a href="#figurines" className="category-item">FIGURINES</a>
          <a href="#clothes" className="category-item">CLOTHES</a>
          <a href="#games" className="category-item">GAMES</a>
        </div>
      </div>
    </header>
  );
}