import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Pages.css';

const About = () => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef([]);
  
  useEffect(() => {
    // أنيميشن الدخول
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    
    gsap.fromTo(contentRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'back.out(1.2)' }
    );
    
    // أنيميشن البطاقات
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(card, 
        { opacity: 0, x: (i % 2 === 0 ? -50 : 50) },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.8, 
          delay: 0.5 + i * 0.2,
          ease: 'elastic.out(1, 0.8)' 
        }
      );
    });
    
    // أنيميشن الخلفية
    gsap.to('.about-page', {
      backgroundPosition: '50% 30%',
      duration: 15,
      ease: 'none',
      repeat: -1,
      yoyo: true
    });
  }, []);
  
  return (
    <div className="page-container about-page">
      <div className="page-content">
        <h1 ref={titleRef} className="page-title">About King Market</h1>
        
        <div ref={contentRef} className="about-content">
          <p>
            Welcome to <strong>King Market</strong>  your premier destination for high-quality, 100% halal products at affordable prices. We believe that halal food is not just a choice, but a meaning that ensures a life of health and blessings.

          </p>
          
          <div className="halal-certificate">
            <div className="halal-icon">HALAL</div>
            <p>
All our products are subject to strict supervision by Sharia Supervisory Committees, and we guarantee that everything you purchase from us is halal and compliant with Islamic Sharia law.
            </p>
          </div>
        </div>
        
        <div className="values-cards">
          <div ref={el => cardsRef.current[0] = el} className="value-card">
            <div className="card-icon">✓</div>
            <h3>Guaranteed quality</h3>
            <p>We select the best products from reliable sources to ensure quality and distinctive taste.</p>
          </div>
          
          <div ref={el => cardsRef.current[1] = el} className="value-card">
            <div className="card-icon">☪</div>
            <h3>Islamic obligation</h3>
            <p>All our products are 100% halal with certificates approved by Sharia authorities.</p>
          </div>
          
          <div ref={el => cardsRef.current[2] = el} className="value-card">
            <div className="card-icon">🚚</div>
            <h3> Fast delivery (Coming Soon) </h3>
            <p>Ultra-fast delivery service to ensure fresh arrival of products</p>
          </div>
          
          <div ref={el => cardsRef.current[3] = el} className="value-card">
            <div className="card-icon">🎧</div>
            <h3> Customer service</h3>
            <p>Customer service team available to assist you with any inquiries.</p>
          </div>
        </div>
        
        <div className="founder-section">
          <div className="founder-image"></div>
          <div className="founder-message">
            <h3>A word from the founder</h3>
            <p>
                <strong>King Market</strong> was founded in 2025 with the goal of providing high-quality HALAL products to the Muslim community. We pride ourselves on becoming the go-to destination for anyone looking for guaranteed halal food from trusted sources.

            </p>
            <p className="founder-name"> The Owner</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;