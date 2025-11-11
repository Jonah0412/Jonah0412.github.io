import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StaggeredMenu from './StaggeredMenu'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
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
    { label: 'Instagram', link: 'https://www.instagram.com/gossip_duck_/' },
    { label: 'Behance', link: 'https://www.behance.net/mongjonah' },
    { label: 'Xiaohongshu', link: 'https://www.xiaohongshu.com/user/profile/65d438b0000000000401cec4' },
  ]

  return (
    <Router>
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
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App
