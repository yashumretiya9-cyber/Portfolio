import React from 'react'
import Masonry from './components/Masonry'

const items = [
  { id: '1', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format&fit=crop&q=80', url: '#', height: 500 },
  { id: '2', img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80', url: '#', height: 360 },
  { id: '3', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80', url: '#', height: 480 },
  { id: '4', img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop&q=80', url: '#', height: 320 },
  { id: '5', img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&auto=format&fit=crop&q=80', url: '#', height: 420 },
  { id: '6', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80', url: '#', height: 300 },
  { id: '7', img: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&auto=format&fit=crop&q=80', url: '#', height: 440 },
  { id: '8', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80', url: '#', height: 350 },
]

const Gallery = () => {
  return (
    <section className="gallery-section" id="gallery">

      {/* Heading — same class & pattern used across all portfolio sections */}
      <div className="container projects-section">
        <h2>Creative Moments</h2>
        <h1>Behind the Work</h1>
      </div>

      {/* Masonry grid */}
      <div className="gallery-grid-wrap container">
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.06}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.97}
          blurToFocus={true}
          colorShiftOnHover={true}
        />
      </div>

      <style>{`
        .gallery-section {
          margin: 0 auto;
          padding-bottom: 8vh;
        }
        .gallery-grid-wrap {
          padding: 0 3vw;
        }
        @media (max-width: 768px) {
          .gallery-section { padding-bottom: 5vh; }
        }
      `}</style>
    </section>
  )
}

export default Gallery
