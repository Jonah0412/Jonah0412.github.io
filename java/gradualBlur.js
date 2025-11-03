// GradualBlur - Vanilla JS port of React component
// Creates gradual blur effects for scroll containers

const DEFAULT_CONFIG = {
  position: 'bottom',
  strength: 2,
  height: '6rem',
  divCount: 5,
  exponential: false,
  zIndex: 1000,
  animated: false,
  duration: '0.3s',
  easing: 'ease-out',
  opacity: 1,
  curve: 'linear',
  responsive: false,
  target: 'parent',
  className: '',
  style: {}
};

const PRESETS = {
  top: { position: 'top', height: '6rem' },
  bottom: { position: 'bottom', height: '6rem' },
  left: { position: 'left', height: '6rem' },
  right: { position: 'right', height: '6rem' },
  subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },
  intense: { height: '10rem', strength: 4, divCount: 8, exponential: true },
  smooth: { height: '8rem', curve: 'bezier', divCount: 10 },
  sharp: { height: '5rem', curve: 'linear', divCount: 4 },
  header: { position: 'top', height: '8rem', curve: 'ease-out' },
  footer: { position: 'bottom', height: '8rem', curve: 'ease-out' },
  sidebar: { position: 'left', height: '6rem', strength: 2.5 },
  'page-header': { position: 'top', height: '10rem', target: 'page', strength: 3 },
  'page-footer': { position: 'bottom', height: '10rem', target: 'page', strength: 3 }
};

const CURVE_FUNCTIONS = {
  linear: p => p,
  bezier: p => p * p * (3 - 2 * p),
  'ease-in': p => p * p,
  'ease-out': p => 1 - Math.pow(1 - p, 2),
  'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
};

const mergeConfigs = (...configs) => configs.reduce((acc, c) => ({ ...acc, ...c }), {});

const getGradientDirection = position =>
  ({
    top: 'to top',
    bottom: 'to bottom',
    left: 'to left',
    right: 'to right'
  })[position] || 'to bottom';

const debounce = (fn, wait) => {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), wait);
  };
};

function createGradualBlur(options = {}) {
  const presetConfig = options.preset && PRESETS[options.preset] ? PRESETS[options.preset] : {};
  const config = mergeConfigs(DEFAULT_CONFIG, presetConfig, options);

  const container = document.createElement('div');
  const isPageTarget = config.target === 'page';
  const containerClass = `gradual-blur ${isPageTarget ? 'gradual-blur-page' : 'gradual-blur-parent'} ${config.className || ''}`.trim();
  container.className = containerClass;

  // Container styles
  const isVertical = ['top', 'bottom'].includes(config.position);
  const isHorizontal = ['left', 'right'].includes(config.position);

  const containerStyle = {
    position: isPageTarget ? 'fixed' : 'absolute',
    pointerEvents: config.hoverIntensity ? 'auto' : 'none',
    opacity: config.animated === 'scroll' ? 0 : config.opacity || 1,
    transition: config.animated ? `opacity ${config.duration} ${config.easing}` : undefined,
    zIndex: isPageTarget ? config.zIndex + 100 : config.zIndex,
    ...config.style
  };

  if (isVertical) {
    containerStyle.height = config.height;
    containerStyle.width = config.width || '100%';
    containerStyle[config.position] = 0;
    containerStyle.left = 0;
    containerStyle.right = 0;
  } else if (isHorizontal) {
    containerStyle.width = config.width || config.height;
    containerStyle.height = '100%';
    containerStyle[config.position] = 0;
    containerStyle.top = 0;
    containerStyle.bottom = 0;
  }

  Object.assign(container.style, containerStyle);

  // Inner container
  const inner = document.createElement('div');
  inner.className = 'gradual-blur-inner';
  inner.style.position = 'relative';
  inner.style.width = '100%';
  inner.style.height = '100%';
  container.appendChild(inner);

  // Create blur divs
  const increment = 100 / config.divCount;
  const direction = getGradientDirection(config.position);
  const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;

  for (let i = 1; i <= config.divCount; i++) {
    let progress = i / config.divCount;
    progress = curveFunc(progress);

    let blurValue;
    if (config.exponential) {
      blurValue = Math.pow(2, progress * 4) * 0.0625 * config.strength;
    } else {
      blurValue = 0.0625 * (progress * config.divCount + 1) * config.strength;
    }

    const p1 = Math.round((increment * i - increment) * 10) / 10;
    const p2 = Math.round(increment * i * 10) / 10;
    const p3 = Math.round((increment * i + increment) * 10) / 10;
    const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

    let gradient = `transparent ${p1}%, black ${p2}%`;
    if (p3 <= 100) gradient += `, black ${p3}%`;
    if (p4 <= 100) gradient += `, transparent ${p4}%`;

    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.inset = '0';
    div.style.maskImage = `linear-gradient(${direction}, ${gradient})`;
    div.style.webkitMaskImage = `linear-gradient(${direction}, ${gradient})`;
    div.style.backdropFilter = `blur(${blurValue.toFixed(3)}rem)`;
    div.style.webkitBackdropFilter = `blur(${blurValue.toFixed(3)}rem)`;
    div.style.opacity = config.opacity;
    div.style.transition = config.animated && config.animated !== 'scroll'
      ? `backdrop-filter ${config.duration} ${config.easing}`
      : undefined;

    inner.appendChild(div);
  }

  // Intersection observer for scroll animation
  if (config.animated === 'scroll') {
    const observer = new IntersectionObserver(([entry]) => {
      container.style.opacity = entry.isIntersecting ? config.opacity || 1 : 0;
      if (entry.isIntersecting && config.onAnimationComplete) {
        const ms = parseFloat(config.duration) * 1000;
        setTimeout(() => config.onAnimationComplete(), ms);
      }
    }, { threshold: 0.1 });

    // Observe the target element or container
    const targetElement = config.targetElement || container.parentElement;
    if (targetElement) {
      observer.observe(targetElement);
    }
  }

  // Hover effects
  let isHovered = false;
  if (config.hoverIntensity) {
    container.addEventListener('mouseenter', () => {
      isHovered = true;
      updateBlurDivs();
    });

    container.addEventListener('mouseleave', () => {
      isHovered = false;
      updateBlurDivs();
    });
  }

  function updateBlurDivs() {
    const currentStrength = isHovered ? config.strength * config.hoverIntensity : config.strength;
    const divs = inner.querySelectorAll('div');
    
    divs.forEach((div, i) => {
      let progress = (i + 1) / config.divCount;
      progress = curveFunc(progress);
      
      let blurValue;
      if (config.exponential) {
        blurValue = Math.pow(2, progress * 4) * 0.0625 * currentStrength;
      } else {
        blurValue = 0.0625 * (progress * config.divCount + 1) * currentStrength;
      }
      
      div.style.backdropFilter = `blur(${blurValue.toFixed(3)}rem)`;
      div.style.webkitBackdropFilter = `blur(${blurValue.toFixed(3)}rem)`;
    });
  }

  return container;
}

// Auto-initialize blur effects for common scroll containers
function initGradualBlur() {
  // Add blur to scrollable sections
  const scrollableSections = document.querySelectorAll('.scrollable-section, .about-preview-content, .featured-carousel');
  
  scrollableSections.forEach(section => {
    // Check if overflow is scrollable
    const hasOverflow = section.scrollHeight > section.clientHeight;
    if (!hasOverflow) return;

    // Bottom blur
    const bottomBlur = createGradualBlur({
      preset: 'bottom',
      target: 'parent',
      height: '4rem',
      strength: 1.5,
      opacity: 0.9
    });
    section.style.position = 'relative';
    section.appendChild(bottomBlur);

    // Top blur (if scrolled)
    const topBlur = createGradualBlur({
      preset: 'top',
      target: 'parent',
      height: '4rem',
      strength: 1.5,
      opacity: 0.9
    });
    section.appendChild(topBlur);

    // Update top blur visibility on scroll
    const updateTopBlur = () => {
      const isScrolled = section.scrollTop > 10;
      topBlur.style.opacity = isScrolled ? 0.9 : 0;
    };

    section.addEventListener('scroll', updateTopBlur);
    updateTopBlur();
  });

  // Add page-level blur effects
  const addPageBlur = () => {
    // Top blur for page scroll
    const topPageBlur = createGradualBlur({
      preset: 'page-header',
      target: 'page',
      height: '6rem',
      strength: 2,
      opacity: 0
    });
    document.body.appendChild(topPageBlur);

    // Show/hide based on scroll
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100 && lastScrollY <= 100) {
        topPageBlur.style.opacity = '0.8';
      } else if (scrollY <= 100 && lastScrollY > 100) {
        topPageBlur.style.opacity = '0';
      }
      lastScrollY = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  };

  addPageBlur();
}

// Inject CSS styles
function injectGradualBlurStyles() {
  const styleId = 'gradual-blur-styles';
  if (document.getElementById(styleId)) return;

  const styleElement = document.createElement('style');
  styleElement.id = styleId;
  styleElement.textContent = `
    .gradual-blur-inner {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .gradual-blur-inner > div {
      -webkit-backdrop-filter: inherit;
      backdrop-filter: inherit;
    }

    .gradual-blur {
      isolation: isolate;
      pointer-events: none;
      transition: opacity 0.3s ease-out;
    }

    .gradual-blur-parent {
      overflow: hidden;
    }

    .gradual-blur-inner {
      pointer-events: none;
    }

    .gradual-blur-page {
      pointer-events: none;
    }

    @supports not (backdrop-filter: blur(1px)) {
      .gradual-blur-inner > div {
        background: rgba(0, 0, 0, 0.3);
        opacity: 0.5;
      }
    }

    .gradual-blur-fixed {
      position: fixed !important;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 1000;
    }
  `;

  document.head.appendChild(styleElement);
}

// Initialize on DOM ready
if (typeof document !== 'undefined') {
  injectGradualBlurStyles();
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGradualBlur);
  } else {
    initGradualBlur();
  }
}

// Export for manual use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createGradualBlur, initGradualBlur, PRESETS };
}

