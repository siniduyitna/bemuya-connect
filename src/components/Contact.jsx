import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Contact = ({ t, lang }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: serverTimestamp()
      });
      alert(t.successMsg);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="contact-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-warning">{t.contactTitle}</h2>
          <p className="text-white-50">{t.contactDesc}</p>
        </div>

        <div className="row g-5">
          {/* Contact Info */}
          <div className="col-lg-5">
            <div className="contact-info-card p-4 rounded-4 bg-dark border border-secondary h-100">
              <h4 className="text-white mb-4">{t.officeTitle}</h4>
              <div className="d-flex align-items-center mb-3 text-white-50">
                <HiLocationMarker className="text-warning fs-4 me-3" />
                <span>{t.address}</span>
              </div>
              <div className="d-flex align-items-center mb-3 text-white-50">
                <HiPhone className="text-warning fs-4 me-3" />
                <span>{t.phone}</span>
              </div>
              <div className="d-flex align-items-center mb-4 text-white-50">
                <HiMail className="text-warning fs-4 me-3" />
                <span>info@bemuyaconnect.com</span>
              </div>
              {/* Google Maps Placeholder */}
              <div className="map-placeholder rounded-3 bg-secondary" style={{height: '200px', opacity: 0.2}}></div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <form onSubmit={handleSubmit} className="contact-form p-4 rounded-4 border border-secondary">
              <div className="mb-3">
                <label className="text-white-50 small mb-2">{t.nameLabel}</label>
                <input 
                  type="text" required className="form-control bg-transparent text-white border-secondary"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="text-white-50 small mb-2">{t.emailLabel}</label>
                <input 
                  type="email" required className="form-control bg-transparent text-white border-secondary"
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="mb-4">
                <label className="text-white-50 small mb-2">{t.messageLabel}</label>
                <textarea 
                  rows="4" required className="form-control bg-transparent text-white border-secondary"
                  value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className="btn btn-warning w-100 fw-bold py-3"
              >
                {loading ? "..." : t.sendBtn}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;