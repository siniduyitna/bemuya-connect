import React, { useState, useEffect } from 'react';
import { HiMenuAlt3, HiX, HiGlobeAlt } from 'react-icons/hi';
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

  // የናቭባር ሊንኮች
  const navLinks = [
    { name: lang === 'am' ? 'ዋና ገጽ' : 'Home', href: '#' },
    { name: lang === 'am' ? 'ባለሙያዎች' : 'Artisans', href: '#artisans' },
    { name: lang === 'am' ? 'ስለ እኛ' : 'About', href: '#about' },
    { name: lang === 'am' ? 'ያግኙን' : 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`glass-nav ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-wrapper-full container d-flex justify-content-between align-items-center">
        
        {/* 1. Logo */}
        <div className="navbar-brand text-white" onClick={onOpenAdmin} style={{ cursor: 'pointer' }}>
          Bemuya<span className="text-warning">Connect</span>
        </div>

        {/* 2. Desktop Links (Large screens only) */}
        <div className="nav-links d-none d-lg-flex align-items-center gap-4">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-item-link">
              {link.name}
            </a>
          ))}
        </div>

        {/* 3. Actions (Lang switcher & Buttons) */}
        <div className="nav-actions d-flex align-items-center gap-3">
          <div className="lang-switcher-v2 d-flex align-items-center">
            <HiGlobeAlt className="text-warning me-1" />
            <button 
              className={`lang-btn ${lang === 'am' ? 'active' : ''}`} 
              onClick={() => setLang('am')}
            >አማ</button>
            <span className="text-white-50 mx-1">|</span>
            <button 
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`} 
              onClick={() => setLang('en')}
            >EN</button>
          </div>

          <button 
            className="btn btn-warning rounded-pill px-4 fw-bold d-none d-md-block shadow-sm"
            onClick={onOpenReg}
          >
            {t.join}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-toggle d-lg-none text-white border-0 bg-transparent fs-2" 
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <HiMenuAlt3 />
          </button>
        </div>
      </div>

      {/* 4. Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Background Blur Overlay */}
            <motion.div 
              className="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Right Side Drawer */}
            <motion.div 
              className="mobile-sidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="sidebar-header d-flex justify-content-between align-items-center p-4">
                <span className="fw-bold text-white">Menu</span>
                <button className="close-btn-v2" onClick={() => setIsMobileMenuOpen(false)}>
                  <HiX className="fs-2 text-white" />
                </button>
              </div>
              
              <div className="sidebar-links-container p-4 d-flex flex-column gap-4">
                {navLinks.map((link, idx) => (
                  <motion.a 
                    key={link.name} 
                    href={link.href} 
                    className="mobile-nav-link-v2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
                
                <hr className="border-secondary my-2" />

                <button 
                  className="btn btn-warning rounded-pill py-3 fw-bold shadow mt-2" 
                  onClick={() => { onOpenReg(); setIsMobileMenuOpen(false); }}
                >
                  {t.join}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;