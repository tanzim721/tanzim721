/* ═══════════════════════════════════════
   DISTRICT DATA — all portfolio content
═══════════════════════════════════════ */
const DISTRICTS = {

  work: {
    color: '#ef4444',
    bgLight: '#fef2f2',
    tag: 'Work Experience',
    title: 'AdPlay HQ &<br>Past Offices',
    render: () => `
      <div class="exp-card">
        <div class="exp-date" style="background:#fef2f2;color:#ef4444;border:1px solid #fecaca">Sep 2024 — Present</div>
        <div class="exp-role">Software Engineer</div>
        <div class="exp-co">AdPlay Technology LTD · Dhaka, Bangladesh</div>
        <ul class="exp-list">
          <li style="--c:#ef4444">Developed enterprise-grade Laravel apps integrating AI-powered tools</li>
          <li>Designed and implemented a Real-Time Bidding (RTB) system with Node.js & MongoDB</li>
          <li>Integrated Microsoft Graph API for automated daily email reporting</li>
          <li>Built AI-powered SMS auto-reply & campaign messaging platforms</li>
          <li>Designed a scalable Creative AI SaaS with subscription plans & 30+ generation types</li>
          <li>Built AdPlay DSP Panel with dynamic campaign modules & reporting filters</li>
        </ul>
      </div>
      <div class="exp-card">
        <div class="exp-date" style="background:#fef2f2;color:#ef4444;border:1px solid #fecaca">Apr 2024 — Jul 2024</div>
        <div class="exp-role">Software Developer</div>
        <div class="exp-co">SATT Academy IT · Rajshahi, Bangladesh</div>
        <ul class="exp-list">
          <li>Built and maintained dynamic web platforms using Laravel and MySQL</li>
          <li>Collaborated to design and deploy several educational web systems</li>
        </ul>
      </div>
      <div class="exp-card">
        <div class="exp-date" style="background:#fef2f2;color:#ef4444;border:1px solid #fecaca">Aug 2023 — Mar 2024</div>
        <div class="exp-role">Web Development Trainer</div>
        <div class="exp-co">BYETS Project · Rajshahi, Bangladesh</div>
        <ul class="exp-list">
          <li>Conducted training on full-stack web development — PHP, Laravel, JavaScript</li>
          <li>Mentored students on real-life projects and development best practices</li>
          <li>Designed hands-on tasks and evaluated project-based learning outcomes</li>
        </ul>
      </div>
    `
  },

  education: {
    color: '#3b82f6',
    bgLight: '#eff6ff',
    tag: 'Education',
    title: 'University<br>Campus',
    render: () => `
      <div class="edu-block">
        <div class="edu-name">B.Sc. in Information & Communication Engineering</div>
        <div class="edu-inst">Pabna University of Science and Technology</div>
        <div class="edu-detail" style="color:#3b82f6">Pabna - 6600, Bangladesh</div>
      </div>
      <div class="edu-block">
        <div class="edu-name">Competitive Programming</div>
        <div class="edu-inst">National Collegiate Programming Contest · SUST Techfest 2019</div>
        <div class="edu-detail" style="color:#6b6b6b">Participated in 70+ online programming contests</div>
      </div>
      <div class="edu-block" style="border-color:#bfdbfe;background:#f0f7ff">
        <div class="edu-name" style="color:#1d4ed8">Career Objective</div>
        <div class="edu-inst" style="color:#4b5563;font-size:0.85rem;line-height:1.6;margin-top:4px">
          Passionate Software Engineer specializing in Web Development and AI-driven Solutions. 
          Skilled in Laravel, PHP, React.js and Python, with a strong focus on building scalable, 
          user-centric applications leveraging modern AI technologies.
        </div>
      </div>
    `
  },

  skills: {
    color: '#ca8a04',
    bgLight: '#fefce8',
    tag: 'Technical Skills',
    title: 'The<br>Skills Lab',
    render: () => `
      <div class="skill-group">
        <div class="skill-group-label">LANGUAGES</div>
        <div class="skill-tags">
          ${['PHP (OOP)','JavaScript','Python','C','C++','SQL'].map(s => `<span class="skill-tag">${s}</span>`).join('')}
        </div>
      </div>
      <div class="skill-group">
        <div class="skill-group-label">FRAMEWORKS</div>
        <div class="skill-tags">
          ${['Laravel','Livewire','React.js','Node.js','Express.js','Socket.io'].map(s => `<span class="skill-tag">${s}</span>`).join('')}
        </div>
      </div>
      <div class="skill-group">
        <div class="skill-group-label">DATABASES</div>
        <div class="skill-tags">
          ${['MySQL','MSSQL','MongoDB'].map(s => `<span class="skill-tag">${s}</span>`).join('')}
        </div>
      </div>
      <div class="skill-group">
        <div class="skill-group-label">FRONTEND</div>
        <div class="skill-tags">
          ${['HTML','CSS','Bootstrap','jQuery','AJAX','JSON'].map(s => `<span class="skill-tag">${s}</span>`).join('')}
        </div>
      </div>
      <div class="skill-group">
        <div class="skill-group-label">AI & APIS</div>
        <div class="skill-tags">
          ${['Gemini AI','GPT','DeepSeek-VL','Microsoft Graph API','RESTful APIs'].map(s => `<span class="skill-tag">${s}</span>`).join('')}
        </div>
      </div>
      <div class="skill-group">
        <div class="skill-group-label">TOOLS & VERSION CONTROL</div>
        <div class="skill-tags">
          ${['Git','GitHub','GitLab','Docker','Postman','MVC'].map(s => `<span class="skill-tag">${s}</span>`).join('')}
        </div>
      </div>
    `
  },

  projects: {
    color: '#16a34a',
    bgLight: '#f0fdf4',
    tag: 'Projects',
    title: 'Innovation<br>Park',
    render: () => `
      ${[
        {
          name: 'Quizmaster.club', url: 'https://quizmaster.club',
          desc: 'Interactive quiz platform with live sessions, leaderboards, winnerboard, loyalty system, and campaign image quizzes.',
          tech: ['React.js','REST APIs','MySQL']
        },
        {
          name: 'Gamestar.team', url: 'https://gamestar.team',
          desc: 'Fully responsive gaming platform with dynamic product browsing, secure auth, and optimised checkout flow.',
          tech: ['React.js','REST APIs','MySQL']
        },
        {
          name: 'Creative AI Platform', url: null,
          desc: 'SaaS platform for AI-generated text/images. 30+ creative types, admin panel, subscription plans & Microsoft Graph email verification.',
          tech: ['Laravel 11','AI APIs','MySQL']
        },
        {
          name: 'AdPlay DSP Panel', url: null,
          desc: 'Real-time data sync dashboard. Automates daily email reports via Microsoft Graph API with dynamic campaign modules.',
          tech: ['Laravel','Microsoft Graph API','Stored Procedures']
        },
        {
          name: 'Chargee.shop', url: 'https://chargee.shop',
          desc: 'Full game top-up platform with cart, OTP login, email verification, dynamic search, filtering and responsive design.',
          tech: ['React.js','MySQL','REST APIs']
        },
        {
          name: 'Real-Time Bidding System', url: null,
          desc: 'Full-stack RTB solution simulating a live advertising ecosystem with high-performance bid handling.',
          tech: ['Node.js','MongoDB','Laravel']
        },
        {
          name: 'S&J BD LTD Website', url: null,
          desc: 'Garments buying house dynamic website with product showcases, inquiry forms, and SEO-friendly architecture.',
          tech: ['Laravel','MySQL']
        },
      ].map(p => `
        <div class="proj-card">
          <div class="proj-name">${p.url ? `<a href="${p.url}" target="_blank">↗ ${p.name}</a>` : p.name}</div>
          <div class="proj-desc">${p.desc}</div>
          <div class="proj-tech">${p.tech.map(t => `<span style="background:#dcfce7;color:#15803d;border:1px solid #bbf7d0">${t}</span>`).join('')}</div>
        </div>
      `).join('')}
    `
  },

  contact: {
    color: '#a855f7',
    bgLight: '#faf5ff',
    tag: 'Contact',
    title: 'Community<br>Centre',
    render: () => `
      <p style="font-size:0.88rem;color:#6b6b6b;margin-bottom:1.2rem;line-height:1.65">
        Open to full-time roles, freelance projects, and interesting collaborations.
        Drop me a message and I'll get back to you soon.
      </p>
      <a href="mailto:tanzimulislam799@gmail.com" class="contact-item">
        <div class="ci-icon" style="background:#faf5ff">📧</div>
        <div><span class="ci-label">Email</span><span class="ci-val">tanzimulislam799@gmail.com</span></div>
      </a>
      <a href="tel:+8801314965934" class="contact-item">
        <div class="ci-icon" style="background:#faf5ff">📱</div>
        <div><span class="ci-label">Phone</span><span class="ci-val">+880 131 496 5934</span></div>
      </a>
      <a href="https://www.linkedin.com/in/tanzimul-islam-73083b190/" target="_blank" class="contact-item">
        <div class="ci-icon" style="background:#faf5ff">💼</div>
        <div><span class="ci-label">LinkedIn</span><span class="ci-val">Tanzimul Islam</span></div>
      </a>
      <a href="https://github.com/tanzim721" target="_blank" class="contact-item">
        <div class="ci-icon" style="background:#faf5ff">⚡</div>
        <div><span class="ci-label">GitHub</span><span class="ci-val">github.com/tanzim721</span></div>
      </a>
      <a href="https://tanzim36.me" target="_blank" class="contact-item">
        <div class="ci-icon" style="background:#faf5ff">🌐</div>
        <div><span class="ci-label">Website</span><span class="ci-val">tanzim36.me</span></div>
      </a>
      <div class="contact-item" style="cursor:default">
        <div class="ci-icon" style="background:#faf5ff">📍</div>
        <div><span class="ci-label">Location</span><span class="ci-val">Mohakhali, Dhaka, Bangladesh</span></div>
      </div>
    `
  }
};

/* ═══════════════════════════════════════
   PANEL OPEN / CLOSE
═══════════════════════════════════════ */
let activeDistrict = null;

function openPanel(district) {
  const d = DISTRICTS[district];
  if (!d) return;

  // Deactivate prev block
  if (activeDistrict) {
    const prev = document.querySelector(`.city-block[data-district="${activeDistrict}"]`);
    if (prev) prev.classList.remove('active-block');
  }

  activeDistrict = district;

  // Activate block
  const block = document.querySelector(`.city-block[data-district="${district}"]`);
  if (block) block.classList.add('active-block');

  // Build panel HTML
  const panel = document.getElementById('districtPanel');
  const body  = document.getElementById('panelBody');

  body.innerHTML = `
    <span class="pn-tag" style="background:${d.bgLight};color:${d.color};border:1px solid ${d.color}33">${d.tag}</span>
    <h2 class="pn-title">${d.title}</h2>
    ${d.render()}
  `;

  panel.setAttribute('aria-hidden', 'false');
  panel.classList.add('open');
}

function closePanel() {
  const panel = document.getElementById('districtPanel');
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden', 'true');
  if (activeDistrict) {
    const block = document.querySelector(`.city-block[data-district="${activeDistrict}"]`);
    if (block) block.classList.remove('active-block');
    activeDistrict = null;
  }
}

// Wire close button
document.getElementById('panelClose').addEventListener('click', closePanel);

// Wire SVG buildings
document.querySelectorAll('.city-block').forEach(block => {
  block.addEventListener('click', () => {
    const d = block.dataset.district;
    if (activeDistrict === d) { closePanel(); return; }
    openPanel(d);
  });
  block.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openPanel(block.dataset.district);
    }
  });
});

// Close on escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePanel();
});

/* ═══════════════════════════════════════
   PAN & ZOOM
═══════════════════════════════════════ */
const viewport = document.getElementById('cityViewport');
const stage    = document.getElementById('cityStage');

let scale = 1, minScale = 0.5, maxScale = 2.5;
let panX  = 0, panY = 0;
let dragging = false, startX = 0, startY = 0, startPanX = 0, startPanY = 0;

function applyTransform() {
  stage.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
}

// ── Centre the map initially ──
function centreMap() {
  const vw = viewport.clientWidth;
  const vh = viewport.clientHeight;
  panX = (vw - 900 * scale) / 2;
  panY = (vh - 700 * scale) / 2;
  applyTransform();
}
window.addEventListener('load', centreMap);
window.addEventListener('resize', centreMap);

// ── Mouse drag ──
viewport.addEventListener('mousedown', e => {
  if (e.target.closest('.city-block')) return;
  dragging = true;
  startX = e.clientX; startY = e.clientY;
  startPanX = panX; startPanY = panY;
  viewport.style.cursor = 'grabbing';
});
window.addEventListener('mousemove', e => {
  if (!dragging) return;
  panX = startPanX + (e.clientX - startX);
  panY = startPanY + (e.clientY - startY);
  applyTransform();
});
window.addEventListener('mouseup', () => {
  dragging = false;
  viewport.style.cursor = 'grab';
});

// ── Scroll to zoom ──
viewport.addEventListener('wheel', e => {
  e.preventDefault();
  const rect = viewport.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  const delta = e.deltaY > 0 ? 0.92 : 1.09;
  const newScale = Math.min(maxScale, Math.max(minScale, scale * delta));
  panX = mx - (mx - panX) * (newScale / scale);
  panY = my - (my - panY) * (newScale / scale);
  scale = newScale;
  applyTransform();
}, { passive: false });

// ── Touch support ──
let touches = [];
let lastDist = 0;

viewport.addEventListener('touchstart', e => {
  touches = [...e.touches];
  if (touches.length === 1) {
    startX = touches[0].clientX; startY = touches[0].clientY;
    startPanX = panX; startPanY = panY;
  }
  if (touches.length === 2) {
    lastDist = Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY
    );
  }
}, { passive: true });

viewport.addEventListener('touchmove', e => {
  e.preventDefault();
  const t = [...e.touches];
  if (t.length === 1) {
    panX = startPanX + (t[0].clientX - startX);
    panY = startPanY + (t[0].clientY - startY);
    applyTransform();
  }
  if (t.length === 2) {
    const dist = Math.hypot(
      t[0].clientX - t[1].clientX,
      t[0].clientY - t[1].clientY
    );
    const mid = {
      x: (t[0].clientX + t[1].clientX) / 2 - viewport.getBoundingClientRect().left,
      y: (t[0].clientY + t[1].clientY) / 2 - viewport.getBoundingClientRect().top
    };
    const delta = dist / lastDist;
    const newScale = Math.min(maxScale, Math.max(minScale, scale * delta));
    panX = mid.x - (mid.x - panX) * (newScale / scale);
    panY = mid.y - (mid.y - panY) * (newScale / scale);
    scale = newScale;
    lastDist = dist;
    applyTransform();
  }
}, { passive: false });

/* ═══════════════════════════════════════
   ZOOM CONTROLS (keyboard-friendly)
═══════════════════════════════════════ */
// inject zoom UI
const zoomDiv = document.createElement('div');
zoomDiv.className = 'zoom-controls';
zoomDiv.innerHTML = `
  <button class="zoom-btn" id="zoomIn"  title="Zoom in">+</button>
  <button class="zoom-btn" id="zoomOut" title="Zoom out">−</button>
  <button class="zoom-btn" id="zoomReset" title="Reset" style="font-size:0.8rem">⌖</button>
`;
document.querySelector('.city-wrap').appendChild(zoomDiv);

document.getElementById('zoomIn').addEventListener('click', () => {
  const vw = viewport.clientWidth / 2, vh = viewport.clientHeight / 2;
  const ns = Math.min(maxScale, scale * 1.2);
  panX = vw - (vw - panX) * (ns / scale);
  panY = vh - (vh - panY) * (ns / scale);
  scale = ns; applyTransform();
});
document.getElementById('zoomOut').addEventListener('click', () => {
  const vw = viewport.clientWidth / 2, vh = viewport.clientHeight / 2;
  const ns = Math.max(minScale, scale * 0.83);
  panX = vw - (vw - panX) * (ns / scale);
  panY = vh - (vh - panY) * (ns / scale);
  scale = ns; applyTransform();
});
document.getElementById('zoomReset').addEventListener('click', () => {
  scale = 1; centreMap();
});

console.log('%c🏙️ Welcome to Tanzimul Island ', 'background:#1a1a1a;color:#fff;font-size:1rem;padding:4px 8px;border-radius:4px');
console.log('%c Click a building to explore the city! ', 'color:#16a34a');