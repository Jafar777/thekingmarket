import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const hamburgerRef = useRef(null);
  const location = useLocation();

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
    { name: 'Products', path: '/products' }
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial animation
  useEffect(() => {
    gsap.set([navRef.current, ...linksRef.current], { opacity: 0, x: 50 });
    
    gsap.to(navRef.current, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'expo.out',
      delay: 0.2
    });
    
    gsap.fromTo(logoRef.current, 
      { scale: 0.8, rotation: -5 },
      {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.4
      }
    );
    
    linksRef.current.forEach((link, i) => {
      gsap.fromTo(link, 
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.6 + i * 0.1,
          ease: 'back.out(1.7)'
        }
      );
    });
    
    gsap.fromTo(hamburgerRef.current, 
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: 1,
        ease: 'bounce.out'
      }
    );
  }, []);

  // Scroll effect changes
  useEffect(() => {
    if (scrolled) {
      gsap.to(navRef.current, {
        height: '70px',
        background: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
        duration: 0.5,
        ease: 'power2.out'
      });
    } else {
      gsap.to(navRef.current, {
        height: '100px',
        background: 'transparent',
        boxShadow: 'none',
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }, [scrolled]);

  // Close menu when location changes (mobile only)
  useEffect(() => {
    // Only run on mobile
    if (window.innerWidth <= 992) {
      setMenuOpen(false);
      
      gsap.to('.nav-links', {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in'
      });
      
      gsap.to('.hamburger span:nth-child(1)', {
        transform: 'rotate(0) translateY(0)',
        duration: 0.3
      });
      
      gsap.to('.hamburger span:nth-child(2)', {
        opacity: 1,
        duration: 0.3
      });
      
      gsap.to('.hamburger span:nth-child(3)', {
        transform: 'rotate(0) translateY(0)',
        duration: 0.3
      });
    }
  }, [location.pathname]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    
    if (menuOpen) {
      // Close animation
      gsap.to('.nav-links', {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in'
      });
      
      gsap.to('.hamburger span:nth-child(1)', {
        transform: 'rotate(0) translateY(0)',
        duration: 0.3
      });
      
      gsap.to('.hamburger span:nth-child(2)', {
        opacity: 1,
        duration: 0.3
      });
      
      gsap.to('.hamburger span:nth-child(3)', {
        transform: 'rotate(0) translateY(0)',
        duration: 0.3
      });
    } else {
      // Open animation
      gsap.to('.nav-links', {
        height: 'auto',
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
      
      gsap.to('.hamburger span:nth-child(1)', {
        transform: 'rotate(45deg) translate(5px, 8px)',
        duration: 0.3
      });
      
      gsap.to('.hamburger span:nth-child(2)', {
        opacity: 0,
        duration: 0.2
      });
      
      gsap.to('.hamburger span:nth-child(3)', {
        transform: 'rotate(-45deg) translate(5px, -8px)',
        duration: 0.3
      });
    }
  };

  return (
    <nav 
      ref={navRef} 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo" ref={logoRef}>
          <img src={logo} alt="Logo" />
        </Link>

        {/* Navigation links */}
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              to={link.path}
              ref={el => (linksRef.current[index] = el)}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => {
                // Close menu on mobile when a link is clicked
                if (window.innerWidth <= 992) {
                  toggleMenu();
                }
              }}
            >
              <span className="link-text">{link.name}</span>
              <span className="link-hover"></span>
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button 
          ref={hamburgerRef}
          className={`hamburger ${menuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}