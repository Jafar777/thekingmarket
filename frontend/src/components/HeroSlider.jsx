import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './HeroSlider.css';
import chicken from "../assets/chicken.png"
import beef from "../assets/beef.png"
import breasts from "../assets/breasts.png"
import goat from "../assets/goat.png"
import lamb from "../assets/lamb.png"
export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  const slides = [
    { 
      image: chicken, 
      color: { inner: '#feebd9', outer: '#ed8f89' },
      text: "THE BEST ORGANIC WHOLE CHICKEN IN TOWN"
    },
    { 
      image: beef, 
      color: { inner: '#feeee2', outer: '#a60e1b' },
      text: "THE BEST ORGANIC BEEF IN TOWN"
    },
    { 
      image: goat, 
      color: { inner: '#ede4d3', outer: '#8e484e' },
      text: "THE BEST ORGANIC GOAT IN TOWN"
    },
    { 
      image: lamb, 
      color: { inner: '#e5c4ad', outer: '#cc6131' },
      text: "THE BEST ORGANIC LAMB IN TOWN"
    },
    { 
      image: breasts, 
      color: { inner: '#f8dacb', outer: '#ad5c3a' },
      text: "THE BEST ORGANIC CHICKEN BREASTS IN TOWN"
    }
  ];

  // GSAP Animation
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Background color transition
    tl.to(sliderRef.current, {
      background: `radial-gradient(circle at center, ${slides[currentSlide].color.inner}, ${slides[currentSlide].color.outer})`,
      duration: 1,
      ease: "power2.inOut"
    });
    
    // Image animation
    tl.fromTo(imageRef.current, 
      { opacity: 0, scale: 0.8, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.5"
    );
    
    // Text animation
    tl.fromTo(textRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
      "-=0.3"
    );

  }, [currentSlide, slides]);

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div 
      className="hero-container" 
      ref={sliderRef}
      style={{ 
        background: `radial-gradient(circle at center, 
          ${slides[currentSlide].color.inner}, 
          ${slides[currentSlide].color.outer})` 
      }}
    >
      <div className="slider-content">
        <img 
          ref={imageRef}
          src={slides[currentSlide].image} 
          alt={`Slide ${currentSlide + 1}`} 
          className="center-image" 
        />
        <h2 ref={textRef} className="slide-text">
          {slides[currentSlide].text}
        </h2>
      </div>

      <div className="dots-container">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}