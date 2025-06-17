import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Shelves.css'
// Import your shelf images directly
import shelf1 from '../assets/shelve1.png';
import shelf2 from '../assets/shelve2.png';
import shelf3 from '../assets/shelve3.png';
import shelf4 from '../assets/shelve4.png';
import shelf5 from '../assets/shelve5.png';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Shelves = () => {
  const sliderRef = useRef(null);
  const [images] = useState([shelf1, shelf2, shelf3, shelf4, shelf5]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  // GSAP animations
  useEffect(() => {
    if (!sliderRef.current) return;
    
    // Background overlay animation
    gsap.to('.slider-overlay', {
      backgroundPosition: '50% 30%',
      scrollTrigger: {
        trigger: sliderRef.current,
        start: 'top top',
        end: 'bottom center',
        scrub: 1,
      }
    });
  }, []);

  return (
    <div 
      ref={sliderRef} 
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image */}
      <div 
        className="slider-overlay absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ 
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/80 z-10"></div>
      
      {/* Content */}
      <div 
        className="relative z-20 text-center max-w-4xl px-4 flex flex-col items-center animate-fadeIn"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-xl">
          Premium Groceries Delivered
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-md max-w-2xl">
          Fresh produce, quality meats, and pantry essentials
        </p>
        
        {/* Golden Button */}
        
<Link 
  to="/products" 
  className="px-8 py-4 md:px-12 md:py-6 lg:px-16 lg:py-7 bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-600 
  rounded-full text-xl md:text-2xl font-bold text-red-800 shadow-lg shadow-yellow-500/30
  transition-all duration-500 hover:scale-105 hover:shadow-yellow-500/50
  relative overflow-hidden group animate-buttonEntrance"
>
          <span className=" relative z-10">Explore Our Products</span>
          
          {/* Shine effect */}
          <span className=" shine absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
          transform -translate-x-full group-hover:translate-x-full transition-all duration-700"></span>
        </Link>
      </div>
    </div>
  );
};

export default Shelves;