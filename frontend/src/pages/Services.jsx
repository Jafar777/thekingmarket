import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Pages.css';

const Services = () => {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const lettersRef = useRef([]);
  
  useEffect(() => {
    // أنيميشن العنوان
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1, ease: 'bounce.out' }
    );
    
    // أنيميشن النص
    gsap.fromTo(textRef.current, 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.2, delay: 0.5, ease: 'elastic.out(1, 0.8)' }
    );
    
    // أنيميشن الحروف
    gsap.fromTo(lettersRef.current, 
      { 
        opacity: 0, 
        y: (_, i) => i % 2 === 0 ? -50 : 50,
        rotation: (_, i) => i % 3 === 0 ? -30 : 30
      },
      { 
        opacity: 1, 
        y: 0, 
        rotation: 0,
        duration: 1.2,
        stagger: 0.05,
        delay: 0.8,
        ease: 'back.out(1.7)'
      }
    );
    
    // أنيميشن الخلفية
    gsap.timeline({ repeat: -1, yoyo: true })
      .to('.services-page', { backgroundPosition: '50% 40%', duration: 8, ease: 'sine.inOut' })
      .to('.services-page', { backgroundPosition: '50% 60%', duration: 8, ease: 'sine.inOut' });
  }, []);
  
  const comingSoonText = "Coming Soon";
  
  return (
    <div className="page-container services-page">
      <div className="page-content centered-content">
        <h1 ref={titleRef} className="page-title">
            Our Services
        </h1>
        
        <div ref={textRef} className="coming-soon">
          <div className="text-animation">
            {comingSoonText.split('').map((letter, i) => (
              <span 
                key={i} 
                ref={el => lettersRef.current[i] = el}
                className="animated-letter"
              >
                {letter}
              </span>
            ))}
          </div>
          <p className="sub-text">
            We are developing new services for a better shopping experience!
          </p>
        </div>
        
        <div className="services-info">
          <div className="service-card">
            <div className="service-icon">🛒</div>
            <h3>Online shopping</h3>
            <p>A complete online store for all your needs</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">📱</div>
            <h3>Mobile app</h3>
            <p>A dedicated app for a seamless shopping experience</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">🎁</div>
            <h3>Special gifts</h3>
            <p>Luxury gift packages for your special occasions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;