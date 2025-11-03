// Iridescent background for title container (vanilla JS port of React snippet)
// Uses OGL via ESM CDN - Fixed for responsive desktop and mobile

import { Renderer, Program, Mesh, Color, Triangle } from 'https://cdn.skypack.dev/ogl';

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;
varying vec2 vUv;
void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;
  uv += (uMouse - vec2(0.5)) * uAmplitude;
  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`;

function initIridescence(container, options = {}) {
  const {
    color = [1, 1, 1],
    speed = 1.0,
    amplitude = 0.1,
    mouseReact = true
  } = options;

  if (!container) return () => {};

  const renderer = new Renderer({ alpha: true });
  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);

  // Style canvas to fill container
  const canvas = gl.canvas;
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  canvas.style.pointerEvents = 'none';

  let program;

  function resize() {
    if (!container || !gl.canvas) return;
    
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width;
    const height = rect.height;
    
    renderer.setSize(width * dpr, height * dpr);
    
    if (program && program.uniforms) {
      program.uniforms.uResolution.value = new Color(
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height
      );
    }
  }

  // Initial resize
  resize();

  // Debounced resize handler
  let resizeTimeout;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 100);
  };
  
  window.addEventListener('resize', handleResize);
  
  // Use ResizeObserver for better performance
  let resizeObserver;
  if (window.ResizeObserver) {
    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
  }

  const geometry = new Triangle(gl);
  program = new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new Color(...color) },
      uResolution: { 
        value: new Color(
          gl.canvas.width || container.offsetWidth,
          gl.canvas.height || container.offsetHeight,
          (gl.canvas.width || container.offsetWidth) / (gl.canvas.height || container.offsetHeight)
        )
      },
      uMouse: { value: new Float32Array([0.5, 0.5]) },
      uAmplitude: { value: amplitude },
      uSpeed: { value: speed }
    }
  });

  const mesh = new Mesh(gl, { geometry, program });

  let rafId;
  let lastTime = performance.now();
  
  function update() {
    rafId = requestAnimationFrame(update);
    const now = performance.now();
    program.uniforms.uTime.value = now * 0.001;
    renderer.render({ scene: mesh });
    lastTime = now;
  }
  
  rafId = requestAnimationFrame(update);
  container.appendChild(canvas);

  // Touch/mouse handling
  function handlePointerMove(e) {
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height));
    
    if (program && program.uniforms) {
      program.uniforms.uMouse.value[0] = x;
      program.uniforms.uMouse.value[1] = y;
    }
  }

  if (mouseReact) {
    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('touchmove', handlePointerMove, { passive: true });
  }

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', handleResize);
    if (resizeObserver) resizeObserver.disconnect();
    if (mouseReact) {
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('touchmove', handlePointerMove);
    }
    if (canvas && canvas.parentNode === container) {
      container.removeChild(canvas);
    }
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  };
}

// Auto-initialize on the Home page title container if present
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('iridescence');
  if (!container) return;
  
  // Responsive settings based on screen size
  const isMobile = window.innerWidth < 768;
  
  initIridescence(container, { 
    color: [0.95, 0.95, 1.0], 
    speed: isMobile ? 0.8 : 1.0, 
    amplitude: isMobile ? 0.08 : 0.12, 
    mouseReact: !isMobile || 'ontouchstart' in window
  });
});


