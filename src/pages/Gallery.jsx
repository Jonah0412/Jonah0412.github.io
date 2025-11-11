import '../styles/Gallery.css'

export default function Gallery() {
  const images = [
    { id: 1, src: '/image/IMG_0728.JPG', alt: 'Gallery Image 1' },
    { id: 2, src: '/image/Mong_Foo_Yuen_2300143_GD_Final%20Project_Concept_1.jpg', alt: 'Gallery Image 2' },
    { id: 3, src: '/image/ikf%201.png', alt: 'Gallery Image 3' },
    { id: 4, src: '/image/IMG_7709.jpg', alt: 'Gallery Image 4' },
    { id: 5, src: '/image/kaws.png', alt: 'Gallery Image 5' },
    { id: 6, src: '/image/FINAL.jpg', alt: 'Gallery Image 6' },
  ]

  return (
    <main className="gallery-main">
      <section className="gallery-hero">
        <h1>Gallery</h1>
        <p>Visual collection of my creative work</p>
      </section>

      <section className="gallery-content">
        <div className="gallery-grid">
          {images.map((image) => (
            <div key={image.id} className="gallery-item">
              <img src={image.src} alt={image.alt} />
              <div className="gallery-overlay"></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
