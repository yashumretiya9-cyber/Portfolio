import React from 'react'

const Skills = () => {
  return (
    <section className="container skills-container" id="skills">
      <h2>What I&apos;m good at</h2>
      <h1>Skills &amp; Interests</h1>

      <div className="skills-block">
        <h3>Development</h3>
        <div className="skills-grid">
          <div className="skill-card"><img src="images/html.png" alt="HTML" decoding="async" /><span>HTML</span></div>
          <div className="skill-card"><img src="images/css.webp" alt="CSS" decoding="async" /><span>CSS</span></div>
          <div className="skill-card"><img src="images/js.png" alt="JS" decoding="async" /><span>JavaScript</span></div>
          <div className="skill-card"><img src="images/React.png" alt="React" decoding="async" /><span>React</span></div>
          <div className="skill-card"><img src="images/tailwindcss.png" alt="Tailwind" decoding="async" /><span>Tailwind</span></div>
          <div className="skill-card"><img src="images/node js.png" alt="Node js" decoding="async" /><span>Node js</span></div>
          <div className="skill-card"><img src="images/Expressjs.png" alt="Express js" decoding="async" /><span>Express js</span></div>
          <div className="skill-card"><img src="images/mongodb.svg" alt="MongoDB" decoding="async" /><span>MongoDB</span></div>
        </div>
      </div>

      <div className="skills-block">
        <h3>Designing</h3>
        <div className="skills-grid">
          <div className="skill-card"><img src="images/canvalogo.png" alt="Canva" decoding="async" /><span>Canva</span></div>
          <div className="skill-card"><img src="images/figma.png" alt="Figma" decoding="async" /><span>Figma</span></div>
        </div>
      </div>

      <div className="skills-block">
        <h3>Designing AI</h3>
        <div className="skills-grid">
          <div className="skill-card"><i className="ri-google-fill skill-interest-icon" style={{ color: '#4285F4' }} /><span>Gemini</span></div>
          <div className="skill-card"><img src="images/canvalogo.png" alt="Canva AI" decoding="async" /><span>Canva AI</span></div>
          <div className="skill-card"><i className="ri-openai-fill skill-interest-icon" style={{ color: '#10a37f' }} /><span>ChatGPT</span></div>
        </div>
      </div>

      <div className="skills-block">
        <h3>Tools</h3>
        <div className="skills-grid">
          <div className="skill-card"><img src="images/vscodelogo.png" alt="VS Code" decoding="async" /><span>VS Code</span></div>
          <div className="skill-card"><img src="images/github.png" alt="GitHub" decoding="async" /><span>GitHub</span></div>
          <div className="skill-card"><img src="images/vercellogo.png" alt="Vercel" decoding="async" /><span>Vercel</span></div>
        </div>
      </div>

      <div className="skills-block">
        <h3>Tools AI</h3>
        <div className="skills-grid">
          <div className="skill-card"><i className="ri-rocket-2-line skill-interest-icon" style={{ color: '#0ea5e9' }} /><span>Antigravity</span></div>
          <div className="skill-card"><i className="ri-terminal-box-line skill-interest-icon" style={{ color: '#6366f1' }} /><span>Trae</span></div>
          <div className="skill-card"><i className="ri-cursor-line skill-interest-icon" style={{ color: '#3b82f6' }} /><span>Cursor</span></div>
        </div>
      </div>

      <div className="skills-block">
        <h3>Interests</h3>
        <div className="skills-grid">
          <div className="skill-card"><i className="ri-movie-2-line skill-interest-icon" /><p>Web Animation</p></div>
          <div className="skill-card"><i className="ri-layout-masonry-line skill-interest-icon" /><p>UI Research</p></div>
          <div className="skill-card"><i className="ri-robot-2-line skill-interest-icon" /><p>AI Tools</p></div>
          <div className="skill-card"><i className="ri-code-s-slash-line skill-interest-icon" /><p>Creative Coding</p></div>
          <div className="skill-card"><i className="ri-line-chart-line skill-interest-icon" /><p>Tech Trends</p></div>
          <div className="skill-card"><i className="ri-pen-nib-line skill-interest-icon" /><p>Clean Design</p></div>
        </div>
      </div>
    </section>
  )
}

export default Skills