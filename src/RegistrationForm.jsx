import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiX, HiCheckCircle } from 'react-icons/hi';

const ADDIS_DISTRICTS = ["አራዳ", "አዲስ ከተማ", "ልደታ", "ቂርቆስ", "የካ", "ቦሌ", "አቃቂ ቃሊቲ", "ንፋስ ስልክ", "ኮልፌ ቀራኒዮ", "ጉለሌ", "ለሚ ኩራ"];

const RegistrationForm = ({ isOpen, onClose, onSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', profession: '', district: '', experience: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // መረጃውን ወደ App.jsx ለመላክ
    onSubmit(formData); 
    setSubmitted(true);
    setTimeout(() => { 
      setSubmitted(false); 
      onClose(); 
    }, 2500);
  };

  return (
    <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div className="modal-card p-4 shadow-lg" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
        <button className="close-btn" onClick={onClose}><HiX /></button>
        
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <h3 className="text-white fw-bold mb-4 text-center">ባለሙያ መመዝገቢያ</h3>
            
            <div className="mb-3">
              <label className="text-white-50 small mb-1">ሙሉ ስም</label>
              <input type="text" placeholder="ለምሳሌ፡ አበበ በቀለ" required className="form-control bg-dark text-white border-secondary shadow-none" 
                onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>

            <div className="mb-3">
              <label className="text-white-50 small mb-1">ስልክ ቁጥር</label>
              <input type="tel" placeholder="09..." required className="form-control bg-dark text-white border-secondary shadow-none" 
                onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>

            <div className="mb-3">
              <label className="text-white-50 small mb-1">የሙያ አይነት</label>
              <input type="text" placeholder="ለምሳሌ፡ አናጺ" required className="form-control bg-dark text-white border-secondary shadow-none" 
                onChange={e => setFormData({...formData, profession: e.target.value})} />
            </div>

            <div className="mb-4">
              <label className="text-white-50 small mb-1">ክፍለ ከተማ</label>
              <select required className="form-select bg-dark text-white border-secondary shadow-none" 
                onChange={e => setFormData({...formData, district: e.target.value})}>
                <option value="">ክፍለ ከተማ ይምረጡ</option>
                {ADDIS_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <button type="submit" className="btn btn-warning w-100 fw-bold py-2">መረጃዬን መዝግብ</button>
          </form>
        ) : (
          <div className="text-center py-5">
            <HiCheckCircle className="text-success display-1 mb-3" />
            <h4 className="text-white">ምዝገባው ተሳክቷል!</h4>
            <p className="text-white-50">አስተዳዳሪው መረጃዎን መርምሮ ያጸድቃል።</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default RegistrationForm;