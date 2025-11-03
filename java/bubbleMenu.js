// BubbleMenu - Vanilla JavaScript port of React component
// Dependencies: GSAP library

const DEFAULT_MENU_ITEMS = [
  {
    label: 'home',
    href: 'index.html',
    ariaLabel: 'Home',
    rotation: -8,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    hoverGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    hoverStyles: { textColor: '#ffffff' }
  },
  {
    label: 'about',
    href: 'about.html',
    ariaLabel: 'About',
    rotation: 8,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    hoverGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    hoverStyles: { textColor: '#ffffff' }
  },
  {
    label: 'portfolio',
    href: 'portfolio.html',
    ariaLabel: 'Portfolio',
    rotation: 8,
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    hoverGradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    hoverStyles: { textColor: '#ffffff' }
  },
  {
    label: 'gallery',
    href: 'gallery.html',
    ariaLabel: 'Gallery',
    rotation: 8,
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    hoverGradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    hoverStyles: { textColor: '#ffffff' }
  },
  {
    label: 'contact',
    href: 'contact.html',
    ariaLabel: 'Contact',
    rotation: -8,
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    hoverGradient: 'linear-gradient(135deg, #ff8a80 0%, #ea4c89 100%)',
    hoverStyles: { textColor: '#ffffff' }
  }
];

class BubbleMenu {
  constructor(options = {}) {
    this.options = {
      logo: options.logo || '../image/logo.svg',
      onMenuClick: options.onMenuClick || null,
      className: options.className || '',
      style: options.style || {},
      menuAriaLabel: options.menuAriaLabel || 'Toggle menu',
      menuBg: options.menuBg || '#fff',
      menuContentColor: options.menuContentColor || '#111',
      useFixedPosition: options.useFixedPosition !== undefined ? options.useFixedPosition : true,
      items: options.items || DEFAULT_MENU_ITEMS,
      animationEase: options.animationEase || 'back.out(1.5)',
      animationDuration: options.animationDuration || 0.5,
      staggerDelay: options.staggerDelay || 0.12
    };
    
    this.isMenuOpen = false;
    this.showOverlay = false;
    this.overlay = null;
    this.bubbles = [];
    this.labels = [];
    this.menuContainer = null;
    
    this.handleToggle = this.handleToggle.bind(this);
    this.handleResize = this.handleResize.bind(this);
    
    // Wait for GSAP to load
    if (typeof gsap === 'undefined') {
      console.warn('GSAP not loaded. BubbleMenu requires GSAP library.');
      return;
    }
  }
  
  init() {
    this.createMenu();
    this.setupEventListeners();
  }
  
  createMenu() {
    // Remove existing header nav if present
    const oldHeader = document.querySelector('header');
    if (oldHeader) {
      const oldNav = oldHeader.querySelector('nav');
      const oldToggle = oldHeader.querySelector('.menu-toggle');
      if (oldNav) oldNav.style.display = 'none';
      if (oldToggle) oldToggle.style.display = 'none';
    }
    
    // Create menu container
    this.menuContainer = document.createElement('nav');
    this.menuContainer.className = [
      'bubble-menu',
      this.options.useFixedPosition ? 'fixed' : 'absolute',
      this.options.className
    ].filter(Boolean).join(' ');
    this.menuContainer.setAttribute('aria-label', 'Main navigation');
    
    // Apply custom styles
    Object.assign(this.menuContainer.style, this.options.style);
    
    // Logo bubble - with gradient
    const logoBubble = document.createElement('div');
    logoBubble.className = 'bubble logo-bubble';
    logoBubble.setAttribute('aria-label', 'Logo');
    logoBubble.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    logoBubble.style.backgroundImage = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    // Don't set width/height inline - let CSS handle responsive sizing
    
    const logoContent = document.createElement('span');
    logoContent.className = 'logo-content';
    if (typeof this.options.logo === 'string') {
      const logoImg = document.createElement('img');
      logoImg.src = this.options.logo;
      logoImg.alt = 'Logo';
      logoImg.className = 'bubble-logo';
      logoContent.appendChild(logoImg);
    } else {
      logoContent.appendChild(this.options.logo);
    }
    logoBubble.appendChild(logoContent);
    
    // Toggle button - hamburger icon - with gradient
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = `bubble toggle-bubble menu-btn`;
    toggleBtn.setAttribute('aria-label', this.options.menuAriaLabel);
    toggleBtn.setAttribute('aria-pressed', 'false');
    toggleBtn.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    toggleBtn.style.backgroundImage = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    // Don't set width/height inline - let CSS handle responsive sizing
    toggleBtn.addEventListener('click', this.handleToggle);
    
    // Create hamburger icon (three horizontal lines)
    const menuLine1 = document.createElement('span');
    menuLine1.className = 'menu-line';
    menuLine1.style.background = '#fff';
    const menuLine2 = document.createElement('span');
    menuLine2.className = 'menu-line';
    menuLine2.style.background = '#fff';
    const menuLine3 = document.createElement('span');
    menuLine3.className = 'menu-line';
    menuLine3.style.background = '#fff';
    
    toggleBtn.appendChild(menuLine1);
    toggleBtn.appendChild(menuLine2);
    toggleBtn.appendChild(menuLine3);
    
    // Add to container - toggle on right, logo on left
    this.menuContainer.appendChild(logoBubble);
    this.menuContainer.appendChild(toggleBtn);
    
    // Menu items overlay - transparent, no background
    this.overlay = document.createElement('div');
    this.overlay.className = `bubble-menu-items ${this.options.useFixedPosition ? 'fixed' : 'absolute'}`;
    this.overlay.setAttribute('aria-hidden', 'true');
    this.overlay.style.display = 'none';
    this.overlay.style.backgroundColor = 'transparent';
    this.overlay.style.background = 'transparent';
    
    const pillList = document.createElement('ul');
    pillList.className = 'pill-list';
    pillList.setAttribute('role', 'menu');
    pillList.setAttribute('aria-label', 'Menu links');
    
    this.options.items.forEach((item, idx) => {
      const li = document.createElement('li');
      li.setAttribute('role', 'none');
      li.className = 'pill-col';
      
      const link = document.createElement('a');
      link.setAttribute('role', 'menuitem');
      link.href = item.href;
      link.setAttribute('aria-label', item.ariaLabel || item.label);
      link.className = 'pill-link';
      // Set rotation only on desktop, CSS will override on mobile
      const isDesktop = window.innerWidth > 900;
      link.style.setProperty('--item-rot', isDesktop ? `${item.rotation ?? 0}deg` : '0deg');
      link.style.setProperty('--pill-gradient', item.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
      link.style.setProperty('--pill-color', '#fff');
      link.style.color = '#fff';
      link.style.setProperty('--hover-gradient', item.hoverGradient || item.gradient || 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)');
      link.style.setProperty('--hover-color', '#fff');
      
      // Close menu when link is clicked
      link.addEventListener('click', () => {
        if (this.isMenuOpen) {
          setTimeout(() => {
            this.handleToggle();
          }, 100);
        }
      });
      
      // Store reference for animation
      this.bubbles.push(link);
      
      const label = document.createElement('span');
      label.className = 'pill-label';
      label.textContent = item.label;
      
      this.labels.push(label);
      
      link.appendChild(label);
      li.appendChild(link);
      pillList.appendChild(li);
    });
    
    this.overlay.appendChild(pillList);
    
    // Hide menu initially until loading is complete
    this.menuContainer.style.opacity = '0';
    this.menuContainer.style.visibility = 'hidden';
    this.menuContainer.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
    
    // Insert into page (before header or at top of body)
    const header = document.querySelector('header');
    if (header) {
      header.parentNode.insertBefore(this.menuContainer, header);
      header.parentNode.insertBefore(this.overlay, header);
    } else {
      document.body.insertBefore(this.menuContainer, document.body.firstChild);
      document.body.insertBefore(this.overlay, document.body.firstChild);
    }
    
    // Show menu after loading completes
    this.showMenuAfterLoading();
    
    // Apply responsive styles after a short delay to ensure DOM is ready
    setTimeout(() => {
      this.applyResponsiveStyles();
    }, 100);
  }
  
  setupEventListeners() {
    window.addEventListener('resize', this.handleResize);
    // Ensure mobile styles are applied on load
    this.applyResponsiveStyles();
  }
  
  applyResponsiveStyles() {
    // Force apply mobile styles immediately
    const isMobile = window.innerWidth <= 900;
    if (isMobile && this.bubbles) {
      const bubbles = this.bubbles.filter(Boolean);
      bubbles.forEach((bubble) => {
        if (bubble && typeof gsap !== 'undefined') {
          gsap.set(bubble, { rotation: 0 });
        }
      });
    }
  }
  
  handleToggle() {
    const nextState = !this.isMenuOpen;
    if (nextState) {
      this.showOverlay = true;
    }
    this.isMenuOpen = nextState;
    
    const toggleBtn = this.menuContainer.querySelector('.menu-btn');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-pressed', nextState.toString());
      toggleBtn.classList.toggle('open', nextState);
    }
    
    if (this.options.onMenuClick) {
      this.options.onMenuClick(nextState);
    }
    
    this.animateMenu();
  }
  
  animateMenu() {
    if (!this.overlay || !this.bubbles.length) return;
    
    const bubbles = this.bubbles.filter(Boolean);
    const labels = this.labels.filter(Boolean);
    
    if (this.isMenuOpen) {
      // Ensure overlay is transparent and visible
      this.overlay.setAttribute('aria-hidden', 'false');
      this.overlay.style.backgroundColor = 'transparent';
      this.overlay.style.background = 'transparent';
      gsap.set(this.overlay, { 
        display: 'flex',
        backgroundColor: 'transparent',
        background: 'transparent'
      });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(labels, { y: 24, autoAlpha: 0 });
      
      bubbles.forEach((bubble, i) => {
        const delay = i * this.options.staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });
        
        tl.to(bubble, {
          scale: 1,
          duration: this.options.animationDuration,
          ease: this.options.animationEase
        });
        
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: this.options.animationDuration,
              ease: 'power3.out'
            },
            `-=${this.options.animationDuration * 0.9}`
          );
        }
      });
    } else if (this.showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in'
      });
      
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          this.overlay.setAttribute('aria-hidden', 'true');
          gsap.set(this.overlay, { 
            display: 'none',
            backgroundColor: 'transparent',
            background: 'transparent'
          });
          this.overlay.style.display = 'none';
          this.overlay.style.backgroundColor = 'transparent';
          this.overlay.style.background = 'transparent';
          this.showOverlay = false;
        }
      });
    }
  }
  
  handleResize() {
    if (this.isMenuOpen) {
      const bubbles = this.bubbles.filter(Boolean);
      const isDesktop = window.innerWidth > 900;
      
      bubbles.forEach((bubble, i) => {
        const item = this.options.items[i];
        if (bubble && item) {
          const rotation = isDesktop ? (item.rotation ?? 0) : 0;
          gsap.set(bubble, { rotation });
        }
      });
    }
  }
  
  showMenuAfterLoading() {
    const showMenu = () => {
      if (this.menuContainer) {
        this.menuContainer.style.opacity = '1';
        this.menuContainer.style.visibility = 'visible';
      }
    };
    
    const checkLoading = () => {
      const loadingScreen = document.getElementById('loading-screen');
      
      if (!loadingScreen) {
        // No loading screen, show menu immediately
        showMenu();
        return;
      }
      
      const computedStyle = getComputedStyle(loadingScreen);
      const display = computedStyle.display;
      const opacity = parseFloat(computedStyle.opacity);
      
      if (display === 'none' || loadingScreen.style.display === 'none') {
        // Loading screen is hidden, show menu
        showMenu();
        return;
      }
      
      // Check if loading screen is fading out
      if (opacity < 0.3) {
        // Loading is almost gone, show menu
        showMenu();
        return;
      }
      
      // Continue checking
      requestAnimationFrame(checkLoading);
    };
    
    // Also listen for window load event
    const handleWindowLoad = () => {
      setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
          const computedStyle = getComputedStyle(loadingScreen);
          if (computedStyle.display === 'none' || parseFloat(computedStyle.opacity) < 0.5) {
            showMenu();
          } else {
            // Start checking
            checkLoading();
          }
        } else {
          showMenu();
        }
      }, 500);
    };
    
    // Start checking after a short delay
    setTimeout(checkLoading, 100);
    
    // Also listen for window load
    if (document.readyState === 'complete') {
      handleWindowLoad();
    } else {
      window.addEventListener('load', handleWindowLoad);
    }
  }
  
  destroy() {
    window.removeEventListener('resize', this.handleResize);
    if (this.menuContainer) {
      this.menuContainer.remove();
    }
    if (this.overlay) {
      this.overlay.remove();
    }
  }
}

// Auto-initialize on DOM ready
function initBubbleMenu() {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded. Retrying in 100ms...');
    setTimeout(initBubbleMenu, 100);
    return;
  }
  
  // Determine current page to set active state
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';
  const items = [...DEFAULT_MENU_ITEMS];
  
  // Check if we're in html/ subdirectory or root
  const isInHtmlDir = currentPath.includes('/html/') || currentPath.endsWith('/html');
  
  // Adjust hrefs based on current page location
  if (!isInHtmlDir && currentPage !== 'index.html') {
    // If we're at root level, use direct paths
    // Paths are already correct in DEFAULT_MENU_ITEMS
  } else if (isInHtmlDir) {
    // If we're in html/ directory, use relative paths (already correct)
    // No adjustment needed
  }
  
  const menu = new BubbleMenu({
    logo: '../image/logo.svg',
    useFixedPosition: true,
    items: items
  });
  
  menu.init();
  
  // Make menu globally available
  window.bubbleMenu = menu;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBubbleMenu);
} else {
  initBubbleMenu();
}

