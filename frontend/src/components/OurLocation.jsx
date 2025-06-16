import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './OurLocation.css';
import kingstore from "../assets/kingstore.jpeg"
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const OurLocation = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const mapRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Title animation
    tl.fromTo(titleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Text animation
    tl.fromTo(textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.2)" },
      "-=0.5"
    );

    // Image animation
    tl.fromTo(imageRef.current,
      { opacity: 0, x: -50, scale: 0.9 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.8)" },
      "-=0.3"
    );

    // Map animation
    tl.fromTo(mapRef.current,
      { opacity: 0, x: 50, scale: 0.9 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.8)" },
      "-=0.5"
    );

    // Continuous subtle animation
    gsap.to(imageRef.current, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <section ref={sectionRef} className="location-section">
      <div className="container">
        <div className="location-header">
          <h2 ref={titleRef} className="section-title">Visit Our Store</h2>
          <p ref={textRef} className="section-subtitle">
            Come experience the King Market difference in person. Our friendly staff is ready to help you find the perfect Halal products for your needs.
          </p>
        </div>
        
        <div className="location-content">
          <div ref={imageRef} className="store-image-container">
            <div className="store-image">
              <div className="image-overlay">King Market Storefront</div>
            </div>
          </div>
          
          <div ref={mapRef} className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3070.5864408433617!2d-78.1907255!3d39.1345929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b5eead61f2de15%3A0x5dd51cca043cef20!2s3343%20Valley%20Pike%20%23600%2C%20Winchester%2C%20VA%2022602%2C%20USA!5e1!3m2!1sen!2s!4v1749269157045!5m2!1sen!2s" 
              title="King Market Location"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        
        <div className="location-info">
          <div className="info-card">
            <h3>Address</h3>
            <p>3343 Valley Pike STE 600</p>
            <p>Winchester, VA 22602</p>
          </div>
          
          <div className="info-card">
            <h3>Hours</h3>
            <p>Monday - Saturday: 9AM - 8PM</p>
            <p>Sunday: Closed</p>
          </div>
          
          <div className="info-card">
            <h3>Contact</h3>
            <p>Phone: +1 (540) 450-8892</p>
            <p>Email: info@kingmarket.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurLocation;