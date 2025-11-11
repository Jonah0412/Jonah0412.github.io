import { Link } from 'react-router-dom'
import '../styles/About.css'

export default function About() {
  return (
    <main className="about-main">
      <section className="about-hero">
        <h1>About Me</h1>
        <p>Freelancer & Graphic Designer</p>
      </section>

      <section className="about-content">
        <div className="about-container">
          <div className="about-intro">
            <h2>Hi, I'm Jonah Mong</h2>
            <p>
              I'm a passionate freelancer and graphic designer based in Canada. 
              With a strong background in digital art, photography, and UI/UX design, 
              I create compelling visual experiences that tell stories and engage audiences.
            </p>
            <p>
              My work spans from digital imaging and photography to typography and interactive design. 
              I believe in combining technical skills with creative vision to produce work that not only 
              looks beautiful but also serves a purpose.
            </p>
          </div>

          <div className="skills-section">
            <h3>Skills & Expertise</h3>
            <div className="skills-grid">
              <div className="skill-card">
                <h4>Design</h4>
                <ul>
                  <li>UI/UX Design</li>
                  <li>Graphic Design</li>
                  <li>Typography</li>
                  <li>Layout Design</li>
                </ul>
              </div>
              <div className="skill-card">
                <h4>Tools</h4>
                <ul>
                  <li>Adobe Photoshop</li>
                  <li>Adobe Illustrator</li>
                  <li>Adobe InDesign</li>
                  <li>Figma</li>
                </ul>
              </div>
              <div className="skill-card">
                <h4>Photography</h4>
                <ul>
                  <li>Digital Imaging</li>
                  <li>Photo Manipulation</li>
                  <li>Commercial Photography</li>
                  <li>Conceptual Photography</li>
                </ul>
              </div>
              <div className="skill-card">
                <h4>Development</h4>
                <ul>
                  <li>Web Design</li>
                  <li>Interactive Design</li>
                  <li>Animation</li>
                  <li>Video Editing</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="experience-section">
            <h3>Experience</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Freelance Designer & Developer</h4>
                  <p className="timeline-date">2022 - Present</p>
                  <p>Working with clients worldwide to create digital experiences, branding, and visual content.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Graphic Design Student</h4>
                  <p className="timeline-date">2020 - 2023</p>
                  <p>Studied design fundamentals, digital imaging, and creative problem-solving.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <h2>Let's Work Together</h2>
        <p>I'm always interested in hearing about new projects and opportunities.</p>
        <Link to="/contact" className="cta-button">Get In Touch</Link>
      </section>
    </main>
  )
}
