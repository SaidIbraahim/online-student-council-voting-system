// pages/HomePage.jsx
import React from 'react';
import Hero from '../components/Home/Hero';
import Features from '../components/Home/Features';
import Steps from '../components/Home/Steps';


export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Steps />
    </div>
  );
}