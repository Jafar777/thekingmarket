import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Terms.css';

gsap.registerPlugin(ScrollTrigger);

const Terms = () => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Set initial state
    gsap.set([titleRef.current, ...cardsRef.current], { opacity: 0, y: 50 });
    
    // Title animation
    gsap.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%"
      }
    });
    
    // Content animations
    cardsRef.current.forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.15,
        scrollTrigger: {
          trigger: card,
          start: "top 90%"
        }
      });
    });
    
    // Background animation
    gsap.to(".terms-bg", {
      backgroundPosition: "0% 50%",
      duration: 40,
      repeat: -1,
      yoyo: true,
      ease: "none"
    });
    
    // Floating cards effect
    cardsRef.current.forEach(card => {
      gsap.to(card, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }, []);

  return (
    <div className="terms-page">
      <div className="terms-bg"></div>
      <div className="terms-content">
        <h1 ref={titleRef} className="terms-title">
          <span className="title-gradient">Terms & Conditions</span>
        </h1>
        
        <div ref={contentRef} className="terms-container">
          <div ref={el => cardsRef.current[0] = el} className="terms-card">
            <div className="card-icon">📜</div>
            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using our website, you agree to be bound by these Terms and 
              Conditions. If you disagree with any part of the terms, you may not access 
              the service.
            </p>
          </div>
          
          <div ref={el => cardsRef.current[1] = el} className="terms-card">
            <div className="card-icon">🛒</div>
            <h2>Online Store Terms</h2>
            <p>
              You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion 
              of the Service without express written permission by us. Products or services are 
              for your personal, non-commercial use.
            </p>
          </div>
          
          <div ref={el => cardsRef.current[2] = el} className="terms-card">
            <div className="card-icon">📦</div>
            <h2>Product Information</h2>
            <p>
              We reserve the right to limit the quantities of any products or services that we offer. 
              Descriptions of products are accurate to the best of our knowledge but we do not warrant 
              they are error-free.
            </p>
          </div>
          
          <div ref={el => cardsRef.current[3] = el} className="terms-card">
            <div className="card-icon">💳</div>
            <h2>Payments & Billing</h2>
            <p>
              You agree to provide current, complete, and accurate purchase and account information 
              for all purchases. You agree to pay all charges incurred by users of your credit card.
            </p>
          </div>
          
          <div ref={el => cardsRef.current[4] = el} className="terms-card">
            <div className="card-icon">🔄</div>
            <h2>Returns & Refunds</h2>
            <p>
              Our Return Policy forms part of these Terms. Please review our Return Policy to understand 
              your rights. We reserve the right to refuse returns that don't meet our policy requirements.
            </p>
          </div>
          
          <div ref={el => cardsRef.current[5] = el} className="terms-card">
            <div className="card-icon">⚖️</div>
            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed by and defined in accordance with the laws of the State of 
              Virginia. King Market and yourself irrevocably consent to the exclusive jurisdiction of 
              the courts of Virginia.
            </p>
          </div>
        </div>
        
        <div className="terms-footer">
          <p>Effective Date: June 15, 2024</p>
          <p>© 2024 King Market. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;