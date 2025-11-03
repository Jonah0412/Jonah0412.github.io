// CurvedLoop - Vanilla JS port of React component
// Creates a curved marquee text animation

function initCurvedLoop(container, options = {}) {
  const {
    marqueeText = 'Scroll • Drag • Interact',
    speed = 2,
    className = '',
    curveAmount = 400,
    direction = 'left',
    interactive = true
  } = options;

  if (!container) return;

  // Prepare text with trailing space
  const hasTrailing = /\s|\u00A0$/.test(marqueeText);
  const text = (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';

  // Generate unique ID
  const uid = 'curve-' + Math.random().toString(36).substr(2, 9);
  const pathId = `curve-${uid}`;
  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  // Create SVG structure
  const jacket = document.createElement('div');
  jacket.className = 'curved-loop-jacket';
  jacket.style.cursor = interactive ? 'grab' : 'auto';
  jacket.style.display = 'block';
  jacket.style.opacity = '0';
  jacket.style.transition = 'opacity 0.3s ease';

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.className = 'curved-loop-svg';
  svg.setAttribute('viewBox', '0 0 1440 120');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

  // Measure text element - needs positioning to measure correctly
  const measureText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  measureText.setAttribute('xml:space', 'preserve');
  measureText.setAttribute('x', '0');
  measureText.setAttribute('y', '60');
  measureText.style.visibility = 'hidden';
  measureText.style.opacity = '0';
  measureText.style.pointerEvents = 'none';
  measureText.setAttribute('font-weight', 'bold');
  measureText.setAttribute('font-size', '32px');
  measureText.setAttribute('font-family', 'Inter, system-ui, -apple-system, sans-serif');
  measureText.textContent = text;
  if (className) measureText.setAttribute('class', className);

  svg.appendChild(measureText);

  // Create path
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.id = pathId;
  path.setAttribute('d', pathD);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'transparent');
  defs.appendChild(path);
  svg.appendChild(defs);

  jacket.appendChild(svg);
  // Don't append here - wait for initialization

  let spacing = 0;
  let offset = 0;
  let ready = false;
  let dragRef = false;
  let lastXRef = 0;
  let dirRef = direction;
  let velRef = 0;
  let rafId = null;

  // Measure text - wait for rendering
  const measureTextLength = () => {
    // Force a reflow
    svg.offsetHeight;
    
    let length = 0;
    try {
      length = measureText.getComputedTextLength();
    } catch (e) {
      // Fallback: estimate based on text length
      length = text.length * 20;
    }
    
    if (length > 0) {
      spacing = length;
      ready = true;
      createTextPath();
    } else {
      // Retry if measurement failed (max 10 retries)
      if (typeof measureTextLength.retries === 'undefined') {
        measureTextLength.retries = 0;
      }
      measureTextLength.retries++;
      if (measureTextLength.retries < 10) {
        setTimeout(measureTextLength, 100);
      } else {
        // Fallback: use estimated spacing
        console.log('CurvedLoop: Using fallback spacing', text.length * 20);
        spacing = text.length * 25; // Slightly larger estimate
        ready = true;
        createTextPath();
      }
    }
  };

  // Create text path
  const createTextPath = () => {
    console.log('CurvedLoop: Creating text path', { ready, spacing });
    
    if (!ready) {
      console.warn('CurvedLoop: Not ready yet');
      return;
    }
    
    if (spacing <= 0) {
      console.warn('CurvedLoop: Invalid spacing, using fallback');
      spacing = text.length * 25;
    }
    
    // Make visible before creating path
    jacket.style.opacity = '1';
    jacket.style.visibility = 'visible';

    const textLength = spacing;
    const totalText = textLength
      ? Array(Math.ceil(1800 / textLength) + 2)
          .fill(text)
          .join('')
      : text;

    // Remove existing text path if any
    const existingText = svg.querySelector('text[class*="curved-loop"]');
    if (existingText) existingText.remove();

    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.setAttribute('font-weight', 'bold');
    textElement.setAttribute('font-size', '32px');
    textElement.setAttribute('font-family', 'Inter, system-ui, -apple-system, sans-serif');
    textElement.setAttribute('xml:space', 'preserve');
    if (className) textElement.setAttribute('class', className);

    const textPath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
    // Use modern href attribute (works in all modern browsers)
    textPath.setAttribute('href', `#${pathId}`);
    textPath.setAttribute('startOffset', `${-spacing}px`);
    textPath.setAttribute('xml:space', 'preserve');
    textPath.textContent = totalText;

    textElement.appendChild(textPath);
    svg.appendChild(textElement);

    offset = -spacing;
    textPath.setAttribute('startOffset', offset + 'px');

    // Start animation
    startAnimation(textPath);
  };

  // Animation loop
  const startAnimation = (textPathElement) => {
    if (rafId) cancelAnimationFrame(rafId);

    const step = () => {
      if (!dragRef && textPathElement) {
        const delta = dirRef === 'right' ? speed : -speed;
        const currentOffset = parseFloat(textPathElement.getAttribute('startOffset') || '0');
        let newOffset = currentOffset + delta;
        const wrapPoint = spacing;

        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;

        textPathElement.setAttribute('startOffset', newOffset + 'px');
        offset = newOffset;
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
  };

  // Pointer handlers
  const onPointerDown = (e) => {
    if (!interactive) return;
    dragRef = true;
    lastXRef = e.clientX;
    velRef = 0;
    jacket.style.cursor = 'grabbing';
    if (e.target.setPointerCapture) e.target.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!interactive || !dragRef) return;
    
    const textPathElement = svg.querySelector('textPath');
    if (!textPathElement) return;

    const dx = e.clientX - lastXRef;
    lastXRef = e.clientX;
    velRef = dx;

    const currentOffset = parseFloat(textPathElement.getAttribute('startOffset') || '0');
    let newOffset = currentOffset + dx;
    const wrapPoint = spacing;

    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;

    textPathElement.setAttribute('startOffset', newOffset + 'px');
    offset = newOffset;
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef = false;
    dirRef = velRef > 0 ? 'right' : 'left';
    jacket.style.cursor = 'grab';
  };

  // Attach event listeners
  jacket.addEventListener('pointerdown', onPointerDown);
  jacket.addEventListener('pointermove', onPointerMove);
  jacket.addEventListener('pointerup', endDrag);
  jacket.addEventListener('pointerleave', endDrag);

  // Initialize - wait for fonts and DOM to be ready
  const init = () => {
    // Force append to DOM first
    container.appendChild(jacket);
    
    // Wait a bit longer for fonts to load and DOM to render
    const tryInit = () => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          setTimeout(() => {
            measureTextLength();
          }, 100);
        });
      } else {
        setTimeout(() => {
          measureTextLength();
        }, 300);
      }
    };
    
    // Small delay to ensure DOM is rendered
    setTimeout(tryInit, 50);
  };
  
  init();

  // Cleanup function
  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    jacket.removeEventListener('pointerdown', onPointerDown);
    jacket.removeEventListener('pointermove', onPointerMove);
    jacket.removeEventListener('pointerup', endDrag);
    jacket.removeEventListener('pointerleave', endDrag);
    if (jacket.parentNode) jacket.parentNode.removeChild(jacket);
  };
}

// Auto-initialize with multiple fallbacks
function initCurvedLoopOnPage() {
  const container = document.getElementById('curved-loop-container');
  if (!container) {
    console.warn('CurvedLoop: Container #curved-loop-container not found');
    // Retry after a short delay
    setTimeout(initCurvedLoopOnPage, 100);
    return;
  }
  
  console.log('CurvedLoop: Container found, initializing...');
  
  try {
    initCurvedLoop(container, {
      marqueeText: 'Scroll • Drag • Interact • Explore • Discover',
      speed: 2,
      curveAmount: 400,
      direction: 'left',
      interactive: true
    });
    console.log('CurvedLoop: Initialization complete');
  } catch (error) {
    console.error('CurvedLoop initialization error:', error);
  }
}

// Try multiple initialization methods
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initCurvedLoopOnPage, 100);
  });
} else {
  // DOM already loaded
  setTimeout(initCurvedLoopOnPage, 100);
}

// Also try after window load as fallback
window.addEventListener('load', () => {
  const container = document.getElementById('curved-loop-container');
  if (container && !container.querySelector('.curved-loop-jacket')) {
    console.log('CurvedLoop: Retrying after window load');
    initCurvedLoopOnPage();
  }
});

