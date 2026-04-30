import heroAnimation from './lottie.json'

const Hero = () => {
  return (
    <section className="container hero-container" id="home">
      <div className="hero-lottie-bg">
        <lottie-player
          src={JSON.stringify(heroAnimation)}
          background="transparent"
          speed="0.8"
          style={{ width: '100%', height: '100%', opacity: 0.15 }}
          loop
          autoplay
        />
      </div>
      <div className="left">
        <h1>Hey There<br />I&apos;m Yash <span>Umretiya</span></h1>
        <p>I am a passionate Full Stack Developer and Designer, creating aesthetic and high-performance digital experiences.</p>
        <button className="sayhi">
          <a href="#contact">Say Hello</a>
        </button>
        <div className="hero-socials">
          <a href="https://github.com/yashumretiya9-cyber" target="_blank" rel="noopener noreferrer" className="hero-social-link"><i className="ri-github-line"></i></a>
          <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer" className="hero-social-link"><i className="ri-linkedin-line"></i></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hero-social-link"><i className="ri-twitter-x-line"></i></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hero-social-link"><i className="ri-instagram-line"></i></a>
        </div>
      </div>
      <div className="right">
        <div className="right-inner">
          <img src="./images/hero-section-portfolio.png" alt="Hero" fetchPriority="high" decoding="async" />
        </div>
      </div>
    </section>
  )
}

export default Hero