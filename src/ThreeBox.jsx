import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const BOXES = [
  { cls: 'box1', label: 'Design',              sub: 'UI',                   color: '#76d0ec', shadow: 'rgba(118,208,236,0.45)' },
  { cls: 'box2', label: 'Coding/Development',  sub: 'Frontend Development', color: '#0ea5e9', shadow: 'rgba(14,165,233,0.45)'    },
  { cls: 'box3', label: 'Coding',              sub: 'Web Development',      color: '#f05e81', shadow: 'rgba(240,94,129,0.45)'   },
]

const ThreeBox = () => {
  const boxRefs = useRef([])

  useEffect(() => {
    const cleanups = []

    boxRefs.current.forEach((box, i) => {
      if (!box) return

      const { color, shadow } = BOXES[i]
      const fill = box.querySelector('.box-fill')
      const h2   = box.querySelector('h2')
      const p    = box.querySelector('p')

      // Init: fill hidden below
      gsap.set(fill, { scaleY: 0, transformOrigin: '50% 100%' })

      const onEnter = () => {
        gsap.timeline({ defaults: { overwrite: 'auto' } })
          // flood color from bottom
          .to(fill, { scaleY: 1, transformOrigin: '50% 100%', duration: 0.45, ease: 'power3.out' }, 0)
          // lift box with colored shadow
          .to(box,  { y: -14, boxShadow: `0 28px 60px ${shadow}`, duration: 0.38, ease: 'power3.out' }, 0)
          // text → white
          .to(h2,   { color: '#ffffff', duration: 0.25, ease: 'none' }, 0.05)
          .to(p,    { color: 'rgba(255,255,255,0.8)', duration: 0.25, ease: 'none' }, 0.08)
      }

      const onLeave = () => {
        gsap.timeline({ defaults: { overwrite: 'auto' } })
          // flood exits upward
          .to(fill, { scaleY: 0, transformOrigin: '50% 0%', duration: 0.38, ease: 'power4.in' }, 0)
          // box back down
          .to(box,  { y: 0, boxShadow: '0 10px 40px 5px rgba(0,0,0,0.05)', duration: 0.38, ease: 'power3.out' }, 0)
          // text back to original
          .to(h2,   { color, duration: 0.28, ease: 'none' }, 0)
          .to(p,    { color: 'var(--secondary-text)', duration: 0.28, ease: 'none' }, 0.04)
      }

      box.addEventListener('mouseenter', onEnter)
      box.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        box.removeEventListener('mouseenter', onEnter)
        box.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => cleanups.forEach(fn => fn())
  }, [])

  return (
    <section className="container threebox-container">
      {BOXES.map(({ cls, label, sub, color }, i) => (
        <div
          key={cls}
          className={`box ${cls}`}
          ref={el => boxRefs.current[i] = el}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          {/* colored flood layer */}
          <div
            className="box-fill"
            style={{
              position: 'absolute', inset: 0,
              background: color,
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
          <h2 style={{ position: 'relative', zIndex: 1, color }}>{label}</h2>
          <p  style={{ position: 'relative', zIndex: 1 }}>{sub}</p>
        </div>
      ))}
    </section>
  )
}

export default ThreeBox