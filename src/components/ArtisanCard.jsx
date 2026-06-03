import React from 'react';
import { motion } from 'framer-motion';

const ArtisanCard = ({ artisan }) => {
  return (
    <motion.div 
      className="artisan-card p-3 h-100" // h-100 በ Bento Grid ውስጥ እኩል ቁመት እንዲኖረው ያደርጋል
      whileHover={{ 
        y: -6, 
        scale: 1.02,
        boxShadow: "0px 20px 35px rgba(0,0,0,0.3)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* 1. የባለሙያው ፎቶ ወይም አምባሳደር አይኮን */}
      <div className="d-flex align-items-center gap-3 mb-3">
        <div className="rounded-circle bg-warning bg-opacity-10 p-3 text-warning fw-bold">
          {artisan.name.charAt(0)} {/* የስሙ መጀመሪያ ፊደል */}
        </div>
        <div>
          <h5 className="text-white fw-bold m-0">{artisan.name}</h5>
          <span className="badge bg-warning text-dark fw-bold mt-1">{artisan.profession}</span>
        </div>
      </div>

      {/* 2. ዝርዝር መረጃ (ክፍለ ከተማ እና ልምድ) */}
      <div className="text-white-50 small mb-3">
        <p className="m-0">📍 <strong>ክፍለ ከተማ:</strong> {artisan.district}</p>
        <p className="m-0">💼 <strong>የስራ ልምድ:</strong> {artisan.experience} ዓመት</p>
      </div>

      {/* 3. ስልክ ቁጥር / መገናኛ ቁልፍ */}
      <a href={`tel:${artisan.phone}`} className="btn btn-outline-warning w-100 rounded-pill btn-sm fw-bold">
        📞 ደውል ({artisan.phone})
      </a>
    </motion.div>
  );
};

export default ArtisanCard; // ሌላ ቦታ ላይ import ለማድረግ መረሳት የለበትም