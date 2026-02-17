import React, { useState, useEffect, Suspense, lazy } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { HiSearch, HiX, HiStar, HiLocationMarker, HiBriefcase } from 'react-icons/hi';
import { HelmetProvider, Helmet } from 'react-helmet-async';

// Firebase Imports
import { db } from './firebase'; 
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";

// --- PERFORMANCE: ለብቻቸው የሚጫኑ ክፍሎች (Lazy Loading) ---
const RegistrationForm = lazy(() => import('./RegistrationForm'));
const AdminDashboard = lazy(() => import('./AdminDashboard'));
const Footer = lazy(() => import('./Footer'));

// Static Data
import { artisansList } from './data';

// Assets (ምስሎች)
import potteryImg from './assets/images/pottery.webP';
import flooringImg from './assets/images/flooring.webP';
import carpentryImg from './assets/images/carpentry.webP';
import weavingImg from './assets/images/weaving.webP';
import embroideryImg from './assets/images/embroidery.webP';
import sewingImg from './assets/images/sewing.webP';
import spinningImg from './assets/images/spinning.webP';

const translations = {
  en: { 
    heroTitle: "Find Trusted", all: "All", construction: "Construction", crafts: "Crafts", fashion: "Fashion", 
    call: "Call", exp: "Yrs Exp", join: "Join Now", noWorkers: "No professionals registered yet.",
    searchPlaceholder: "Search professionals..."
  },
  am: { 
    heroTitle: "ታማኝ ባለሙያዎችን ያግኙ", all: "ሁሉንም", construction: "ግንባታ", crafts: "ጥበብ", fashion: "ልብስ", 
    call: "ደውል", exp: "ዓመት", join: "ይቀላቀሉ", noWorkers: "ለጊዜው በዚህ ዘርፍ የተመዘገቡ ባለሙያዎች የሉም።",
    searchPlaceholder: "ባለሙያ ይፈልጉ..."
  }
};

function App() {
  const [lang, setLang] = useState('am');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [isRegOpen, setIsRegOpen] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  const t = translations[lang];

  // Firebase Real-time Sync
  useEffect(() => {
    const q = query(collection(db, "workers"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const workers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRegisteredUsers(workers);
    });
    return () => unsubscribe();
  }, []);

  const handleNewRegistration = async (newWorker) => {
    try {
      await addDoc(collection(db, "workers"), { ...newWorker, createdAt: serverTimestamp() });
      alert(lang === 'am' ? "በተሳካ ሁኔታ ተመዝግቧል!" : "Registered successfully!");
    } catch (e) { console.error(e); }
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

  return (
    <HelmetProvider>
      <div className="App-container">
        <Helmet>
          <title>BemuyaConnect | የታማኝ ባለሙያዎች መገኛ</title>
          <meta name="description" content="በኢትዮጵያ ውስጥ ያሉ ምርጥ የሸክላ፣ የልብስ ስፌት፣ የአናጺነት እና ሌሎች ባለሙያዎችን ያግኙ።" />
          <html lang={lang} />
        </Helmet>

        {/* Navigation */}
        <nav className="glass-nav">
          <div className="nav-wrapper-full d-flex justify-content-between align-items-center px-3 px-md-4 py-2">
            <span className="navbar-brand text-white fw-bold fs-4" onClick={() => setIsAdminView(true)} style={{cursor: 'pointer'}}>
              Bemuya<span className="text-warning">Connect</span>
            </span>
            <div className="nav-actions d-flex align-items-center gap-2">
              <button 
                className="btn btn-warning rounded-pill px-3 fw-bold btn-sm text-dark" 
                onClick={() => setIsRegOpen(true)}
                aria-label="ባለሙያ ለመሆን ይመዝገቡ"
              >
                {t.join}
              </button>
              <div className="lang-switcher" role="group" aria-label="ቋንቋ ይቀይሩ">
                <button className={lang === 'am' ? 'active' : ''} onClick={() => setLang('am')}>አማ</button>
                <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
              </div>
            </div>
          </div>
        </nav>

        <header className="hero-section text-center px-3">
          <h1 className="hero-title fw-bold text-white mb-4">
            {t.heroTitle} <br />
            <span className="text-warning">
              <TypeAnimation 
                key={lang} 
                sequence={lang === 'am' ? ["የሸክላ ጥበብ", 1500, "የልብስ ስፌት", 1500, "አናጺዎች", 1500] : ["Pottery Art", 1500, "Tailoring", 1500, "Carpentry", 1500]} 
                repeat={Infinity} 
              />
            </span>
          </h1>
          <div className="search-box-full mx-auto w-100" style={{maxWidth: '600px'}}>
            <HiSearch className="text-warning fs-4" aria-hidden="true" />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder} 
              className="bg-transparent border-0 text-white w-100 ms-2 outline-none" 
              aria-label="ባለሙያ ይፈልጉ"
            />
          </div>
        </header>

        <main className="main-content-full p-3 p-md-4">
          <div className="filter-wrapper mb-5 d-flex justify-content-center gap-2 flex-wrap">
            {['all', 'construction', 'crafts', 'fashion'].map(f => (
              <button key={f} className={`filter-btn ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>{t[f]}</button>
            ))}
          </div>
          
          <div className="bento-grid">
            {filteredArtisans.map((item) => (
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                key={item.id} 
                className={`bento-item ${item.size}`} 
                style={{ 
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${item.img})`,
                  contentVisibility: 'auto' 
                }}
                onClick={() => setSelectedArtisan(item)}
              >
                <div className="bento-content">
                  <h2 className="h5 fw-bold text-white m-0">{item.title}</h2>
                </div>
              </motion.div>
            ))}
          </div>
        </main>

        {/* --- PERFORMANCE: Suspense በመጠቀም ገጹን ሳያዘገዩ መጫን --- */}
        <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
          <Footer />
        </Suspense>

        <Suspense fallback={null}>
          {isRegOpen && <RegistrationForm isOpen={isRegOpen} onClose={() => setIsRegOpen(false)} onSubmit={handleNewRegistration} />}
          {isAdminView && <AdminDashboard registeredUsers={registeredUsers} onClose={() => setIsAdminView(false)} />}
        </Suspense>
        
        <AnimatePresence>
          {selectedArtisan && (
            <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedArtisan(null)}>
              <motion.div className="modal-card wide-modal bg-dark mx-2" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={() => setSelectedArtisan(null)} aria-label="ዝጋ"><HiX /></button>
                <div className="p-3 p-md-4">
                  <h3 className="text-white fw-bold mb-4 fs-4">{selectedArtisan.title}</h3>
                  <div className="artisan-scroll-area">
                    {artisansList[selectedArtisan.id] ? (
                      artisansList[selectedArtisan.id].map((art, idx) => (
                        <div key={idx} className="artisan-item-card d-flex justify-content-between align-items-center p-3 mb-2 rounded-3 border border-secondary flex-wrap gap-2">
                          <div>
                            <h4 className="text-white fw-bold m-0 fs-6">{art.name}</h4>
                            <small className="text-white-50">
                               <HiLocationMarker className="text-warning me-1" /> {art.district} • 
                               <HiBriefcase className="text-warning mx-1" /> {art.experience} {t.exp}
                            </small>
                            <div className="mt-1"><HiStar className="text-warning me-1" /><span className="text-white-50 small">{art.rating}</span></div>
                          </div>
                          <a href={`tel:${art.phone}`} className="btn btn-warning btn-sm rounded-pill px-3 fw-bold text-dark">{t.call}</a>
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