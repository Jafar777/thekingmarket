import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const buttonRef = useRef(null);
  
  useEffect(() => {
    // Initial animation
    gsap.fromTo(buttonRef.current,
      { 
        scale: 0, 
        opacity: 0,
        rotation: -30
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        delay: 1,
        ease: "elastic.out(1, 0.8)"
      }
    );
    
    // Continuous pulse animation
    const pulse = gsap.to(buttonRef.current, {
      scale: 1.1,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      paused: true
    });
    
    // Start pulsing after entrance animation
    setTimeout(() => {
      pulse.play();
    }, 2000);
    
    // Cleanup on unmount
    return () => {
      pulse.kill();
    };
  }, []);
  
  const handleClick = () => {
    // Open WhatsApp chat
    window.open("https://wa.me/15404508892", "_blank");
    
    // Click animation
    gsap.to(buttonRef.current, {
      scale: 0.9,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };
  
  return (
    <div 
      ref={buttonRef}
      className="whatsapp-button"
      onClick={handleClick}
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="whatsapp-icon" />
    </div>
  );
};

export default WhatsAppButton;