import { Link } from 'react-router-dom'
import '../styles/Home.css'

export default function Home() {
  const projects = [
    {
      id: 1,
      title: 'Digital Art & Manipulation',
      category: 'Digital Imaging',
      image: '/image/Mong_Foo_Yuen_2300143_GD_Final%20Project_Concept_1.jpg',
      link: '/portfolio'
    },
    {
      id: 2,
      title: 'Research & Development',
      category: 'Typography',
      image: '/image/ikf%201.png',
      link: '/portfolio'
    },
    {
      id: 3,
      title: 'Conceptual Photography',
      category: 'Digital Imaging',
      image: '/image/IMG_7709.jpg',
      link: '/portfolio'
    },
    {
      id: 4,
      title: 'Layout Components',
      category: 'Fundamentals Of Layout Design',
      image: '/image/kaws.png',
      link: '/portfolio'
    },
    {
      id: 5,
      title: 'Commercial Photography - Food',
      category: 'Digital Imaging',
      image: '/image/FINAL.jpg',
      link: '/portfolio'
    }
  ]

  return (
    <main className="home-main">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="animated-gradient"></div>
          <div className="floating-elements">
            <div className="element e1"></div>
            <div className="element e2"></div>
            <div className="element e3"></div>
          </div>
        </div>

        <div className="hero-content">
          <div className="title-container">
            <h1 className="hero-title">
              Digital work that makes an <span className="gradient-text">impact</span>.
            </h1>
            <p className="hero-tagline">Freelancer & Graphic Designer</p>
            <div className="hero-cta">
              <Link to="/portfolio" className="cta-button">
                VIEW MY WORK
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="about-preview">
        <div className="section-title-container">
          <h2 className="section-title">About Me</h2>
          <div className="title-decoration"></div>
        </div>

        <div className="about-preview-content">
          <div className="about-preview-image">
            <div className="image-frame">
              <img src="/image/IMG_0728.JPG" alt="Jonah Mong" />
              <div className="image-effect"></div>
            </div>
          </div>
          <div className="about-preview-text">
            <h3>Jonah Mong</h3>
            <h4>Freelancer & Graphic Designer</h4>
            <p>
              I craft digital experiences that merge cutting-edge technology with artistic vision. 
              My work spans UI/UX design, interactive development, and immersive digital art installations.
            </p>

            <div className="about-buttons">
              <Link to="/about" className="about-link">
                Learn more about me <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

            <div className="skill-highlights">
              <span>Video Editor</span>
              <span>Freelancer</span>
              <span>Photographer</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="featured">
        <div className="section-title-container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="title-decoration"></div>
        </div>

        <div className="featured-carousel">
          <div className="featured-carousel-track">
            {projects.map((project) => (
              <div key={project.id} className="featured-item" data-color={['#7000ff', '#00eeff', '#e100ff', '#ffc107', '#3f51b5'][project.id - 1]}>
                <div className="featured-img">
                  <img src={project.image} alt={project.title} className="featured-background" />
                  <div className="featured-hover">
                    <div className="featured-hover-content">
                      <div className="featured-icon">
                        <i className="fas fa-eye"></i>
                      </div>
                      <Link to={project.link}>View Project</Link>
                    </div>
                  </div>
                </div>
                <div className="featured-content">
                  <h3>{project.title}</h3>
                  <p>{project.category}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-controls">
            <button className="carousel-btn prev-btn">
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="carousel-dots">
              {projects.map((_, idx) => (
                <span key={idx} className={`dot ${idx === 0 ? 'active' : ''}`}></span>
              ))}
            </div>
            <button className="carousel-btn next-btn">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2>
              Ready to Bring Your <span className="gradient-text">Vision to Life?</span>
            </h2>
            <p>Let's collaborate on creating something extraordinary that captures attention and drives engagement.</p>
            <Link to="/contact" className="cta-button">
              <span>Start a Project</span>
              <i className="fas fa-rocket"></i>
            </Link>
          </div>
          <div className="cta-decoration">
            <div className="cta-shape shape1"></div>
            <div className="cta-shape shape2"></div>
            <div className="cta-shape shape3"></div>
          </div>
        </div>
      </section>
    </main>
  )
}
