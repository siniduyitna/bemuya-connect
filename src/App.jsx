import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { HiSearch, HiX, HiStar, HiLocationMarker, HiBriefcase } from 'react-icons/hi';
import { HelmetProvider } from 'react-helmet-async';

// Firebase Imports
import { db } from './firebase'; 
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";

// የፈጠርናቸው ሌሎች ፋይሎች
import RegistrationForm from './RegistrationForm';
import AdminDashboard from './AdminDashboard';
import Footer from './Footer';
import { artisansList } from './data';

// Assets (ፎቶዎች)
import potteryImg from './assets/images/pottery.webP';
import flooringImg from './assets/images/flooring.webP';
import carpentryImg from './assets/images/carpentry.webP';
import weavingImg from './assets/images/weaving.webP';
import embroideryImg from './assets/images/embroidery.webP';
import sewingImg from './assets/images/sewing.webP';
import spinningImg from './assets/images/spinning.webP';

const translations = {
  en: { 
    heroTitle: "Find Trusted", 
    all: "All", 
    construction: "Construction", 
    crafts: "Crafts", 
    fashion: "Fashion", 
    call: "Call", 
    exp: "Yrs Exp", 
    join: "Join Now", 
    noWorkers: "No professionals registered in this category yet.",
    searchPlaceholder: "Search professionals..."
  },
  am: { 
    heroTitle: "ታማኝ ባለሙያዎችን ያግኙ", 
    all: "ሁሉንም", 
    construction: "ግንባታ", 
    crafts: "ጥበብ", 
    fashion: "ልብስ", 
    call: "ደውል", 
    exp: "ዓመት", 
    join: "ይቀላቀሉ", 
    noWorkers: "ለጊዜው በዚህ ዘርፍ የተመዘገቡ ባለሙያዎች የሉም።",
    searchPlaceholder: "ባለሙያ ይፈልጉ..."
  }
};

function App() {
  const [lang, setLang] = useState('am');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [isRegOpen, setIsRegOpen] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  
  // Admin States
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  const t = translations[lang];

  // --- 1. ዳታውን ከ Firebase በቅጽበት ለማንበብ ---
  useEffect(() => {
    const q = query(collection(db, "workers"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const workers = [];
      querySnapshot.forEach((doc) => {
        workers.push({ id: doc.id, ...doc.data() });
      });
      setRegisteredUsers(workers);
    });
    return () => unsubscribe();
  }, []);

  // --- 2. አዲስ መረጃ ወደ Firebase ለመላክ ---
  const handleNewRegistration = async (newWorker) => {
    try {
      await addDoc(collection(db, "workers"), {
        ...newWorker,
        createdAt: serverTimestamp()
      });
      alert(lang === 'am' ? "ባለሙያው በተሳካ ሁኔታ ተመዝግቧል!" : "Registered successfully!");
    } catch (e) {
      console.error("Error: ", e);
      alert(lang === 'am' ? "ስህተት ተፈጥሯል፣ እባክህ ደግመህ ሞክር።" : "An error occurred, please try again.");
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === "123456") {
      setIsAdminAuthenticated(true);
    } else {
      alert(lang === 'am' ? "የተሳሳተ ፓስወርድ ነው!" : "Incorrect password!");
    }
  };

  const artisansData = [
    { id: 1, title: lang === 'am' ? "የሸክላ ጥበብ" : "Pottery Art", size: "large", img: potteryImg, category: "crafts" },
    { id: 2, title: lang === 'am' ? "ወለል እና ሰድር" : "Floor & Tile", size: "medium", img: flooringImg, category: "construction" },
    { id: 3, title: lang === 'am' ? "የአናጺነት ጥበብ" : "Carpentry", size: "small", img: carpentryImg, category: "construction" },
    { id: 4, title: lang === 'am' ? "የሽመና ጥበብ" : "Weaving", size: "medium", img: weavingImg, category: "fashion" },
    { id: 5, title: lang === 'am' ? "ጥልፍና ዳንቴል" : "Embroidery", size: "small", img: embroideryImg, category: "fashion" },
    { id: 6, title: lang === 'am' ? "የልብስ ስፌት" : "Sewing", size: "small", img: sewingImg, category: "fashion" },
    { id: 7, title: lang === 'am' ? "ጥጥ ፈተላ" : "Spinning", size: "small", img: spinningImg, category: "fashion" },
  ];

  const filteredArtisans = activeFilter === 'all' ? artisansData : artisansData.filter(i => i.category === activeFilter);

  // --- የአስተዳዳሪ ገጽ እይታ ---
  if (isAdminView) {
    if (!isAdminAuthenticated) {
      return (
        <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center text-white p-3">
          <div className="p-4 p-md-5 rounded-4 bg-dark border border-secondary shadow-lg text-center" style={{maxWidth: '400px', width: '100%'}}>
            <h3 className="mb-4 fw-bold text-warning">የአስተዳዳሪ መግቢያ</h3>
            <form onSubmit={handleAdminLogin}>
              <input type="password" placeholder="ፓስወርድ ያስገቡ" className="form-control bg-dark text-white border-secondary mb-3 py-2 text-center shadow-none" onChange={(e) => setAdminPassword(e.target.value)} />
              <button type="submit" className="btn btn-warning w-100 fw-bold mb-2">ግባ</button>
              <button type="button" className="btn btn-link text-white-50 btn-sm text-decoration-none" onClick={() => setIsAdminView(false)}>ተመለስ</button>
            </form>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-dark min-vh-100">
        <div className="p-3 d-flex justify-content-between align-items-center border-bottom border-secondary">
          <button className="btn btn-sm btn-outline-warning fw-bold" onClick={() => setIsAdminView(false)}>ወደ ዋናው ገጽ</button>
          <button className="btn btn-sm btn-outline-danger fw-bold" onClick={() => { setIsAdminAuthenticated(false); setAdminPassword(""); }}>ውጣ</button>
        </div>
        <AdminDashboard registeredUsers={registeredUsers} />
      </div>
    );
  }

  return (
    <HelmetProvider>
      <div className="App-container">
        {/* Navigation - Responsive Adjusted */}
        <nav className="glass-nav">
          <div className="nav-wrapper-full d-flex justify-content-between align-items-center px-3 px-md-4 py-2">
            <span className="navbar-brand text-white fw-bold fs-4 fs-md-2" style={{cursor: 'pointer'}} onClick={() => setIsAdminView(true)}>
              Bemuya<span className="text-warning">Connect</span>
            </span>
            <div className="nav-actions d-flex align-items-center gap-2 gap-md-3">
              <button className="btn btn-warning rounded-pill px-3 px-md-4 fw-bold btn-sm" onClick={() => setIsRegOpen(true)}>
                {t.join}
              </button>
              <div className="lang-switcher">
                <button className={lang === 'am' ? 'active' : ''} onClick={() => setLang('am')}>አማ</button>
                <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section - Responsive Adjusted */}
        <header className="hero-section text-center px-3">
          <h1 className="hero-title fw-bold text-white mb-4">
            {t.heroTitle} <br />
            <span className="text-warning">
              <TypeAnimation 
                key={lang} 
                sequence={
                  lang === 'am' 
                    ? ["የሸክላ ጥበብ", 1500, "የልብስ ስፌት", 1500, "አናጺዎች", 1500] 
                    : ["Pottery Art", 1500, "Tailoring", 1500, "Carpentry", 1500] 
                } 
                repeat={Infinity} 
              />
            </span>
          </h1>
          <div className="search-box-full mx-auto w-100" style={{maxWidth: '600px'}}>
            <HiSearch className="text-warning fs-4" />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder} 
              className="bg-transparent border-0 text-white w-100 outline-none ms-2" 
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="main-content-full p-3 p-md-4">
          <div className="filter-wrapper mb-5 d-flex justify-content-center gap-2 flex-wrap">
            {['all', 'construction', 'crafts', 'fashion'].map(f => (
              <button key={f} className={`filter-btn ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>{t[f]}</button>
            ))}
          </div>
          
          <div className="bento-grid">
            {filteredArtisans.map((item) => (
              <motion.div whileHover={{ scale: 1.02 }} key={item.id} className={`bento-item ${item.size}`} 
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${item.img})` }}
                onClick={() => setSelectedArtisan(item)}>
                <div className="bento-content">
                  <h3 className="h5 fw-bold text-white m-0">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </main>

        <Footer />

        <RegistrationForm isOpen={isRegOpen} onClose={() => setIsRegOpen(false)} onSubmit={handleNewRegistration} />
        
        {/* Artisan Detail Modal */}
        <AnimatePresence>
          {selectedArtisan && (
            <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedArtisan(null)}>
              <motion.div className="modal-card wide-modal bg-dark mx-2" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={() => setSelectedArtisan(null)}><HiX /></button>
                <div className="p-3 p-md-4">
                  <h2 className="text-white fw-bold mb-4 fs-4">{selectedArtisan.title}</h2>
                  <div className="artisan-scroll-area">
                    {artisansList[selectedArtisan.id] ? (
                      artisansList[selectedArtisan.id].map((art, idx) => (
                        <div key={idx} className="artisan-item-card d-flex justify-content-between align-items-center p-3 mb-2 rounded-3 border border-secondary flex-wrap gap-2">
                          <div>
                            <h6 className="text-white fw-bold m-0">{art.name}</h6>
                            <small className="text-white-50">
                               <HiLocationMarker className="text-warning me-1" /> {art.district} • 
                               <HiBriefcase className="text-warning mx-1" /> {art.experience} {t.exp}
                            </small>
                            <div className="mt-1"><HiStar className="text-warning me-1" /><span className="text-white-50 small">{art.rating}</span></div>
                          </div>
                          <a href={`tel:${art.phone}`} className="btn btn-warning btn-sm rounded-pill px-3 fw-bold">{t.call}</a>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-5"><p className="text-white-50">{t.noWorkers}</p></div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </HelmetProvider>
  );
}

export default App;