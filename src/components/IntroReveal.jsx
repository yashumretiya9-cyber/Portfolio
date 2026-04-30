import React, { useEffect, useState } from 'react';
import animationData from '../lottie.json';

const IntroReveal = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Initial display time (Stay on screen for 3 seconds)
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 3000);

    // Completely remove from DOM after animation finishes (Total 4 seconds)
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 4200);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`intro-reveal-overlay ${!isAnimating ? 'reveal-start' : ''}`}>
      <div className="intro-aura"></div>
      <div className="intro-panel left-panel"></div>
      <div className="intro-panel right-panel"></div>

      <div className="intro-content">
        <div className="intro-lottie-wrapper">
          <lottie-player 
            src={JSON.stringify(animationData)}
            background="transparent" 
            speed="1.2" 
            style={{ width: '250px', height: '250px' }} 
            loop 
            autoplay>
          </lottie-player>
        </div>
        <div className="intro-text-wrapper">
          <h1 className="intro-title">YASH<span></span></h1>
          <div className="intro-line"></div>
          <p className="intro-subtitle">PORTFOLIO &copy; 2026</p>
        </div>
      </div>
    </div>
  );
};

export default IntroReveal;
