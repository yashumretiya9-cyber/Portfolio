import React, { useState } from 'react'
import animationData from './mascot.json'
// import "@lottiefiles/lottie-player";

const LetsWork = () => {
  const [isGathered, setIsGathered] = useState(false);

  const handleMascotClick = () => {
    setIsGathered(true);
    // Return to orbit after a short delay
    setTimeout(() => {
      setIsGathered(false);
    }, 2000);
  };

  return (
    <section className="container letswork-section" id="contact">
      {/* Decorative Background Elements */}
      <div className="letswork-bg-blob"></div>
      <div className="letswork-bg-blob-2"></div>

      {/* Floating Background Robots */}
      <div className="bg-robot robot-1">
        <lottie-player src={JSON.stringify(animationData)} background="transparent" speed="0.8" loop autoplay></lottie-player>
      </div>
      <div className="bg-robot robot-2">
        <lottie-player src={JSON.stringify(animationData)} background="transparent" speed="1.2" loop autoplay></lottie-player>
      </div>
      <div className="bg-robot robot-3">
        <lottie-player src={JSON.stringify(animationData)} background="transparent" speed="0.5" loop autoplay></lottie-player>
      </div>
      <div className="bg-robot robot-4">
        <lottie-player src={JSON.stringify(animationData)} background="transparent" speed="1" loop autoplay></lottie-player>
      </div>

      <div className="letswork-header">
        <h2 className="section-subtitle">READY TO START?</h2>
        <h1 className="section-title">Let&apos;s create something <span>meaningful</span> and amazing together.</h1>
        <p className="section-description">Got a vision? Let&apos;s turn it into a high-performance reality. I&apos;m currently available for new projects and collaborations.</p>
        <a href="#contact-me" className="modern-connect-btn">
          <span className="btn-shine"></span>
          <span className="btn-text">Get In Touch</span>
          <i className="ri-arrow-right-up-line"></i>
        </a>
      </div>

      <div className="connect-visual">
        <div className="lottie-wrapper-3d" onClick={handleMascotClick} style={{ cursor: 'pointer', pointerEvents: 'auto' }}>
          <lottie-player
            src={JSON.stringify(animationData)}
            background="transparent"
            speed="1"
            style={{ width: '450px', height: '450px' }}
            loop
            autoplay
          ></lottie-player>
        </div>

        <div className={`orbit-container ${isGathered ? 'is-gathered' : ''}`}>
          <div className="orbit-wrapper">
            <a href="https://github.com/yashumretiya9-cyber" target="_blank" rel="noopener noreferrer" className="icon github sm-socials-link">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
            </a>
            <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer" className="icon linkedin sm-socials-link">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon twitter sm-socials-link">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg" alt="X" />
            </a>
            <a href="https://telegram.me" target="_blank" rel="noopener noreferrer" className="icon telegram sm-socials-link">
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" alt="Telegram" />
            </a>
            <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="icon whatsapp sm-socials-link">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon instagram sm-socials-link">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LetsWork