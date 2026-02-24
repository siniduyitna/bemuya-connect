import React, { useState, useEffect, Suspense, lazy } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { HiSearch, HiX } from 'react-icons/hi';
import { HelmetProvider, Helmet } from 'react-helmet-async';

// Leaflet Imports
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Leaflet Icon Fix
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Firebase & Data Imports
import { db } from './firebase'; 
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { translations } from './translations.js'; 
import { artisansList } from './data';

// Components
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import ScrollToTop from './components/ScrollToTop';
import About from './components/About';

// Performance: Lazy Loading
const RegistrationForm = lazy(() => import('./RegistrationForm'));
const AdminDashboard = lazy(() => import('./AdminDashboard'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/layout/Footer'));

// Assets
import potteryImg from './assets/images/pottery.webP';
import flooringImg from './assets/images/flooring.webP';
import carpentryImg from './assets/images/carpentry.webP';
import weavingImg from './assets/images/weaving.webP';
import embroideryImg from './assets/images/embroidery.webP';
import sewingImg from './assets/images/sewing.webP';
import spinningImg from './assets/images/spinning.webP';

function App() {
  const [lang, setLang] = useState('am');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [isRegOpen, setIsRegOpen] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [isAdminView, setIsAdminView] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const t = translations[lang] || translations['am'];

  // 1. Firebase Real-time Listener
  useEffect(() => {
    const q = query(collection(db, "workers"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRegisteredUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // 2. ሰርች ሲደረግ በራሱ ወደ ውጤቱ ስክሮል እንዲያደርግ (አዲስ የተጨመረ)
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const artisanSection = document.getElementById('artisans');
      if (artisanSection) {
        artisanSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [searchTerm]);

  const handleNewRegistration = async (newWorker) => {
    try {
      await addDoc(collection(db, "workers"), { ...newWorker, createdAt: serverTimestamp() });
      alert(lang === 'am' ? "በተሳካ ሁኔታ ተመዝግቧል!" : "Registered successfully!");
    } catch (e) { console.error(e); }
  };

  const artisansData = [
    { id: 1, title: lang === 'am' ? (t.pottery || "የሸክላ ጥበብ") : "Pottery Art", size: "large", img: potteryImg, category: "crafts" },
    { id: 2, title: lang === 'am' ? (t.flooring || "ወለል እና ሰድር") : "Floor & Tile", size: "medium", img: flooringImg, category: "construction" },
    { id: 3, title: lang === 'am' ? (t.carpentry || "የአናጺነት ጥበብ") : "Carpentry", size: "small", img: carpentryImg, category: "construction" },
    { id: 4, title: lang === 'am' ? (t.weaving || "የሽመና ጥበብ") : "Weaving Art", size: "medium", img: weavingImg, category: "fashion" },
    { id: 5, title: lang === 'am' ? (t.embroidery || "ጥልፍና ዳንቴል") : "Embroidery", size: "small", img: embroideryImg, category: "fashion" },
    { id: 6, title: lang === 'am' ? (t.tailoring || "የልብስ ስፌት") : "Sewing", size: "small", img: sewingImg, category: "fashion" },
    { id: 7, title: lang === 'am' ? (t.spinning || "ጥጥ ፈተላ") : "Spinning", size: "small", img: spinningImg, category: "fashion" },
  ];

  const filteredArtisans = artisansData.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.category === activeFilter;
    const search = searchTerm.toLowerCase().trim();
    if (!search) return matchesFilter;

    const categoryWorkers = artisansList[item.id] || [];
    const hasMatchingWorker = categoryWorkers.some(art => 
      (art.district || "").toLowerCase().includes(search)
    );
    const matchesTitle = item.title.toLowerCase().includes(search);
    return matchesFilter && (matchesTitle || hasMatchingWorker);
  });

  return (
    <HelmetProvider>
      <div className="App-container">
        <Helmet>
          <title>BemuyaConnect | የታማኝ ባለሙያዎች መገኛ</title>
        </Helmet>

        <Navbar lang={lang} setLang={setLang} t={t} onOpenReg={() => setIsRegOpen(true)} onOpenAdmin={() => setIsLoginOpen(true)} />

        {/* Hero Section */}
        <header id="home" className="hero-section text-center py-5 px-3">
          <div className="container">
            <h1 className="hero-title fw-bold text-white mb-4">
              {t.heroTitle1} <br />
              <span className="text-warning">
                <TypeAnimation 
                  key={lang} 
                  sequence={lang === 'am' ? ["የሸክላ ጥበብ", 1500, "የልብስ ስፌት", 1500, "አናጺዎች", 1500] : ["Pottery Art", 1500, "Tailoring", 1500, "Carpentry", 1500]} 
                  repeat={Infinity} 
                />
              </span>
            </h1>
            <div className="search-box-full mx-auto" style={{maxWidth: '600px'}}>
              <HiSearch className="text-warning fs-4" />
              <input 
                type="text" 
                placeholder={lang === 'am' ? "በክፍለ ከተማ ይፈልጉ (ልደታ፣ ቦሌ...)" : "Search by district..."} 
                className="search-input-custom" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && <HiX className="text-white-50 cursor-pointer" onClick={() => setSearchTerm("")} />}
            </div>
          </div>
        </header>

        {/* --- እንዴት ይሰራ (How It Works) --- */}
        <section id="how-it-works" className="py-5 bg-dark border-top border-secondary">
          <div className="container text-center text-white">
            <h2 className="text-warning fw-bold mb-5">{t.howItWorks || "እንዴት ይሠራል?"}</h2>
            <div className="row g-4">
              {(t.steps || []).map((step) => (
                <div key={step.id} className="col-md-4">
                  <motion.div className="step-card p-4 border border-secondary rounded-4 h-100" whileHover={{ y: -10 }}>
                    <div className="step-number mb-3">{step.id}</div>
                    <h4 className="fw-bold">{step.title}</h4>
                    <p className="text-white-50">{step.desc}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <main id="artisans" className="py-5">
          <div className="container">
            {/* ሰርች ውጤት ማሳያ (አዲስ የተጨመረ) */}
            {searchTerm && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 p-2 bg-warning bg-opacity-10 border border-warning rounded text-warning text-center fw-bold">
                {lang === 'am' ? `"${searchTerm}" በሚል ፍለጋ ${filteredArtisans.length} ውጤቶች ተገኝተዋል` : `Found ${filteredArtisans.length} results for "${searchTerm}"`}
              </motion.div>
            )}

            <h3 className="text-white mb-4 fw-bold">{t.categories}</h3>
            <div className="filter-wrapper mb-5 d-flex gap-2 flex-wrap">
              {['all', 'construction', 'crafts', 'fashion'].map(f => (
                <button key={f} className={`filter-btn ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>{t[f] || f}</button>
              ))}
            </div>
            <div className="bento-grid">
              {filteredArtisans.length > 0 ? filteredArtisans.map(item => (
                <motion.div layout key={item.id} className={`bento-item ${item.size}`} 
                  style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${item.img})` }}
                  onClick={() => setSelectedArtisan(item)}>
                  <div className="bento-content"><h2>{item.title}</h2></div>
                </motion.div>
              )) : <div className="text-center text-white-50 w-100 py-5">{t.noWorkers}</div>}
            </div>
          </div>
        </main>

        {/* --- ስለ እኛ (About Us) --- */}
        <About t={t} />

        <Suspense fallback={<div className="text-center p-5 text-warning">Loading...</div>}>
          <Contact t={t} lang={lang} />
          <Footer t={t} lang={lang} />
        </Suspense>

        <Suspense fallback={null}>
          <AnimatePresence>
            {isLoginOpen && <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={() => { setIsAdminView(true); setIsLoginOpen(false); }} />}
            {isAdminView && <AdminDashboard registeredUsers={registeredUsers} onClose={() => setIsAdminView(false)} />}
            {isRegOpen && <RegistrationForm isOpen={isRegOpen} onClose={() => setIsRegOpen(false)} onSubmit={handleNewRegistration} />}
            
            {selectedArtisan && (
              <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedArtisan(null)}>
                <motion.div className="modal-card wide-modal bg-dark p-4" onClick={e => e.stopPropagation()}>
                  <button className="close-btn" onClick={() => setSelectedArtisan(null)}><HiX /></button>
                  <h3 className="text-warning fw-bold mb-3">{selectedArtisan.title}</h3>
                  
                  <div className="map-container-wrapper" style={{ height: '300px', width: '100%', borderRadius: '15px', overflow: 'hidden' }}>
                    <MapContainer center={[9.0122, 38.7578]} zoom={11} style={{ height: '100%', width: '100%' }}>
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      {(artisansList[selectedArtisan.id] || []).map((art, idx) => (
                        art.position && (
                          <Marker key={idx} position={art.position}>
                            <Popup>
                              <div className="popup-content">
                                <strong>{art.name}</strong><br/>
                                {art.district}<br/>
                                <a href={`tel:${art.phone}`} className="btn btn-warning btn-sm mt-2">{t.call}</a>
                              </div>
                            </Popup>
                          </Marker>
                        )
                      ))}
                    </MapContainer>
                  </div>

                  <div className="artisan-list-container mt-4">
                    {(artisansList[selectedArtisan.id] || []).map((art, idx) => (
                      <div key={idx} className="artisan-item-card d-flex justify-content-between align-items-center p-3 mb-2 rounded border border-secondary">
                        <div className="text-white">
                          <h4 className="h6 m-0 fw-bold">{art.name}</h4>
                          <small className="text-warning">{art.district}</small> • <small className="text-white-50">{art.experience} {t.exp}</small>
                        </div>
                        <a href={`tel:${art.phone}`} className="btn btn-warning btn-sm px-3 fw-bold">{t.call}</a>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </Suspense>

        <ScrollToTop />
      </div>
    </HelmetProvider>
  );
}

export default App;