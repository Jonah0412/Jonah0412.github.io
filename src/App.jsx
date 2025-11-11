import { useState } from 'react'
import StaggeredMenu from './StaggeredMenu'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const menuItems = [
    { label: 'Home', link: '/' },
    { label: 'About', link: '/about' },
    { label: 'Portfolio', link: '/portfolio' },
    { label: 'Gallery', link: '/gallery' },
    { label: 'Contact', link: '/contact' },
  ]

  const socialItems = [
    { label: 'Instagram', link: 'https://www.instagram.com/gossip_duck_/', ariaLabel: 'Instagram' },
    { label: 'Behance', link: 'https://www.behance.net/mongjonah', ariaLabel: 'Behance' },
    { label: 'Xiaohongshu', link: 'https://www.xiaohongshu.com/user/profile/65d438b0000000000401cec4', ariaLabel: 'Xiaohongshu' },
  ]

  return (
    <>
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        logoUrl="/image/logo.svg"
        colors={['#B19EEF', '#5227FF', '#1e1e22', '#35353c']}
        menuButtonColor="#fff"
        openMenuButtonColor="#FFD700"
        accentColor="#5227FF"
        changeMenuColorOnOpen={true}
        isFixed={true}
        onMenuOpen={() => setMenuOpen(true)}
        onMenuClose={() => setMenuOpen(false)}
      />
      
      <main className="app-main">
        <section className="hero">
          <div className="hero-content">
            <h1>Digital work that makes an <span>impact</span>.</h1>
            <p>Freelancer & Graphic Designer</p>
            <a href="#portfolio" className="cta-button">VIEW MY WORK</a>
          </div>
        </section>

        <section className="about-preview">
          <h2>About Me</h2>
          <div className="about-content">
            <img src="/image/IMG_0728.JPG" alt="Jonah Mong" />
            <div>
              <h3>Jonah Mong</h3>
              <h4>Freelancer & Graphic Designer</h4>
              <p>I craft digital experiences that merge cutting-edge technology with artistic vision.</p>
              <a href="/about">Learn more about me →</a>
            </div>
          </div>
        </section>

        <section className="featured" id="portfolio">
          <h2>Featured Projects</h2>
          <div className="featured-grid">
            <div className="featured-item">
              <img src="/image/Mong_Foo_Yuen_2300143_GD_Final%20Project_Concept_1.jpg" alt="Digital Art" />
              <h3>Digital Art & Manipulation</h3>
              <p>Digital Imaging</p>
            </div>
            <div className="featured-item">
              <img src="/image/ikf%201.png" alt="Research & Development" />
              <h3>Research & Development</h3>
              <p>Typography</p>
            </div>
            <div className="featured-item">
              <img src="/image/IMG_7709.jpg" alt="Conceptual Photography" />
              <h3>Conceptual Photography</h3>
              <p>Digital Imaging</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to Bring Your Vision to Life?</h2>
          <p>Let's collaborate on creating something extraordinary.</p>
          <a href="/contact" className="cta-button">Start a Project</a>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Gossip Duck Portfolio</p>
        <div className="social-links">
          <a href="https://www.instagram.com/gossip_duck_/">Instagram</a>
          <a href="https://www.behance.net/mongjonah">Behance</a>
        </div>
      </footer>
    </>
  )
}

export default App
