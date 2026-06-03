import React, { useState, useEffect } from 'react';
import { HiMenuAlt3, HiX, HiGlobeAlt, HiLockClosed } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ lang, setLang, t, onOpenReg, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: lang === 'am' ? 'ዋና ገጽ' : 'Home', href: '#' },
    { name: lang === 'am' ? 'ባለሙያዎች' : 'Artisans', href: '#artisans' },
    { name: lang === 'am' ? 'ስለ እኛ' : 'About', href: '#about' },
    { name: lang === 'am' ? 'ያግኙን' : 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`glass-nav ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-wrapper-full container d-flex justify-content-between align-items-center">
        
        <div className="navbar-brand text-white" style={{ cursor: 'pointer' }}>
          Bemuya<span className="text-warning">Connect</span>
        </div>

        <div className="nav-links d-none d-lg-flex align-items-center gap-4">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-item-link">
              {link.name}
            </a>
          ))}
        </div>

        <div className="nav-actions d-flex align-items-center gap-3">
          {/* Admin Login Button */}
          <button 
            className="btn btn-outline-warning btn-sm rounded-pill px-3 d-none d-md-block" 
            onClick={onOpenAdmin}
          >
            <HiLockClosed className="me-1" /> Admin
          </button>

          <div className="lang-switcher-v2 d-flex align-items-center">
            <HiGlobeAlt className="text-warning me-1" />
            <button className={`lang-btn ${lang === 'am' ? 'active' : ''}`} onClick={() => setLang('am')}>አማ</button>
            <span className="text-white-50 mx-1">|</span>
            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
          </div>

          <button className="btn btn-warning rounded-pill px-4 fw-bold d-none d-md-block shadow-sm" onClick={onOpenReg}>
            {t.join}
          </button>

          <button className="mobile-toggle d-lg-none text-white border-0 bg-transparent fs-2" onClick={() => setIsMobileMenuOpen(true)}>
            <HiMenuAlt3 />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div className="sidebar-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div className="mobile-sidebar" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}>
              <div className="sidebar-header d-flex justify-content-between align-items-center p-4">
                <span className="fw-bold text-white">Menu</span>
                <button className="close-btn-v2" onClick={() => setIsMobileMenuOpen(false)}><HiX className="fs-2 text-white" /></button>
              </div>
              <div className="sidebar-links-container p-4 d-flex flex-column gap-4">
                {navLinks.map((link, idx) => (
                  <motion.a key={link.name} href={link.href} className="mobile-nav-link-v2" onClick={() => setIsMobileMenuOpen(false)}>{link.name}</motion.a>
                ))}
                <hr className="border-secondary" />
                <button className="btn btn-outline-warning rounded-pill py-2" onClick={() => { onOpenAdmin(); setIsMobileMenuOpen(false); }}>Admin Login</button>
                <button className="btn btn-warning rounded-pill py-2 fw-bold" onClick={() => { onOpenReg(); setIsMobileMenuOpen(false); }}>{t.join}</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;