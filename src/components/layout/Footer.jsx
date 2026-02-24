import React from 'react';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaFacebook, FaTelegram, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = ({ t, lang }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row g-4 mb-5">
          
          {/* 1. Brand & Description */}
          <div className="col-lg-4 col-md-6">
            <h3 className="navbar-brand mb-3">
              Bemuya<span className="text-warning">Connect</span>
            </h3>
            <p className="text-white-50 small lh-lg">
              {t.aboutText.substring(0, 150)}...
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="https://facebook.com" className="social-icon-link"><FaFacebook /></a>
              <a href="https://t.me" className="social-icon-link"><FaTelegram /></a>
              <a href="https://instagram.com" className="social-icon-link"><FaInstagram /></a>
              <a href="https://linkedin.com" className="social-icon-link"><FaLinkedin /></a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-4">{lang === 'am' ? 'ፈጣን ሊንኮች' : 'Quick Links'}</h5>
            <ul className="list-unstyled footer-links">
              <li><a href="#home">{lang === 'am' ? 'ዋና ገጽ' : 'Home'}</a></li>
              <li><a href="#artisans">{lang === 'am' ? 'ባለሙያዎች' : 'Artisans'}</a></li>
              <li><a href="#about">{lang === 'am' ? 'ስለ እኛ' : 'About'}</a></li>
              <li><a href="#contact">{lang === 'am' ? 'ያግኙን' : 'Contact'}</a></li>
            </ul>
          </div>

          {/* 3. Categories */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-4">{t.categories}</h5>
            <ul className="list-unstyled footer-links">
              <li><a href="#artisans">{t.construction}</a></li>
              <li><a href="#artisans">{t.crafts}</a></li>
              <li><a href="#artisans">{t.fashion}</a></li>
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-4">{lang === 'am' ? 'አድራሻ' : 'Contact Us'}</h5>
            <ul className="list-unstyled text-white-50 small">
              <li className="mb-3 d-flex align-items-center">
                <HiLocationMarker className="text-warning me-2 fs-5" />
                {t.address}
              </li>
              <li className="mb-3 d-flex align-items-center">
                <HiPhone className="text-warning me-2 fs-5" />
                {t.phone}
              </li>
              <li className="mb-3 d-flex align-items-center">
                <HiMail className="text-warning me-2 fs-5" />
                info@bemuyaconnect.com
              </li>
            </ul>
          </div>

        </div>

        <hr className="border-secondary mb-4" />

        {/* Bottom Bar */}
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="small text-white-50 m-0">
              © {currentYear} BemuyaConnect. {lang === 'am' ? 'መብቱ በህግ የተጠበቀ ነው።' : 'All rights reserved.'}
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <p className="small text-white-50 m-0">
              {lang === 'am' ? 'የተሰራው በ❤️ በኢትዮጵያ' : 'Made with ❤️ in Ethiopia'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;