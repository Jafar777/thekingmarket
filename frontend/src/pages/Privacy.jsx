import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Privacy.css';

gsap.registerPlugin(ScrollTrigger);

const Privacy = () => {
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
    gsap.to(".privacy-bg", {
      backgroundPosition: "0% 30%",
      duration: 30,
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
    <div className="privacy-page">
      <div className="privacy-bg"></div>
      <div className="privacy-content">
        <h1 ref={titleRef} className="privacy-title">
          <span className="title-gradient">Privacy Policy</span>
        </h1>
        
        <div ref={contentRef} className="privacy-container">
          <div ref={el => cardsRef.current[0] = el} className="privacy-card">
            <div className="card-icon">🔒</div>
            <h2>Information Collection</h2>
            <p>
              We collect personal information when you register on our site, place an order, 
              subscribe to our newsletter, or fill out a form. This may include your name, 
              email address, mailing address, phone number, or credit card information.
            </p>
          </div>
          
          <div ref={el => cardsRef.current[1] = el} className="privacy-card">
            <div className="card-icon">📊</div>
            <h2>Data Usage</h2>
            <p>
              The information we collect may be used to personalize your experience, 
              improve our website, improve customer service, process transactions, 
              send periodic emails, or administer a contest, promotion, or survey.
            </p>
          </div>
          
          <div ref={el => cardsRef.current[2] = el} className="privacy-card">
            <div className="card-icon">🛡️</div>
            <h2>Security Measures</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your 
              personal information. Your personal information is contained behind secured 
              networks and is only accessible by a limited number of persons.
            </p>
          </div>
          
          <div ref={el => cardsRef.current[3] = el} className="privacy-card">
            <div className="card-icon">🍪</div>
            <h2>Cookies Usage</h2>
            <p>
              We use cookies to help us remember and process the items in your shopping cart, 
              understand and save your preferences for future visits, and compile aggregate 
              data about site traffic and interaction.
            </p>
          </div>
          
          <div ref={el => cardsRef.current[4] = el} className="privacy-card">
            <div className="card-icon">🔍</div>
            <h2>Third-Party Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable 
              information to outside parties without providing you advance notice. This does 
              not include website hosting partners and other parties who assist us.
            </p>
          </div>
          
          <div ref={el => cardsRef.current[5] = el} className="privacy-card">
            <div className="card-icon">📝</div>
            <h2>Policy Changes</h2>
            <p>
              If we decide to change our privacy policy, we will post those changes on this 
              page. Policy changes will apply only to information collected after the date 
              of the change.
            </p>
          </div>
        </div>
        
        <div className="privacy-footer">
          <p>Last Updated: June 15, 2024</p>
          <p>© 2024 King Market. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;