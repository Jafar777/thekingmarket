// src/pages/Home.jsx
import React from 'react';
import HeroSlider from '../components/HeroSlider';
import AboutCard from '../components/AboutCard';
import SocialMedia from '../components/SocialMedia';

import OurLocation from '../components/OurLocation';
import Shelves from '../components/Shelves';

export default function Home() {
  return (
    <div className="overflow-hidden">
      <HeroSlider />
      <AboutCard />
      <Shelves />
      <SocialMedia />
       <OurLocation /> 
    </div>
  );
}