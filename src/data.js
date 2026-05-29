export const DISTRICTS = {
  work: {
    color: '#ef4444', bg: '#fef2f2', border: '#fecaca',
    tag: 'Work Experience', title: 'AdPlay HQ & Past Offices', icon: '🏢',
    entries: [
      {
        role: 'Software Engineer', company: 'AdPlay Technology LTD',
        location: 'Dhaka, Bangladesh', date: 'Sep 2024 — Present',
        bullets: [
          'Developed enterprise-grade Laravel apps integrating AI-powered tools',
          'Designed and implemented a Real-Time Bidding (RTB) system with Node.js & MongoDB',
          'Integrated Microsoft Graph API for automated daily email reporting',
          'Built AI-powered SMS auto-reply & campaign messaging platforms',
          'Designed a scalable Creative AI SaaS with subscription plans & 30+ generation types',
          'Built AdPlay DSP Panel with dynamic campaign modules & reporting filters',
        ]
      },
      {
        role: 'Software Developer', company: 'SATT Academy IT',
        location: 'Rajshahi, Bangladesh', date: 'Apr 2024 — Jul 2024',
        bullets: [
          'Built and maintained dynamic web platforms using Laravel and MySQL',
          'Collaborated to design and deploy several educational web systems',
        ]
      },
      {
        role: 'Web Development Trainer', company: 'BYETS Project',
        location: 'Rajshahi, Bangladesh', date: 'Aug 2023 — Mar 2024',
        bullets: [
          'Conducted training on full-stack web development — PHP, Laravel, JavaScript',
          'Mentored students on real-life projects and development best practices',
          'Designed hands-on tasks and evaluated project-based learning outcomes',
        ]
      },
    ]
  },
  education: {
    color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe',
    tag: 'Education', title: 'University Campus', icon: '🎓',
    entries: [
      { name: 'B.Sc. in Information & Communication Engineering', inst: 'Pabna University of Science and Technology', detail: 'Pabna - 6600, Bangladesh' },
      { name: 'Competitive Programming', inst: 'National Collegiate Programming Contest · SUST Techfest 2019', detail: 'Participated in 70+ online programming contests' },
    ],
    objective: 'Passionate Software Engineer specializing in Web Development and AI-driven Solutions. Skilled in Laravel, PHP, React.js and Python, with a strong focus on building scalable, user-centric applications leveraging modern AI technologies.'
  },
  skills: {
    color: '#ca8a04', bg: '#fefce8', border: '#fef08a',
    tag: 'Technical Skills', title: 'The Skills Lab', icon: '⚡',
    groups: [
      { label: 'LANGUAGES',  items: ['PHP (OOP)', 'JavaScript', 'Python', 'C', 'C++', 'SQL'] },
      { label: 'FRAMEWORKS', items: ['Laravel', 'Livewire', 'React.js', 'Node.js', 'Express.js', 'Socket.io'] },
      { label: 'DATABASES',  items: ['MySQL', 'MSSQL', 'MongoDB'] },
      { label: 'FRONTEND',   items: ['HTML', 'CSS', 'Bootstrap', 'jQuery', 'AJAX', 'JSON'] },
      { label: 'AI & APIS',  items: ['Gemini AI', 'GPT', 'DeepSeek-VL', 'Microsoft Graph API', 'RESTful APIs'] },
      { label: 'TOOLS',      items: ['Git', 'GitHub', 'GitLab', 'Docker', 'Postman', 'MVC'] },
    ]
  },
  projects: {
    color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0',
    tag: 'Projects', title: 'Innovation Park', icon: '🚀',
    items: [
      { name: 'Quizmaster.club', url: 'https://quizmaster.club', desc: 'Interactive quiz platform with live sessions, leaderboards, winnerboard, loyalty system, and campaign image quizzes.', tech: ['React.js', 'REST APIs', 'MySQL'] },
      { name: 'Gamestar.team',   url: 'https://gamestar.team',   desc: 'Fully responsive gaming platform with dynamic product browsing, secure auth, and optimised checkout flow.', tech: ['React.js', 'REST APIs', 'MySQL'] },
      { name: 'Creative AI Platform', url: null, desc: 'SaaS platform for AI-generated text/images. 30+ creative types, admin panel, subscription plans & Microsoft Graph email verification.', tech: ['Laravel 11', 'AI APIs', 'MySQL'] },
      { name: 'AdPlay DSP Panel', url: null, desc: 'Real-time data sync dashboard. Automates daily email reports via Microsoft Graph API with dynamic campaign modules.', tech: ['Laravel', 'Microsoft Graph API', 'Stored Procedures'] },
      { name: 'Chargee.shop',   url: 'https://chargee.shop', desc: 'Full game top-up platform with cart, OTP login, email verification, dynamic search, filtering and responsive design.', tech: ['React.js', 'MySQL', 'REST APIs'] },
      { name: 'Real-Time Bidding System', url: null, desc: 'Full-stack RTB solution simulating a live advertising ecosystem with high-performance bid handling.', tech: ['Node.js', 'MongoDB', 'Laravel'] },
      { name: 'S&J BD LTD Website', url: null, desc: 'Garments buying house dynamic website with product showcases, inquiry forms, and SEO-friendly architecture.', tech: ['Laravel', 'MySQL'] },
    ]
  },
  contact: {
    color: '#a855f7', bg: '#faf5ff', border: '#e9d5ff',
    tag: 'Contact', title: 'Community Centre', icon: '📡',
    links: [
      { icon: '📧', label: 'Email',    val: 'tanzimulislam799@gmail.com', href: 'mailto:tanzimulislam799@gmail.com' },
      { icon: '📱', label: 'Phone',    val: '+880 131 496 5934',           href: 'tel:+8801314965934' },
      { icon: '💼', label: 'LinkedIn', val: 'Tanzimul Islam',              href: 'https://www.linkedin.com/in/tanzimul-islam-73083b190/' },
      { icon: '⚡', label: 'GitHub',   val: 'github.com/tanzim721',        href: 'https://github.com/tanzim721' },
      { icon: '🌐', label: 'Website',  val: 'tanzim36.me',                 href: 'https://tanzim36.me' },
      { icon: '📍', label: 'Location', val: 'Mohakhali, Dhaka, Bangladesh', href: null },
    ]
  }
};

export const LEGEND = [
  { id: 'work',      label: 'Work Experience', sub: 'AdPlay HQ',        color: '#ef4444' },
  { id: 'education', label: 'Education',        sub: 'University Campus', color: '#3b82f6' },
  { id: 'skills',    label: 'Technical Skills', sub: 'Skills Lab',        color: '#eab308' },
  { id: 'projects',  label: 'Projects',         sub: 'Innovation Park',   color: '#22c55e' },
  { id: 'contact',   label: 'Contact',           sub: 'Community Centre',  color: '#a855f7' },
];

// Cars: { id, color, axis:'h'|'v', lane(px), from, to, speed(px/frame), size }
export const CAR_DEFS = [
  // Horizontal — main road (y≈338)
  { id:'c1', color:'#f59e0b', axis:'h', lane:320, from:-30,  to:930,  speed:1.6, w:28, h:16 },
  { id:'c2', color:'#6366f1', axis:'h', lane:352, from:930,  to:-30,  speed:1.3, w:26, h:14 },
  { id:'c3', color:'#ec4899', axis:'h', lane:320, from:400,  to:930,  speed:2.1, w:22, h:14 },
  { id:'c4', color:'#0ea5e9', axis:'h', lane:352, from:600,  to:-30,  speed:1.8, w:24, h:15 },
  { id:'c5', color:'#f97316', axis:'h', lane:322, from:-30,  to:930,  speed:1.1, w:30, h:16 },
  // Horizontal — secondary top (y≈160)
  { id:'c6', color:'#84cc16', axis:'h', lane:150, from:-30,  to:390,  speed:1.4, w:22, h:13 },
  { id:'c7', color:'#fb7185', axis:'h', lane:164, from:390,  to:-30,  speed:1.7, w:20, h:13 },
  // Horizontal — secondary bottom (y≈554)
  { id:'c8', color:'#34d399', axis:'h', lane:545, from:450,  to:930,  speed:1.5, w:24, h:14 },
  { id:'c9', color:'#a78bfa', axis:'h', lane:558, from:930,  to:450,  speed:1.2, w:22, h:14 },
  // Vertical — main road (x≈418)
  { id:'c10', color:'#facc15', axis:'v', lane:400, from:-30,  to:730,  speed:1.5, w:16, h:26 },
  { id:'c11', color:'#60a5fa', axis:'v', lane:432, from:730,  to:-30,  speed:1.8, w:15, h:24 },
  { id:'c12', color:'#f472b6', axis:'v', lane:400, from:300,  to:730,  speed:2.0, w:14, h:22 },
  { id:'c13', color:'#4ade80', axis:'v', lane:432, from:500,  to:-30,  speed:1.3, w:16, h:25 },
  // Vertical — secondary left (x≈199)
  { id:'c14', color:'#fbbf24', axis:'v', lane:192, from:-30,  to:310,  speed:1.6, w:14, h:22 },
  { id:'c15', color:'#818cf8', axis:'v', lane:206, from:310,  to:-30,  speed:1.4, w:13, h:20 },
  // Vertical — secondary right (x≈674)
  { id:'c16', color:'#2dd4bf', axis:'v', lane:665, from:370,  to:730,  speed:1.7, w:14, h:22 },
  { id:'c17', color:'#f87171', axis:'v', lane:679, from:730,  to:370,  speed:1.5, w:13, h:21 },
];
