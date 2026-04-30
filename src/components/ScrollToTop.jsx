import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div 
        className={`scroll-to-top ${isVisible ? 'show' : ''}`} 
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <i className="ri-arrow-up-line"></i>
      </div>

      <style>{`
        .scroll-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          background: var(--card-bg);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(14, 165, 233, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: var(--accent-blue);
          cursor: pointer;
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .scroll-to-top.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .scroll-to-top:hover {
          background: var(--accent-blue);
          color: white;
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(14, 165, 233, 0.3);
        }

        .scroll-to-top i {
          transition: transform 0.3s ease;
        }

        .scroll-to-top:hover i {
          transform: scale(1.2);
        }

        @media (max-width: 768px) {
          .scroll-to-top {
            width: 40px;
            height: 40px;
            bottom: 20px;
            right: 20px;
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default ScrollToTop;
