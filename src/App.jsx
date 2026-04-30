import { lazy, Suspense, useEffect, useState, useCallback } from 'react'
import Lenis from 'lenis'
import './index.css'

// Above-fold — loaded eagerly
import Navbar        from './components/Navbar'
import StaggeredMenu from './components/StaggeredMenu'
import InteractiveGrid from './components/InteractiveGrid'
import Hero          from './Hero'
import AIAssistant   from './components/AIAssistant'
import ScrollToTop   from './components/ScrollToTop'
// Projects needs eager load — ScrollTrigger pins require accurate DOM layout at mount
import Projects     from './Projects'
// Below-fold — code-split, loaded lazily
const Skills        = lazy(() => import('./Skills'))
const WebsiteCreate = lazy(() => import('./WebsiteCreate'))
const DesignCode    = lazy(() => import('./DesignCode'))
const ThreeBox      = lazy(() => import('./ThreeBox'))
const About         = lazy(() => import('./About'))
const Gallery       = lazy(() => import('./Gallery'))
const LetsWork      = lazy(() => import('./LetsWork'))
const Contact       = lazy(() => import('./Contact'))
const Footer        = lazy(() => import('./components/Footer'))
import IntroReveal  from './components/IntroReveal'

// Minimal fallback — invisible placeholder keeps layout stable
const Blank = () => <div aria-hidden="true" />

const menuItems = [
  { label: 'Home',     ariaLabel: 'Go to home section',     link: '#home' },
  { label: 'Skills',   ariaLabel: 'Go to skills section',   link: '#skills' },
  { label: 'About',    ariaLabel: 'Go to about section',    link: '#about' },
  { label: 'Projects', ariaLabel: 'Go to projects section', link: '#projects' },
  { label: 'Contact',  ariaLabel: 'Get in touch',           link: '#contact' },
]

const socialItems = [
  { label: 'GitHub',   link: 'https://github.com/yashumretiya9-cyber' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/feed/' },
  { label: 'Twitter',  link: 'https://twitter.com' },
]

function App() {
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)   // properly cancel the loop on unmount
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      document.documentElement.style.setProperty('--mouse-x-offset', `${x}px`);
      document.documentElement.style.setProperty('--mouse-y-offset', `${y}px`);
    };
    
    const handleClick = (e) => {
      const target = e.target.closest('.proj-btn, .sayhi, .sm-socials-link, .theme-toggle-btn, .lg-link');
      if (target) {
        const rect = target.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;
        target.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <>
      <IntroReveal />
      <div className="bg-decoration">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
        
        <svg className="tech-lines" width="100%" height="100%">
          <path className="tech-path" d="M0,100 L200,100 L250,150 L500,150 L550,100 L1000,100" />
          <path className="tech-path" d="M100,0 L100,200 L150,250 L150,500 L100,550 L100,1000" />
          <path className="tech-path" d="M1000,300 L800,300 L750,350 L500,350 L450,300 L0,300" />
          <path className="tech-path" d="M900,1000 L900,800 L850,750 L850,500 L900,450 L900,0" />
        </svg>

        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 10 + 's',
              animationDuration: Math.random() * 25 + 15 + 's'
            }}
          ></div>
        ))}
      </div>
      
      <InteractiveGrid />

      {/* Always-visible navigation */}
      <Navbar />
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        colors={['#0ea5e9', '#0284c7']}
        accentColor="#0ea5e9"
        isFixed={true}
      />

      {/* Hero — above fold, eager */}
      <Hero />

      {/* Below-fold lazy — before projects */}
      <Suspense fallback={<Blank />}>
        <Skills />
        <WebsiteCreate />
        <DesignCode />
        <ThreeBox />
        <About />
      </Suspense>

      {/* Projects — eagerly imported, outside Suspense; ScrollTrigger needs stable DOM */}
      <Projects />

      {/* Below-fold lazy — after projects */}
      <Suspense fallback={<Blank />}>
        <Gallery />
        <LetsWork />
        <Contact />
        <Footer />
      </Suspense>

      <AIAssistant />
      <ScrollToTop />
    </>
  )
}

export default App
