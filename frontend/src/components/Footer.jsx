// src/components/Footer.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './Footer.css';
import logo from '../assets/logo.png'; // Make sure to have your logo in assets

const Footer = () => {
  const footerRef = useRef(null);
  const columnsRef = useRef([]);
  const socialRef = useRef(null);
  const copyrightRef = useRef(null);

  useEffect(() => {
    // Animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 95%",
        toggleActions: "play none none none"
      }
    });

    // Logo animation
    tl.fromTo('.footer-logo', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Column animations
    columnsRef.current.forEach((column, index) => {
      tl.fromTo(column,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" },
        index > 0 ? "-=0.3" : "-=0.5"
      );
    });

    // Social media animation
    tl.fromTo(socialRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.7, ease: "elastic.out(1, 0.8)" },
      "-=0.3"
    );

    // Copyright animation
    tl.fromTo(copyrightRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=0.2"
    );

    // Continuous pulse for social icons
    gsap.to('.social-icon', {
      y: -5,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 0.2,
        from: "random"
      }
    });
  }, []);

  return (
    <footer ref={footerRef} className="footer">
      <div className="footer-top">
        <div className="footer-logo-container">
          <Link to="/" className="footer-logo">
            <img src={logo} alt="King Market Logo" />
            <div className="logo-text">
              <span className="king">King</span>
              <span className="market">Market</span>
            </div>
          </Link>
          <p className="footer-description">
            Your trusted source for high-quality, Halal-certified products. 
            We're committed to bringing you the finest selection with ethical standards.
          </p>
        </div>

        <div className="footer-columns">
          <div ref={el => columnsRef.current[0] = el} className="footer-column">
            <h3 className="column-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          <div ref={el => columnsRef.current[1] = el} className="footer-column">
            <h3 className="column-title">Our Products</h3>
            <ul className="footer-links">
              <li><Link to="/products/meats">Fresh Meats</Link></li>
              <li><Link to="/products/canned">Canned Goods</Link></li>
              <li><Link to="/products/produce">Fruits & Vegetables</Link></li>
              <li><Link to="/products/dairy">Dairy Products</Link></li>
              <li><Link to="/products/bakery">Bakery Items</Link></li>
              <li><Link to="/products/spices">Spices & Herbs</Link></li>
            </ul>
          </div>

          <div ref={el => columnsRef.current[2] = el} className="footer-column">
            <h3 className="column-title">Contact Info</h3>
            <ul className="contact-info">
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <span>3343 Valley Pike STE 600, Winchester, VA 22602</span>
              </li>
              <li>
                <FaPhone className="contact-icon" />
                <span>+1 540-450-8892</span>
              </li>
              <li>
                <FaEnvelope className="contact-icon" />
                <span>info@kingmarket.com</span>
              </li>
              <li>
                <FaClock className="contact-icon" />
                <p>Monday - Saturday: 9AM - 8PM</p>
                  <p>Sunday: Closed</p>
                
                
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div ref={socialRef} className="social-links">
          <a href="https://facebook.com/kingmarket" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaFacebookF />
          </a>
          <a href="https://instagram.com/kingmarket" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaInstagram />
          </a>
          <a href="https://twitter.com/kingmarket" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaTwitter />
          </a>
          <a href="https://tiktok.com/@kingmarket" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaTiktok />
          </a>
        </div>

        <div ref={copyrightRef} className="copyright">
          &copy; {new Date().getFullYear()} King Market. All rights reserved.
          <div className="payment-methods">
            <div className="payment-icon">Visa</div>
            <div className="payment-icon">Mastercard</div>
            <div className="payment-icon">American Express</div>
            <div className="payment-icon">Apple Pay</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;