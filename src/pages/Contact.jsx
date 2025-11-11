import { useState } from 'react'
import '../styles/Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <main className="contact-main">
      <section className="contact-hero">
        <h1>Get In Touch</h1>
        <p>Let's discuss your next project</p>
      </section>

      <section className="contact-content">
        <div className="contact-container">
          <div className="contact-info">
            <h2>Let's Connect</h2>
            <p>
              Have a project in mind? I'd love to hear about it. 
              Feel free to reach out via email or social media.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <h4>Email</h4>
                <a href="mailto:contact@example.com">contact@example.com</a>
              </div>

              <div className="contact-item">
                <h4>Social</h4>
                <div className="social-links-contact">
                  <a href="https://www.instagram.com/gossip_duck_/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i> Instagram
                  </a>
                  <a href="https://www.behance.net/mongjonah" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-behance"></i> Behance
                  </a>
                  <a href="https://www.xiaohongshu.com/user/profile/65d438b0000000000401cec4" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-bookmark"></i> Xiaohongshu
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <h4>Location</h4>
                <p>Canada</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Project subject"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell me about your project..."
                rows="6"
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </section>
    </main>
  )
}
