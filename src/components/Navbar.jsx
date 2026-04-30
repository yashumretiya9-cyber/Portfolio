import React, { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'

const NAV_ITEMS = ['Home', 'Skills', 'About', 'Projects', 'Contact']

/* ── NavLink Component ── */
const NavLink = ({ label, href, active }) => {
  return (
    <a
      href={href}
      className={`lg-link ${active ? 'is-active' : ''}`}
    >
      {label.toUpperCase()}
    </a>
  )
}

/* ── Main Navbar ── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState('Home')
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <nav className="lg-nav-wrapper" aria-label="Main navigation">

          {/* 1. Left Section (Logo) */}
          <div className="nav-section section-left">
            <div className="nav-capsule logo-capsule">
              <span className="logo-text">YASH-PORTFOLIO</span>
            </div>
          </div>

          {/* 2. Center Section (Links) */}
          <div className="nav-section section-center">
            <div className="nav-capsule links-capsule">
              <ul className="lg-links" role="list">
                {NAV_ITEMS.map(item => (
                  <li key={item} onClick={() => setActiveItem(item)}>
                    <NavLink 
                      label={item} 
                      href={`#${item.toLowerCase()}`} 
                      active={activeItem === item}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. Right Section (Theme Toggle) */}
          <div className="nav-section section-right">
            <div className="nav-capsule action-capsule">
              <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
                {theme === 'light' ? (
                  <i className="ri-moon-line"></i>
                ) : (
                  <i className="ri-sun-line"></i>
                )}
              </button>
            </div>
          </div>

        </nav>
      </header>

      <style>{`
        /* ======================================================
           ABSOLUTE CENTERED CAPSULE NAVBAR
           ====================================================== */
        .site-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 999;
          display: flex;
          justify-content: center;
          padding: 24px;
          pointer-events: none;
          transition: all 0.4s ease;
        }
        .site-header.is-scrolled { padding: 12px 24px; }

        .lg-nav-wrapper {
          pointer-events: auto;
          width: 100%;
          max-width: 1200px;
          display: grid;
          grid-template-columns: 1fr auto 1fr; /* 3 columns: Left, Center (auto), Right */
          align-items: center;
          transition: all 0.4s ease;
        }

        .nav-section {
          display: flex;
          align-items: center;
        }
        .section-left { justify-content: flex-start; }
        .section-center { justify-content: center; }
        .section-right { justify-content: flex-end; }

        /* --- Individual Capsules (3D Look) --- */
        .nav-capsule {
          background: var(--card-bg);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-bottom: 2px solid rgba(0, 0, 0, 0.1); /* Simulation of thickness */
          border-radius: 100px;
          display: flex;
          align-items: center;
          padding: 6px;
          box-shadow: 
            0 15px 35px -5px rgba(0, 0, 0, 0.2), 
            inset 0 1px 1px rgba(255, 255, 255, 0.3); /* Beveled highlight */
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform: perspective(1000px) rotateX(5deg);
        }

        .nav-capsule:hover {
          transform: perspective(1000px) rotateX(0deg) translateY(-5px) scale(1.02);
          box-shadow: 
            0 20px 45px -5px rgba(0, 0, 0, 0.3), 
            0 0 15px rgba(14, 165, 233, 0.2);
          border-color: rgba(14, 165, 233, 0.4);
        }

        /* Logo Specific */
        .logo-capsule {
          padding: 10px 24px;
        }
        .logo-text {
          font-family: "Outfit", sans-serif;
          font-size: 16px;
          font-weight: 800;
          background: linear-gradient(to right, #0ea5e9, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }

        /* Links Specific */
        .links-capsule {
          padding: 4px 6px;
        }
        .lg-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        /* Theme Toggle Specific */
        .action-capsule {
          padding: 0;
          width: 48px;
          height: 48px;
          justify-content: center;
        }
        .theme-toggle-btn {
          background: none;
          border: none;
          color: var(--accent-blue);
          font-size: 22px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .theme-toggle-btn:hover {
          background: rgba(14, 165, 233, 0.1);
          transform: rotate(15deg);
        }

        /* --- Link Styling --- */
        .lg-link {
          display: inline-flex;
          align-items: center;
          padding: 10px 22px;
          border-radius: 100px;
          font-family: "Outfit", sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: var(--text-color);
          text-decoration: none;
          white-space: nowrap;
          transition: all 0.3s ease;
          letter-spacing: 0.02em;
        }

        .lg-link:hover {
          color: var(--accent-blue);
          text-shadow: 0 0 10px rgba(14, 165, 233, 0.3);
        }

        .lg-link.is-active {
          background: var(--accent-blue);
          color: white;
          box-shadow: 0 5px 15px rgba(14, 165, 233, 0.4);
        }

        /* ---- Scrolled State ---- */
        .is-scrolled .nav-capsule {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          transform: perspective(1000px) rotateX(0deg) scale(0.98);
        }

        /* ---- Responsive ---- */
        @media (max-width: 900px) {
          .lg-link { padding: 8px 14px; font-size: 11px; }
          .logo-capsule { padding: 8px 18px; }
        }

        @media (max-width: 768px) {
          .site-header { display: none; }
        }
      `}</style>
    </>
  )
}

export default Navbar