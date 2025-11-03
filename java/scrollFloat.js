// Scroll Float Text Animation using GSAP ScrollTrigger
// Vanilla JS port of React ScrollFloat component

function initScrollFloat(container, options = {}) {
  const {
    animationDuration = 1,
    ease = 'back.inOut(2)',
    scrollStart = 'center bottom+=50%',
    scrollEnd = 'bottom bottom-=40%',
    stagger = 0.03,
    scrollContainerRef = null
  } = options;

  if (!container) return;
  
  // Wait for GSAP to load
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('ScrollFloat: GSAP or ScrollTrigger not loaded');
    setTimeout(() => initScrollFloat(container, options), 100);
    return;
  }

  // Register ScrollTrigger plugin
  if (gsap && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const textElement = container.querySelector('.scroll-float-text');
  if (!textElement) return;

  // Get clean text content before clearing
  const originalHTML = textElement.innerHTML;
  const text = textElement.textContent.trim() || '';
  
  // Define words to highlight
  const highlightWords = ['Me', 'Projects', 'Background', 'Experience', 'Skills', 'Portfolio', 'Gallery', 'Touch', 'Work'];
  
  // Clear and rebuild with character spans
  textElement.innerHTML = '';
  
  const textArray = text.split('');
  
  // Find all highlight word positions
  const highlightRanges = [];
  for (const word of highlightWords) {
    let searchIndex = 0;
    while (true) {
      const wordStart = text.indexOf(word, searchIndex);
      if (wordStart === -1) break;
      
      // Check if it's a whole word (preceded by space or start, followed by space or end)
      const charBefore = wordStart > 0 ? text[wordStart - 1] : '';
      const charAfter = wordStart + word.length < text.length ? text[wordStart + word.length] : '';
      if ((charBefore === ' ' || wordStart === 0) && (charAfter === ' ' || charAfter === '')) {
        highlightRanges.push({ start: wordStart, end: wordStart + word.length });
      }
      searchIndex = wordStart + 1;
    }
  }
  
  textArray.forEach((char, index) => {
    const span = document.createElement('span');
    span.className = 'char';
    
    // Check if this character index is within any highlight range
    const shouldHighlight = highlightRanges.some(range => index >= range.start && index < range.end);
    
    if (shouldHighlight) {
      span.classList.add('highlight');
    }
    
    span.textContent = char === ' ' ? '\u00A0' : char;
    textElement.appendChild(span);
  });
  
  const chars = textElement.querySelectorAll('.char');

  if (chars.length === 0) return;

  // Determine scroller
  const scroller = scrollContainerRef && scrollContainerRef.current 
    ? scrollContainerRef.current 
    : window;

  // GSAP animation with ScrollTrigger
  gsap.fromTo(
    chars,
    {
      willChange: 'opacity, transform',
      opacity: 0,
      yPercent: 120,
      scaleY: 2.3,
      scaleX: 0.7,
      transformOrigin: '50% 0%'
    },
    {
      duration: animationDuration,
      ease: ease,
      opacity: 1,
      yPercent: 0,
      scaleY: 1,
      scaleX: 1,
      stagger: stagger,
      scrollTrigger: {
        trigger: container,
        start: scrollStart,
        end: scrollEnd,
        scrub: true
      }
    }
  );
}

// Auto-initialize for all scroll-float elements
document.addEventListener('DOMContentLoaded', () => {
  // Wait for GSAP to load
  const checkGSAP = () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      const containers = document.querySelectorAll('.scroll-float');
      containers.forEach((container) => {
        initScrollFloat(container, {
          animationDuration: 1,
          ease: 'back.inOut(2)',
          scrollStart: 'center bottom+=50%',
          scrollEnd: 'bottom bottom-=40%',
          stagger: 0.03
        });
      });
    } else {
      setTimeout(checkGSAP, 50);
    }
  };
  
  checkGSAP();
});

