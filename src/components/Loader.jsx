import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Loader = ({ onComplete }) => {
  const topRef     = useRef(null)
  const botRef     = useRef(null)
  const contentRef = useRef(null)
  const counterRef = useRef(null)
  const lineRef    = useRef(null)

  useEffect(() => {
    // Lock scroll while loading
    document.body.style.overflow = 'hidden'

    const obj = { val: 0 }

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        onComplete?.()
      },
    })

    tl
      // ── count 0 → 100 ──
      .to(obj, {
        val: 100,
        duration: 2.0,
        ease: 'power2.inOut',
        onUpdate() {
          const v = Math.round(obj.val)
          if (counterRef.current) counterRef.current.textContent = v
          if (lineRef.current)    lineRef.current.style.width    = v + '%'
        },
      })
      // brief hold at 100
      .to({}, { duration: 0.25 })
      // content fades out
      .to(contentRef.current, { opacity: 0, y: -16, duration: 0.35, ease: 'power2.in' })
      // ── split: top goes up, bottom goes down ──
      .to(topRef.current, { y: '-100%', duration: 0.85, ease: 'power4.inOut' }, '-=0.1')
      .to(botRef.current, { y: '100%',  duration: 0.85, ease: 'power4.inOut' }, '<')

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [onComplete])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      pointerEvents: 'all',
    }}>
      {/* ── top half panel ── */}
      <div ref={topRef} style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '50%',
        background: '#ffffff',
      }} />

      {/* ── bottom half panel ── */}
      <div ref={botRef} style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '50%',
        background: '#ffffff',
      }} />

      {/* ── counter + line ── */}
      <div ref={contentRef} style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
        gap: 0,
      }}>
        {/* big counter */}
        <span ref={counterRef} style={{
          fontFamily: '"Montserrat", sans-serif',
          fontSize: 'clamp(90px, 14vw, 200px)',
          fontWeight: 800,
          color: '#111',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          display: 'block',
        }}>0</span>

        {/* thin progress track */}
        <div style={{
          width: 'min(45vw, 500px)',
          height: 2,
          background: '#e8e8e8',
          marginTop: 28,
          borderRadius: 2,
          overflow: 'hidden',
        }}>
          <div ref={lineRef} style={{
            height: '100%',
            width: '0%',
            background: '#0ea5e9',
            borderRadius: 2,
          }} />
        </div>

        {/* label */}
        <p style={{
          fontFamily: '"Montserrat", sans-serif',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.22em',
          color: '#bbb',
          textTransform: 'uppercase',
          marginTop: 18,
        }}>Yash&apos;s Portfolio</p>
      </div>
    </div>
  )
}

export default Loader
