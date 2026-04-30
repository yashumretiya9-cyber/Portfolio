import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const COLOR = '#0ea5e9'
const GLOW  = 'rgba(14,165,233,0.75)'

const WebsiteCreate = () => {
  const rowRefs = useRef([])

  const ROWS = [
    { num: '01', title: 'Understand the Goal',    desc: 'Purpose & Target Users'           },
    { num: '02', title: 'Research & Inspiration', desc: 'References & Best Practices'      },
    { num: '03', title: 'Plan Structure',          desc: 'Layout & Responsiveness'          },
    { num: '04', title: 'Design UI',              desc: 'Spacing, Colors & Typography'     },
    { num: '05', title: 'Development',            desc: 'Clean & Scalable Code'            },
    { num: '06', title: 'Test & Optimize',        desc: 'Performance & Accessibility'      },
    { num: '07', title: 'Project Training',       desc: 'Refining Logic & Data Integration' },
    { num: '08', title: 'Evaluation & Testing',   desc: 'Quality Assurance & User Feedback' },
    { num: '09', title: 'Deploy & Improve',       desc: 'Launch & Continuous Updates'      },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row, i) => {
        if (!row) return

        const { glow } = { glow: GLOW }
        const slideBg = row.querySelector('.slide-bg')
        const h4      = row.querySelector('h4')
        const h5      = row.querySelector('h5')
        const h6      = row.querySelector('h6')

        gsap.set(slideBg, { scaleX: 0, transformOrigin: '0% 50%' })

        const onEnter = (e) => {
          const rect     = row.getBoundingClientRect()
          const fromLeft = (e.clientX - rect.left) < rect.width / 2
          gsap.set(slideBg, { transformOrigin: fromLeft ? '0% 50%' : '100% 50%' })

          gsap.timeline({ defaults: { overwrite: 'auto' } })
            .to(slideBg, { scaleX: 1, duration: 0.52, ease: 'power3.out' }, 0)
            .to(h4, { scale: 1.3, y: -4, duration: 0.18, ease: 'power2.out' }, 0)
            .to(h4, { scale: 1,   y: 0,  duration: 0.55, ease: 'elastic.out(1, 0.4)' }, 0.18)
            .to(h4, { color: '#ffffff', textShadow: `0 0 12px ${glow}, 0 0 30px ${glow}`, duration: 0.22, ease: 'none' }, 0)
            .to(h5, { x: 12, letterSpacing: '0.03em', color: '#ffffff', duration: 0.42, ease: 'power3.out' }, 0.04)
            .to(h6, { x: -10, color: 'rgba(255,255,255,0.82)', duration: 0.42, ease: 'power3.out' }, 0.08)
        }

        const onLeave = (e) => {
          const rect      = row.getBoundingClientRect()
          const exitRight = (e.clientX - rect.left) > rect.width / 2
          gsap.set(slideBg, { transformOrigin: exitRight ? '100% 50%' : '0% 50%' })

          gsap.timeline({ defaults: { overwrite: 'auto' } })
            .to(slideBg, { scaleX: 0, duration: 0.42, ease: 'power4.in' }, 0)
            .to(h4, { color: 'var(--secondary-text)', textShadow: 'none', duration: 0.3, ease: 'none' }, 0)
            .to(h5, { x: 0, letterSpacing: '0em', color: 'var(--text-color)', duration: 0.35, ease: 'power3.out' }, 0)
            .to(h6, { x: 0, color: 'var(--secondary-text)', duration: 0.35, ease: 'power3.out' }, 0)
        }

        row.addEventListener('mouseenter', onEnter)
        row.addEventListener('mouseleave', onLeave)
      })
    })

    return () => ctx.revert()
  }, [ROWS.length])

  return (
    <section className="container process-list-section">
      <h2>My Approach</h2>
      <h1>How I Create a Website</h1>
      <div className="process-list">
        {ROWS.map(({ num, title, desc }, i) => (
          <div
            className={`process-row${i === ROWS.length - 1 ? ' last' : ''}`}
            key={num}
            ref={el => rowRefs.current[i] = el}
          >
            <h4>{num}</h4>
            <h5>{title}</h5>
            <h6>{desc}</h6>
            <div className="slide-bg" style={{ backgroundColor: COLOR }} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default WebsiteCreate