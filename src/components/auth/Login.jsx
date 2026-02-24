import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiLockClosed, HiX } from 'react-icons/hi';

const Login = ({ isOpen, onClose, onLoginSuccess }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // ለጊዜው እዚህ ጋር የመረጥከውን ፓስዎርድ ማስገባት ትችላለህ
    if (password === "admin123") {
      onLoginSuccess();
      onClose();
      setPassword("");
      setError("");
    } else {
      setError("የተሳሳተ ፓስዎርድ ነው! እባክዎ እንደገና ይሞክሩ።");
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="login-modal bg-dark text-white p-4 p-md-5"
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
      >
        <button className="close-btn" onClick={onClose}><HiX /></button>
        
        <div className="text-center mb-4">
          <div className="login-icon-wrapper mb-3">
            <HiLockClosed size={40} className="text-warning" />
          </div>
          <h2 className="fw-bold">Admin Login</h2>
          <p className="text-white-50">ዳሽቦርዱን ለመክፈት ሚስጥራዊ ቁጥር ያስገቡ</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input 
              type="password" 
              className="form-control login-input" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </div>
          
          {error && <p className="text-danger small mb-3">{error}</p>}
          
          <button type="submit" className="btn btn-warning w-100 py-3 fw-bold rounded-pill">
            መግቢያ
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Login;