import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Pages.css';

const Contact = () => {
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  useEffect(() => {
    // أنيميشن الدخول
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: -50, scale: 1.2 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
    );
    
    gsap.fromTo(formRef.current, 
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, delay: 0.3, ease: 'back.out(1.4)' }
    );
    
    gsap.fromTo(infoRef.current, 
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: 'back.out(1.4)' }
    );
    
    // أنيميشن الخلفية
    gsap.to('.contact-page', {
      backgroundPosition: '40% 50%',
      duration: 20,
      ease: 'none',
      repeat: -1,
      yoyo: true
    });
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // أنيميشن عند الإرسال
    gsap.to('.submit-button', {
      scale: 0.9,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        // رسالة نجاح
        gsap.to('.success-message', {
          opacity: 1,
          y: 0,
          duration: 0.5
        });
        
        // إخفاء الرسالة بعد 3 ثوان
        setTimeout(() => {
          gsap.to('.success-message', {
            opacity: 0,
            y: -20,
            duration: 0.5
          });
        }, 3000);
      }
    });
  };
  
  return (
    <div className="page-container contact-page">
      <div className="page-content">
        <h1 ref={titleRef} className="page-title">Contact Us</h1>
        
        <div className="contact-container">
          <div ref={formRef} className="contact-form">
            <div className="success-message">Message sent successfully! we will contact you asap</div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required 
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">Send the message</button>
            </form>
          </div>
          
          <div ref={infoRef} className="contact-info">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Address</h3>
              <p>3343 valley Pike STE 600 Winchester, VA 22602</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Phone number</h3>
              <p>+1 540-450-8892</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">✉️</div>
              <h3>Email address</h3>
              <p>info@kingmarket.com</p>
              <p>kingmarket4all@gmail.com</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">⏰</div>
              <h3>Working Hours</h3>
             <p>Monday - Saturday: 9AM - 8PM</p>
            <p>Sunday: Closed</p>
            </div>
            
            <div className="map-container">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3070.5864408433617!2d-78.1907255!3d39.1345929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b5eead61f2de15%3A0x5dd51cca043cef20!2s3343%20Valley%20Pike%20%23600%2C%20Winchester%2C%20VA%2022602%2C%20USA!5e1!3m2!1sen!2s!4v1749261803823!5m2!1sen!2s"
                title="King Market Location"
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: '15px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
                <p>Our location</p>
              
            
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;