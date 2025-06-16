import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';

// تسجيل مكون ScrollTrigger مع GSAP
gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const hamburgerRef = useRef(null);
  const location = useLocation();

  // روابط القائمة
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' }
  ];

  // تأثير التمرير
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // أنيميشن الدخول
  useEffect(() => {
    // إخفاء العناصر في البداية
    gsap.set([navRef.current, ...linksRef.current], { opacity: 0, x: 50 });
    
    // أنيميشن الشريط كامل
    gsap.to(navRef.current, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'expo.out',
      delay: 0.2
    });
    
    // أنيميشن الشعار
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
    
    // أنيميشن الروابط
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
    
    // أنيميشن زر القائمة المختصرة
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

  // تأثير عند تمرير الصفحة
  useEffect(() => {
    if (scrolled) {
      gsap.to(navRef.current, {
        height: '70px',
        background: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
        duration: 0.5,
        ease: 'power2.out'
      });
      
      gsap.to('.nav-link', {
        color: '#333',
        duration: 0.3
      });
      
      gsap.to('.hamburger span', {
        backgroundColor: '#333',
        duration: 0.3
      });
    } else {
      gsap.to(navRef.current, {
        height: '100px',
        background: 'transparent',
        boxShadow: 'none',
        duration: 0.5,
        ease: 'power2.out'
      });
      
      gsap.to('.nav-link', {
        color: 'white',
        duration: 0.3
      });
      
      gsap.to('.hamburger span', {
        backgroundColor: 'white',
        duration: 0.3
      });
    }
  }, [scrolled]);

  // إغلاق القائمة عند تغيير الصفحة
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    
    if (menuOpen) {
      // أنيميشن إغلاق القائمة
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
      // أنيميشن فتح القائمة
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
        {/* logo */}
        <Link to="/" className="logo" ref={logoRef}>
          <img src={logo} alt="Logo" />
        </Link>

        {/* nav links */}
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              to={link.path}
              ref={el => (linksRef.current[index] = el)}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              <span className="link-text">{link.name}</span>
              <span className="link-hover"></span>
            </Link>
          ))}
        </div>

        {/* nav links for mobile*/}
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