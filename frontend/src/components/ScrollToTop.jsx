// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when path changes
    window.scrollTo(0, 0);
    
    // Optional: smooth scroll animation
    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth'
    // });
  }, [pathname]);

  return null;
};

export default ScrollToTop;