// src/components/SocialMedia.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import "./SocialMedia.css"
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const SocialMedia = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const circlesRef = useRef([]);
  const listenersRef = useRef([]); // Store event listeners
  
  useEffect(() => {
    // Set initial state
    gsap.set([titleRef.current, ...circlesRef.current], {
      opacity: 0,
      y: 50,
      scale: 0.8
    });
    
    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
    
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    });
    
    circlesRef.current.forEach((circle, i) => {
      tl.to(circle, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: i * 0.1
      }, "-=0.3");
    });
    
    // Create hover animations
    const handleMouseEnter = (circle) => {
      gsap.to(circle, {
        scale: 1.1,
        duration: 0.3,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
      });
    };
    
    const handleMouseLeave = (circle) => {
      gsap.to(circle, {
        scale: 1,
        duration: 0.3,
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
      });
    };
    
    // Add event listeners
    circlesRef.current.forEach((circle, index) => {
      if (!circle) return;
      
      const enterHandler = () => handleMouseEnter(circle);
      const leaveHandler = () => handleMouseLeave(circle);
      
      circle.addEventListener('mouseenter', enterHandler);
      circle.addEventListener('mouseleave', leaveHandler);
      
      // Store listeners for cleanup
      listenersRef.current[index] = { 
        element: circle, 
        enterHandler, 
        leaveHandler 
      };
    });
    
    // Cleanup function
    return () => {
      tl.kill();
      
      // Remove event listeners
      listenersRef.current.forEach(listener => {
        if (listener && listener.element) {
          listener.element.removeEventListener('mouseenter', listener.enterHandler);
          listener.element.removeEventListener('mouseleave', listener.leaveHandler);
        }
      });
    };
  }, []);

  const socialLinks = [
    { 
      name: "instagram", 
      icon: <FaInstagram className="social-icon" />,
      url: "https://instagram.com/kingmarket",
      color: "#4CAF50"
    },
    { 
      name: "facebook", 
      icon: <FaFacebookF className="social-icon" />,
      url: "https://www.facebook.com/kingmarketusa",
      color: "#4CAF50"
    },
    { 
      name: "tiktok", 
      icon: <FaTiktok className="social-icon" />,
      url: "https://tiktok.com/@kingmarket",
      color: "#4CAF50"
    },
    { 
      name: "X", 
      icon: <FaXTwitter className="social-icon" />,
      url: "https://twitter.com/kingmarket",
      color: "#4CAF50"
    }
  ];

  return (
    <section ref={sectionRef} className="social-section">
      <div className="container">
        <h2 ref={titleRef} className="social-title">
          Connect With Us
        </h2>
        <p className="social-subtitle">
          Follow King Market on social media for the latest updates, promotions, and more!
        </p>
        
        <div className="social-circles">
          {socialLinks.map((social, index) => (
            <a 
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-circle"
              ref={el => (circlesRef.current[index] = el)}
              style={{ backgroundColor: social.color }}
            >
              {social.icon}
              <span className="social-name">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;