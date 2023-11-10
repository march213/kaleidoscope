import GlslCanvas from 'glslCanvas';
import fragString from './shader.frag?raw';
import './style.css';

const canvas = document.querySelector('.canvas-holder canvas');
const sandbox = new GlslCanvas(canvas);

const calcSize = () => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const dpi = window.devicePixelRatio;

  const s = Math.max(vh, vw + 200);

  canvas.width = s * dpi;
  canvas.height = s * dpi;
  canvas.style.width = `${s}px`;
  canvas.style.height = `${s}px`;
};

calcSize();

window.addEventListener('resize', calcSize);

sandbox.load(fragString);

const images = ['trails.jpg', 'light.jpg', 'flowers.jpg'];
let current = 0;

canvas.addEventListener('click', () => {
  current = (current + 1) % images.length;
  sandbox.setUniform('image', images[current]);
});

sandbox.setUniform('image', images[current]);
