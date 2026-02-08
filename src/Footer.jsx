import React from 'react';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaFacebook, FaTelegram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-section mt-5 pt-5 pb-3" style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid #333' }}>
      <div className="container">
        <div className="row g-4">
          {/* ስለ ድርጅቱ */}
          <div className="col-lg-4 col-md-6">
            <h4 className="text-white fw-bold mb-3">
              Bemuya<span className="text-warning">Connect</span>
            </h4>
            <p className="text-white-50 small">
              ባለሙያዎችን ከደንበኞች ጋር በቀላሉ የሚያገናኝ ዘመናዊ መድረክ። ጥራት ያለው ስራ፣ ታማኝ ባለሙያ!
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="#" className="text-white-50 fs-4 hover-warning"><FaTelegram /></a>
              <a href="#" className="text-white-50 fs-4 hover-warning"><FaFacebook /></a>
              <a href="#" className="text-white-50 fs-4 hover-warning"><FaLinkedin /></a>
              <a href="#" className="text-white-50 fs-4 hover-warning"><FaTwitter /></a>
            </div>
          </div>

          {/* ፈጣን ሊንኮች */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-white fw-bold mb-3">ፈጣን ሊንኮች</h6>
            <ul className="list-unstyled text-white-50 small">
              <li className="mb-2"><a href="#" className="text-decoration-none text-white-50">ስለ እኛ</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-white-50">እንዴት ይሰራል?</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-white-50">ባለሙያ ፈልግ</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-white-50">የአጠቃቀም ደንቦች</a></li>
            </ul>
          </div>

          {/* አገልግሎቶች */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-white fw-bold mb-3">ዘርፎች</h6>
            <ul className="list-unstyled text-white-50 small">
              <li className="mb-2">የግንባታ ስራዎች</li>
              <li className="mb-2">የጥበብ ስራዎች</li>
              <li className="mb-2">የልብስ ስፌት</li>
              <li className="mb-2">የቤት ውስጥ ጥገና</li>
            </ul>
          </div>

          {/* አድራሻ */}
          <div className="col-lg-4 col-md-6">
            <h6 className="text-white fw-bold mb-3">አድራሻ</h6>
            <div className="text-white-50 small">
              <p className="mb-2 d-flex align-items-center gap-2">
                <HiLocationMarker className="text-warning" /> አዲስ አበባ፣ ኢትዮጵያ
              </p>
              <p className="mb-2 d-flex align-items-center gap-2">
                <HiPhone className="text-warning" /> +251 911 00 00 00
              </p>
              <p className="mb-2 d-flex align-items-center gap-2">
                <HiMail className="text-warning" /> info@bemuyaconnect.com
              </p>
            </div>
          </div>
        </div>

        <hr className="mt-5 mb-4" style={{ borderColor: '#333' }} />

        <div className="text-center text-white-50 small">
          <p>© {new Date().getFullYear()} BemuyaConnect. መብቱ በህግ የተጠበቀ ነው።</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;