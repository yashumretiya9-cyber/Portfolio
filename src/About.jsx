import React from 'react'

const About = () => {
  return (
    <section className="container new-about-section" id="about">
      <h2>Just Ordinary</h2>
      <h1>About Me</h1>
      <h2>section who loves the web</h2>
      <div className="about-card">
        <div className="about-image">
          <img src="images/abouttemp.png" alt="About" decoding="async" />
        </div>
        <div className="about-content">
          <h2>Turning ideas into reality.</h2>
          <p>
            My development approach combines modern frontend technologies with best coding practices to create
            fast, scalable, and maintainable web experiences.
            From structuring efficient layouts to implementing smooth interactions, I ensure every component is
            optimized for both performance and user satisfaction
            from the first line of code to the final user interaction{' '}
            <strong>with precision, passion, and purpose.</strong> I specialize in building visually clean,
            high-performance, and fully responsive user interfaces with
            a strong focus on usability and accessibility.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About