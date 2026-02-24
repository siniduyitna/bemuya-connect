import React, { useState, useEffect } from 'react';
import { HiChevronUp } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // ገጹ ከ 300px በላይ ወደ ታች ሲወርድ በተኗ እንዲታይ ማድረግ
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // በዝግታ እንዲወጣ ያደርገዋል
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="scroll-to-top"
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 1000,
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#ffc107', // የፕሮጀክቱ ዋርኒንግ ቢጫ ቀለም
            color: '#000',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(255, 193, 7, 0.4)'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <HiChevronUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;