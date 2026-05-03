/* ── CURSOR ── */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mx = 0, my = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function animCursor() {
  cx += (mx - cx) * 0.12;
  cy += (my - cy) * 0.12;
  if (cursor) {
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
  }
  if (cursorDot) {
    cursorDot.style.left = mx + 'px';
    cursorDot.style.top  = my + 'px';
  }
  requestAnimationFrame(animCursor);
})();

/* ── NAV SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const el = document.querySelector(a.getAttribute('href'));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // close mobile menu
    document.querySelector('.nav-links').classList.remove('open');
  });
});

/* ── BURGER MENU ── */
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
burger && burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

/* ── CANVAS PARTICLES ── */
const canvas = document.getElementById('particles');
const ctx    = canvas ? canvas.getContext('2d') : null;
const pts    = [];

function resizeCanvas() {
  if (!canvas) return;
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

if (ctx) {
  for (let i = 0; i < 60; i++) {
    pts.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      a: Math.random()
    });
  }

  (function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,241,53,${p.a * 0.4})`;
      ctx.fill();
    });
    // draw lines between close pts
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(200,241,53,${0.06 * (1 - d/100)})`;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  })();
}

/* ── TYPEWRITER ── */
const typeTarget = document.getElementById('typeTarget');
const phrases = [
  'Software Engineer',
  'Laravel Developer',
  'React.js Builder',
  'AI Integrations Expert',
  'Full-Stack Developer'
];
let pi = 0, ci = 0, deleting = false;

function typeLoop() {
  if (!typeTarget) return;
  const current = phrases[pi];
  typeTarget.textContent = current.substring(0, ci);
  if (!deleting) {
    ci++;
    if (ci > current.length) { deleting = true; setTimeout(typeLoop, 1600); return; }
    setTimeout(typeLoop, 80);
  } else {
    ci--;
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    setTimeout(typeLoop, 40);
  }
}
setTimeout(typeLoop, 800);

/* ── REVEAL ON SCROLL ── */
const reveals = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
reveals.forEach(r => ro.observe(r));

/* ── STAT COUNTER ── */
function countUp(el, target) {
  let n = 0;
  const step = target / 60;
  const t = setInterval(() => {
    n = Math.min(n + step, target);
    el.textContent = Math.floor(n);
    if (n >= target) clearInterval(t);
  }, 25);
}

const statsSection = document.getElementById('about');
let counted = false;
const statsObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !counted) {
    counted = true;
    document.querySelectorAll('.stat-num').forEach(el => {
      countUp(el, parseInt(el.dataset.target));
    });
  }
}, { threshold: 0.4 });
if (statsSection) statsObs.observe(statsSection);

/* ── CONTACT FORM ── */
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('form-msg');
form && form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get('name');
  const email = data.get('email');
  const subject = data.get('subject');
  const message = data.get('message');
  if (!name || !email || !subject || !message) {
    formMsg.textContent = 'Please fill in all fields.';
    formMsg.style.color = '#ff6b6b';
    return;
  }
  formMsg.textContent = `Thanks, ${name}! I'll get back to you soon ✓`;
  formMsg.style.color = '#c8f135';
  form.reset();
});

/* ── KONAMI ── */
let kc = [];
const ks = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];
document.addEventListener('keydown', e => {
  kc.push(e.code);
  if (kc.length > ks.length) kc.shift();
  if (kc.join('') === ks.join('')) {
    document.body.style.filter = 'hue-rotate(90deg)';
    setTimeout(() => document.body.style.filter = '', 3000);
  }
});

console.log('%c TI. ', 'background:#c8f135;color:#0a0a0a;font-size:2rem;font-weight:bold;padding:4px 8px;border-radius:4px;');
console.log('%c Portfolio of Tanzimul Islam ', 'color:#c8f135;font-size:1rem;');