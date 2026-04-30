import React, { useState, useRef } from 'react'

const DesignCode = () => {
  const [active, setActive] = useState('design')
  const [prevTab, setPrevTab] = useState(null)
  const [animClass, setAnimClass] = useState({ design: 'active', code: 'right-pos' })

  const handleTab = (tab) => {
    if (tab === active) return
    const comingFromRight = tab === 'code'

    // exit current
    setAnimClass(prev => ({
      ...prev,
      [active]: comingFromRight ? 'leave-left' : 'leave-right',
    }))

    setTimeout(() => {
      setAnimClass({
        design: tab === 'design' ? 'active enter-from-left' : 'right-pos',
        code: tab === 'code' ? 'active enter-from-right' : 'left-pos',
      })
      setActive(tab)
    }, 260)
  }

  const isCodeActive = active === 'code'

  return (
    <section className="container toggle-section">
      <div className={`toggle-buttons${isCodeActive ? ' code-active' : ''}`}>
        <button
          className={`tab-btn ds${active === 'design' ? ' active' : ''}`}
          onClick={() => handleTab('design')}
        >
          Design 🎨
        </button>
        <button
          className={`tab-btn cd${active === 'code' ? ' active' : ''}`}
          onClick={() => handleTab('code')}
        >
          Code&nbsp; <span>&lt;/&gt;</span>
        </button>
        <span className="slider-indicator"></span>
      </div>

      <div className="toggle-stage">
        <div className={`toggle-content ${animClass.design}`} id="design">
          <h1>I love building intuitive and <span className="script-text">Elegant</span> designs.</h1>
          <p>UI focused designs using Canva with clean modern layouts.</p>
        </div>
        <div className={`toggle-content ${animClass.code}`} id="code">
          <h1>I love to code<span className="script-text"> Web </span>apps.</h1>
          <p>High performance websites using HTML, CSS, JavaScript &amp; React.</p>
        </div>
      </div>
    </section>
  )
}

export default DesignCode