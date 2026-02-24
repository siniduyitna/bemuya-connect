import React from 'react';
import { motion } from 'framer-motion';

const About = ({ t }) => {
  return (
    <section id="about" className="py-5 bg-black text-white border-top border-secondary">
      <div className="container py-5">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* ዋናው ስለ እኛ ክፍል */}
          <div className="text-center mb-5">
            <h2 className="text-warning fw-bold mb-4 display-5">
              {t.aboutTitle}
            </h2>
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <p className="lead lh-lg about-description">
                  {t.aboutText}
                </p>
              </div>
            </div>
          </div>

          <hr className="border-secondary my-5" />

          {/* ራዕይ እና ለምን እኛን ይመርጣሉ ክፍል */}
          <div className="row g-5 mt-4">
            {/* ራዕይ (Mission) */}
            <div className="col-md-5">
              <h3 className="text-warning fw-bold mb-3">{t.missionTitle}</h3>
              <p className="text-white-50 lh-base">
                {t.missionText}
              </p>
              
              {/* Image tag for visual context of a digital bridge/ecosystem */}
              
            </div>

            {/* ለምን እኛን ይመርጣሉ (Why Choose Us) */}
            <div className="col-md-7">
              <h3 className="text-warning fw-bold mb-4">{t.whyChooseUs}</h3>
              <div className="row g-3">
                {t.points && t.points.map((point, index) => (
                  <div key={index} className="col-12">
                    <div className="p-3 border border-secondary rounded-3 bg-dark bg-opacity-25 h-100 d-flex align-items-start">
                      <div className="text-warning me-3 fw-bold fs-4">•</div>
                      <p className="small mb-0 text-light">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;