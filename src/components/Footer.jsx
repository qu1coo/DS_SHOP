import React from 'react';
import tgIcon from '../assets/tg.png'
import vkIcon from '../assets/vk.png'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <h4>Support</h4>
          <a href="#">Payment</a>
          <a href="#">Delivery</a>
          <a href="#">FAQ</a>
        </div>

        <div className="footer-col">
          <h4>Info</h4>
          <a href="#">Questions</a>
          <a href="#">Work in DS</a>
          <a href="#">Public offer</a>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <a href="#">Basket</a>
          <a href="#">Catalog</a>
          <a href="#">Main</a>
        </div>

        <div className="footer-col">
          <h4>About Us</h4>
          <a href="#">Our Story</a>
          <a href="#">Contacts</a>
          <a href="#">Blog</a>
        </div>

        <div className="footer-col footer-contacts">
          <p className="opening-hours">Opening hours: Mon–Fri from 10:00 to 19:00</p>
          <a href="mailto:support@ds.shop" className="footer-email">support@ds.shop</a>
          
          <div className="social-links">

            <a href="#" className="social-btn" aria-label="VK">
              <img src={vkIcon} alt="Vk" className="foother-btn-img" />
            </a>

            <a href="#" className="social-btn" aria-label="Telegram">
              <img src={tgIcon} alt="Tg" className="foother-btn-img" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-logo">DS SHOP</div>
        <div className="footer-copyright">
          Legal & Socials: Privacy Policy, Terms of Service, © 2026 DS Shop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}