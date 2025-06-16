// src/components/About.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "./AboutCard.css"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutCard = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const halalRef = useRef(null);
  const statsRefs = useRef([]);

  useEffect(() => {
    // Set initial state for animations
    gsap.set([cardRef.current, titleRef.current, textRef.current, halalRef.current], {
      opacity: 0,
      y: 50
    });
    
    gsap.set(statsRefs.current, { opacity: 0, y: 30 });
    
    // Create timeline for animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
    
    tl.to(cardRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "back.out(1.2)"
    }, "-=0.3")
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out"
    }, "-=0.2")
    .to(halalRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      scale: 1.1,
      ease: "elastic.out(1, 0.8)"
    }, "-=0.2")
    .to(statsRefs.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: "power2.out"
    }, "-=0.2");
    
    // Animation for halal seal
    gsap.to(halalRef.current, {
      rotation: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="about-section">
      <div className="container">
        <div ref={cardRef} className="about-card">
          <div className="about-content">
            <h2 ref={titleRef} className="about-title">
              Welcome to King Market
            </h2>
            
            <p ref={textRef} className="about-description">
              King Market is your premier destination for high-quality, ethically-sourced products. 
              We pride ourselves on offering the finest selection of meats, produce, and pantry staples, 
              all carefully selected to meet our rigorous standards of quality and freshness.
            </p>
            
            <p className="about-description">
              What sets us apart is our unwavering commitment to Halal principles. Every product in our market 
              is certified Halal, ensuring that you can shop with confidence knowing that your food meets 
              the highest ethical and religious standards.
            </p>
            
            <div className="stats-container">
              <div ref={el => statsRefs.current[0] = el} className="stat-item">
                <div className="stat-value">100%</div>
                <div className="stat-label">Halal Certified</div>
              </div>
              
              <div ref={el => statsRefs.current[1] = el} className="stat-item">
                <div className="stat-value">25+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              
              <div ref={el => statsRefs.current[2] = el} className="stat-item">
                <div className="stat-value">1500+</div>
                <div className="stat-label">Products</div>
              </div>
              
              <div ref={el => statsRefs.current[3] = el} className="stat-item">
                <div className="stat-value">10K+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
            </div>
          </div>
          
          <div className="halal-container1">
            <div ref={halalRef} className="halal-badge1">
              <div className="halal-icon1">
                <div className="halal-text1">حلال</div>
                <div className="halal-certified1">Certified Halal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCard;