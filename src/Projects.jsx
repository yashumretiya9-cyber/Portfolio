import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    img: 'images/Sweetora.png',
    title: 'Cloth Store', subtitle: 'E-Commerce Cloth Selling',
    tags: ['React', 'Tailwind CSS', 'Express.js', 'Node.js'],
    year: '2024', role: 'Full Stack Developer',
    github: 'https://github.com/yashumretiya9-cyber/E-Commerce---project', color: '#f05e81',
    cs: {
      overview: 'Cloth Store is a premium full-stack e-commerce platform designed for modern fashion enthusiasts to discover, filter, and purchase the latest clothing trends with a seamless shopping experience.',
      challenge: 'The fashion market is highly competitive, requiring a platform that not only looks visually stunning but also provides lightning-fast performance and an intuitive filtering system for sizes, colors, and categories.',
      solution: 'Developed a high-performance React application with a robust state management system for the cart and inventory. Built a custom Express.js REST API to handle secure transactions and real-time stock updates.',
      stats: [{ value: '10+', label: 'API Endpoints' }, { value: '100%', label: 'Responsive' }, { value: '3', label: 'Core Modules' }, { value: '3x', label: 'Faster Load' }],
      results: ['Seamless mobile-first shopping experience', 'Integrated secure payment simulation', 'Dynamic product filtering and search', 'Fully automated inventory management'],
    },
  },
  {
    id: 2,
    img: 'images/Task.png',
    title: 'TaskFlow', subtitle: 'Task Management System',
    tags: ['Angular', 'Node.js', 'Express.js', 'MongoDB'],
    year: '2023', role: 'Full Stack Developer',
    github: 'https://github.com/yashumretiya9-cyber/TMS-Angular-Project', color: '#76d0ec',
    cs: {
      overview: 'TaskFlow is a powerful MEAN stack application designed to help teams and individuals track productivity, manage deadlines, and organize complex projects in real-time.',
      challenge: 'Users often struggle with cluttered interfaces and slow synchronization when managing multiple tasks. The goal was to build a high-performance system that handles complex states and real-time updates seamlessly.',
      solution: 'Leveraged Angular for a dynamic, reactive frontend and combined it with a robust Node.js/Express backend. Integrated MongoDB for flexible task storage and implemented JWT-based authentication for secure data access.',
      stats: [{ value: '15+', label: 'API Endpoints' }, { value: 'MEAN', label: 'Stack' }, { value: 'Real-time', label: 'Updates' }, { value: 'Secure', label: 'Auth' }],
      results: ['Instant task state synchronization', 'Drag-and-drop task prioritization', 'Advanced filtering by category & deadline', 'Scalable architecture for high user load'],
    },
  },
  {
    id: 3,
    img: 'images/portfolio.png',
    title: 'Portfolio', subtitle: 'Personal Website',
    tags: ['React', 'CSS', 'Vite', 'Web3Forms'],
    year: '2025', role: 'Designer & Developer',
    github: '#', color: '#0ea5e9',
    cs: {
      overview: 'A premium personal portfolio built with React + Vite, featuring smooth scroll animations, a toggle design/code section, floating social icons, and a live contact form.',
      challenge: 'Existing portfolio templates felt generic and lifeless. Needed something that truly reflected personal brand — with micro-animations, a unique layout, and interactive sections without heavy libraries.',
      solution: 'Built from scratch in React + Tailwind CSS with GSAP animations, custom toggle slider, scrollytelling project panels, and Web3Forms for a serverless contact form.',
      stats: [{ value: '1', label: 'CSS Framework' }, { value: '8+', label: 'Sections' }, { value: '100%', label: 'Responsive' }, { value: '60fps', label: 'Animations' }],
      results: ['React + Tailwind CSS component architecture', 'Web3Forms contact integration (no backend)', 'Scroll animations & hover effects', 'Deployed on github pages'],
    },
  },
]

/* ── Coming Soon Modal ── */
const GithubModal = ({ color, onClose }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { scale: 0.7, opacity: 0, y: 30, rotateX: 20 },
      { scale: 1, opacity: 1, y: 0, rotateX: 0, duration: 0.5, ease: 'back.out(1.5)' }
    )
    const t = setTimeout(() => handleClose(), 3500)
    return () => clearTimeout(t)
  }, [])

  const handleClose = () => {
    gsap.to(cardRef.current, {
      scale: 0.9, opacity: 0, y: 20,
      duration: 0.3, ease: 'power2.in',
      onComplete: onClose,
    })
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9998,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)',
      perspective: '1000px'
    }} onClick={handleClose}>
      <div ref={cardRef} onClick={e => e.stopPropagation()} style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 28,
        padding: '50px 60px',
        textAlign: 'center',
        fontFamily: '"Outfit", sans-serif',
        boxShadow: `0 40px 100px rgba(0,0,0,0.3), 0 0 40px ${color}20`,
        position: 'relative',
        maxWidth: '400px',
        width: '90%'
      }}>
        {/* close */}
        <button onClick={handleClose} style={{
          position: 'absolute', top: 20, right: 20,
          background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%',
          width: 32, height: 32, cursor: 'pointer', fontSize: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)',
          transition: 'all 0.3s ease'
        }}>✕</button>

        {/* icon */}
        <div style={{
          width: 70, height: 70, borderRadius: '24px',
          background: `${color}15`, border: `1px solid ${color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 25px', fontSize: 32,
          transform: 'rotate(-5deg)',
          boxShadow: `0 15px 30px ${color}20`
        }}>
          <i className="ri-git-repository-private-line" style={{ color }} />
        </div>

        {/* text */}
        <h3 style={{ fontSize: 28, fontWeight: 800, color: 'white', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
          Repo Private
        </h3>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
          This repository is currently private and will be public soon.
        </p>

        {/* decorative line */}
        <div style={{ width: 40, height: 2, background: color, margin: '25px auto 0', borderRadius: 2, opacity: 0.5 }}></div>
      </div>
    </div>
  )
}

const Projects = () => {
  const wrapperRef  = useRef(null)
  const [modal, setModal] = useState(null) // { color } when open

  useEffect(() => {
    const ctx = gsap.context(() => {
      // No more sticky stacking — just a normal clean list
      const panels = gsap.utils.toArray('.proj-slide')
      panels.forEach((panel) => {
        gsap.fromTo(panel, 
          { y: 50, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }, wrapperRef)

    // Recalculate pin positions after lazy siblings above have mounted & painted
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150)

    return () => {
      clearTimeout(refreshTimer)
      ctx.revert()
    }
  }, [])

  return (
    <>
      <section className="container projects-section" id="projects">
        <h2>Things I&apos;ve Built</h2>
        <h1>My Works</h1>
      </section>

      <div className="proj-slides-wrapper" ref={wrapperRef}>
        {projects.map((p, i) => (
          <article className="proj-slide" key={p.id} style={{ '--pa': p.color }}>
            <div className="proj-inner">

              {/* ── LEFT ── */}
              <div className="proj-left">
                <span className="proj-num">0{i + 1}</span>
                <img src={p.img} alt={p.title} className="proj-img" decoding="async" />
                <div className="proj-left-body">
                  <h3 className="proj-title">{p.title}</h3>
                  <p className="proj-subtitle">{p.subtitle}</p>
                  <div className="proj-tags">
                    {p.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}
                  </div>
                  <div className="proj-meta-row">
                    <span>{p.year}</span>
                    <span className="proj-meta-sep">·</span>
                    <span>{p.role}</span>
                  </div>
                  <div className="proj-btns">
                    <button
                      className="proj-btn proj-btn-solid"
                      onClick={() => p.github !== '#' ? window.open(p.github, '_blank') : setModal({ color: p.color })}
                    >
                      GitHub Repo
                    </button>
                  </div>
                </div>
              </div>

              {/* ── RIGHT ── */}
              <div className="proj-right">
                <div className="proj-cs-main-heading">Case Study</div>
                {[
                  { num: '01', label: 'Overview', content: p.cs.overview },
                  { num: '02', label: 'Challenge', content: p.cs.challenge },
                  { num: '03', label: 'Solution',  content: p.cs.solution  },
                ].map(({ num, label, content }) => (
                  <div className="proj-cs-block" key={label}>
                    <div className="proj-cs-label">
                      <span className="proj-cs-num">{num}</span>
                      <span className="proj-cs-heading">{label}</span>
                    </div>
                    <p className="proj-cs-text">{content}</p>
                  </div>
                ))}

                {/* Stats */}
                <div className="proj-stats">
                  {p.cs.stats.map((s, si) => (
                    <div key={si} className="proj-stat">
                      <strong>{s.value}</strong>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Results */}
                <div className="proj-cs-block">
                  <div className="proj-cs-label">
                    <span className="proj-cs-num">04</span>
                    <span className="proj-cs-heading">Results</span>
                  </div>
                  <div className="proj-results">
                    {p.cs.results.map((r, ri) => (
                      <div key={ri} className="proj-result-item">
                        <span className="proj-dot" />
                        <p>{r}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </article>
        ))}
      </div>

      <style>{`
        /* ─── Wrapper ─── */
        .proj-slides-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 3vw 6rem;
        }

        /* ─── Slide ─── */
        .proj-slide {
          width: 100%;
          min-height: 520px;
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 80px;
          will-change: transform, opacity;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        
        .proj-slide:hover {
          border-color: var(--pa);
          box-shadow: 0 30px 80px rgba(0,0,0,0.12), 0 0 30px color-mix(in srgb, var(--pa) 20%, transparent);
        }

        /* ─── Inner grid ─── */
        .proj-inner {
          display: grid;
          grid-template-columns: 42% 58%;
          min-height: 520px;
        }

        /* ─── LEFT ─── */
        .proj-left {
          background: rgba(255, 255, 255, 0.03);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          padding: 3.5rem 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
          overflow: hidden;
          justify-content: center;
        }
        
        .proj-num {
          position: absolute;
          top: -1rem; left: 0.5rem;
          font-size: 10rem;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.03);
          font-family: "Outfit", sans-serif;
          letter-spacing: -0.04em;
          line-height: 1;
          user-select: none;
          z-index: 0;
        }

        .proj-img {
          width: 100%;
          height: 260px;
          object-fit: contain;
          border-radius: 20px;
          transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
          filter: drop-shadow(0 15px 30px rgba(0,0,0,0.2));
          z-index: 1;
        }
        
        .proj-slide:hover .proj-img {
          transform: scale(1.08) translateY(-10px) rotate(1deg);
        }

        .proj-left-body {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
          z-index: 1;
        }

        .proj-title {
          font-size: 32px;
          font-weight: 800;
          color: var(--text-color);
          margin: 0;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }

        .proj-subtitle {
          font-size: 16px;
          color: var(--secondary-text);
          margin: 0;
          font-weight: 500;
        }

        .proj-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 5px;
        }

        .proj-tag {
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          background: color-mix(in srgb, var(--pa) 10%, transparent);
          color: var(--pa);
          border: 1px solid color-mix(in srgb, var(--pa) 20%, transparent);
          transition: all 0.3s ease;
        }
        
        .proj-tag:hover {
          background: var(--pa);
          color: white;
        }

        .proj-meta-row {
          font-size: 13px;
          font-weight: 600;
          color: var(--secondary-text);
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0.8;
        }
        
        .proj-meta-sep { color: rgba(255, 255, 255, 0.1); }

        /* ─── Buttons ─── */
        .proj-btns {
          display: flex;
          gap: 15px;
          margin-top: 1rem;
        }

        .proj-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 28px;
          border-radius: 100px;
          border: none;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          letter-spacing: 0.02em;
        }

        .proj-btn-solid {
          background: var(--pa);
          color: white;
          box-shadow: 0 10px 25px -5px color-mix(in srgb, var(--pa) 40%, transparent);
        }
        
        .proj-btn-solid:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 35px -10px color-mix(in srgb, var(--pa) 60%, transparent);
        }

        /* ─── RIGHT ─── */
        .proj-right {
          padding: 3.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
          background: rgba(255, 255, 255, 0.01);
        }

        .proj-cs-main-heading {
          font-size: 14px;
          font-weight: 800;
          color: var(--pa);
          text-transform: uppercase;
          letter-spacing: 0.3em;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .proj-cs-main-heading::after {
          content: "";
          height: 1px;
          flex: 1;
          background: linear-gradient(90deg, var(--pa), transparent);
          opacity: 0.3;
        }

        .proj-cs-block {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .proj-cs-label {
          display: flex;
          align-items: baseline;
          gap: 12px;
        }

        .proj-cs-num {
          font-size: 12px;
          font-weight: 900;
          color: var(--pa);
          opacity: 0.5;
        }

        .proj-cs-heading {
          font-size: 18px;
          font-weight: 800;
          color: var(--text-color);
          letter-spacing: -0.02em;
        }

        .proj-cs-text {
          font-size: 15px;
          color: var(--secondary-text);
          line-height: 1.8;
          margin: 0;
          opacity: 0.9;
        }

        /* ─── Stats ─── */
        .proj-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          margin: 1rem 0;
        }

        .proj-stat {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 18px 15px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }
        
        .proj-stat:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: var(--pa);
          transform: translateY(-5px);
        }

        .proj-stat strong {
          font-size: 22px;
          font-weight: 800;
          color: var(--pa);
          letter-spacing: -0.02em;
        }

        .proj-stat span {
          font-size: 11px;
          color: var(--secondary-text);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* ─── Results ─── */
        .proj-results {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px 24px;
        }

        .proj-result-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .proj-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--pa);
          box-shadow: 0 0 12px var(--pa);
        }

        .proj-result-item p {
          font-size: 14.5px;
          color: var(--secondary-text);
          margin: 0;
          font-weight: 500;
        }

        /* ─── Mobile ─── */
        @media (max-width: 968px) {
          .proj-inner { grid-template-columns: 1fr; }
          .proj-left { border-right: none; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
          .proj-right { padding: 2.5rem 1.5rem; }
          .proj-stats { grid-template-columns: repeat(2, 1fr); }
          .proj-results { grid-template-columns: 1fr; }
          .proj-slide { border-radius: 24px; }
        }
      `}</style>
      {/* Coming Soon Modal */}
      {modal && <GithubModal color={modal.color} onClose={() => setModal(null)} />}
    </>
  )
}

export default Projects