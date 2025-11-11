import '../styles/About.css'

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: 'Digital Art & Manipulation',
      category: 'Digital Imaging',
      image: '/image/Mong_Foo_Yuen_2300143_GD_Final%20Project_Concept_1.jpg',
      description: 'Creative digital art and photo manipulation using Adobe Photoshop.',
      pdf: '/pdf/digital-art-manipulation.pdf'
    },
    {
      id: 2,
      title: 'Research & Development',
      category: 'Typography',
      image: '/image/ikf%201.png',
      description: 'Typography research and design exploration.',
      pdf: '/pdf/research-and-development.pdf'
    },
    {
      id: 3,
      title: 'Conceptual Photography',
      category: 'Digital Imaging',
      image: '/image/IMG_7709.jpg',
      description: 'Conceptual photography series exploring themes and emotions.',
      pdf: '/pdf/conceptual-photography.pdf'
    },
    {
      id: 4,
      title: 'Layout Components',
      category: 'Fundamentals Of Layout Design',
      image: '/image/kaws.png',
      description: 'Layout design fundamentals and component systems.',
      pdf: '/pdf/layout-components.pdf'
    },
    {
      id: 5,
      title: 'Commercial Photography - Food',
      category: 'Digital Imaging',
      image: '/image/FINAL.jpg',
      description: 'Professional commercial food photography and styling.',
      pdf: '/pdf/commercial-photography-food.pdf'
    },
    {
      id: 6,
      title: 'Commercial Photography - Still Life',
      category: 'Digital Imaging',
      image: '/image/ikf%201.png',
      description: 'Still life product photography and composition.',
      pdf: '/pdf/commercial-photography-still-life.pdf'
    }
  ]

  return (
    <main className="portfolio-main">
      <section className="portfolio-hero">
        <h1>Portfolio</h1>
        <p>A collection of my recent work and projects</p>
      </section>

      <section className="portfolio-content">
        <div className="portfolio-grid">
          {projects.map((project) => (
            <div key={project.id} className="portfolio-card">
              <div className="portfolio-image">
                <img src={project.image} alt={project.title} />
                <div className="portfolio-overlay">
                  <a href={project.pdf} target="_blank" rel="noopener noreferrer" className="view-btn">
                    View Project
                  </a>
                </div>
              </div>
              <div className="portfolio-info">
                <h3>{project.title}</h3>
                <p className="category">{project.category}</p>
                <p className="description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
