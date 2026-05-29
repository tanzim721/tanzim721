import Cars from './Cars';

const COLORS = {
  work: '#ef4444', education: '#3b82f6',
  skills: '#ca8a04', projects: '#16a34a', contact: '#a855f7',
};

function Windows({ positions, fill = 'rgba(255,255,255,.22)', w = 14, h = 10 }) {
  return positions.map(([x, y], i) => (
    <rect key={i} x={x} y={y} width={w} height={h} rx="1.5" fill={fill} />
  ));
}

export default function CitySVG({ onBuildingClick, active }) {
  const block = (id, children) => (
    <g
      key={id}
      className="city-block"
      data-district={id}
      onClick={() => onBuildingClick(id)}
      style={{ cursor: 'pointer', transition: 'filter .2s' }}
      onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1) drop-shadow(0 8px 18px rgba(0,0,0,.22))'}
      onMouseLeave={e => e.currentTarget.style.filter = active === id ? 'brightness(1.12) drop-shadow(0 10px 22px rgba(0,0,0,.25))' : ''}
    >
      {children}
    </g>
  );

  const glow = (id, cx, cy, rx, ry) =>
    active === id && (
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry}
        fill={`${COLORS[id]}18`} stroke={COLORS[id]}
        strokeWidth="1.5" strokeDasharray="6,4" />
    );

  return (
    <svg viewBox="0 0 900 700" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 900, height: 700, display: 'block' }}>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#f8fafc" />
        </linearGradient>
      </defs>

      {/* Sky + ground */}
      <rect width="900" height="700" fill="url(#sky)" />
      <rect x="0" y="520" width="900" height="180" fill="#e2e8f0" />
      <circle cx="760" cy="110" r="42" fill="#facc15" opacity=".68" />

      {/* ── Roads ── */}
      {/* Main horizontal */}
      <rect x="0" y="310" width="900" height="56" fill="#2b2b2b" />
      {/* Main vertical */}
      <rect x="390" y="0" width="56" height="700" fill="#2b2b2b" />
      {/* Secondary horizontal top */}
      <rect x="0" y="145" width="385" height="30" fill="#3a3a3a" />
      {/* Secondary horizontal bottom */}
      <rect x="450" y="540" width="450" height="28" fill="#3a3a3a" />
      {/* Secondary vertical left */}
      <rect x="185" y="0" width="28" height="310" fill="#3a3a3a" />
      {/* Secondary vertical right */}
      <rect x="660" y="366" width="28" height="334" fill="#3a3a3a" />

      {/* Road centre-lines */}
      <line x1="0" y1="338" x2="900" y2="338" stroke="white" strokeWidth="2" strokeDasharray="28,18" opacity=".32" />
      <line x1="418" y1="0" x2="418" y2="700" stroke="white" strokeWidth="2" strokeDasharray="28,18" opacity=".32" />
      <line x1="0" y1="160" x2="385" y2="160" stroke="white" strokeWidth="1.5" strokeDasharray="20,14" opacity=".22" />
      <line x1="450" y1="554" x2="900" y2="554" stroke="white" strokeWidth="1.5" strokeDasharray="20,14" opacity=".22" />
      <line x1="199" y1="0" x2="199" y2="310" stroke="white" strokeWidth="1.5" strokeDasharray="20,14" opacity=".22" />
      <line x1="674" y1="366" x2="674" y2="730" stroke="white" strokeWidth="1.5" strokeDasharray="20,14" opacity=".22" />

      {/* Road labels */}
      <text x="60" y="306" fontFamily="DM Sans,sans-serif" fontSize="8.5" fill="#aaa" letterSpacing="2.5">MAKER BOULEVARD</text>
      <text x="460" y="306" fontFamily="DM Sans,sans-serif" fontSize="8.5" fill="#aaa" letterSpacing="2.5">INNOVATION DRIVE</text>
      <text x="388" y="130" fontFamily="DM Sans,sans-serif" fontSize="8" fill="#aaa" letterSpacing="2" textAnchor="end" transform="rotate(-90,388,130)">TECH AVENUE</text>
      <text x="448" y="520" fontFamily="DM Sans,sans-serif" fontSize="8" fill="#aaa" letterSpacing="2" transform="rotate(-90,448,520)">CAMPUS RD</text>

      {/* ── Trees ── */}
      {[[80,80,15],[130,55,11],[155,95,9],[830,70,13],[860,110,9],[800,40,10],[80,600,14],[50,650,10],[840,660,13],[340,650,11]].map(([cx,cy,r],i)=>(
        <g key={`t${i}`}>
          <circle cx={cx} cy={cy} r={r} fill="#5eab5e" opacity=".7"/>
          <circle cx={cx} cy={cy} r={r*0.55} fill="#3d8b3d" opacity=".9"/>
        </g>
      ))}

      {/* ── Classified grey ── */}
      <g opacity=".48">
        {[[40,175,55,105],[265,50,50,80],[510,50,40,60],[580,65,35,55],[760,140,45,150],[820,190,38,110],[520,390,50,100],[720,380,55,130],[160,380,45,75],[530,595,58,80],[195,555,42,68]].map(([x,y,w,h],i)=>(
          <rect key={`g${i}`} x={x} y={y} width={w} height={h} rx="3" fill="#b0aba3"/>
        ))}
        <text x="45" y="268" fontFamily="DM Sans,sans-serif" fontSize="7" fill="#999" letterSpacing="1.5">CLASSIFIED</text>
        <text x="510" y="478" fontFamily="DM Sans,sans-serif" fontSize="7" fill="#999" letterSpacing="1.5">CLASSIFIED</text>
      </g>

      {/* ══ WORK — RED ══ */}
      {block('work', <>
        <rect x="224" y="45" width="85" height="195" rx="4" fill={active==='work'?'#dc2626':'#ef4444'} style={{transition:'fill .2s'}}/>
        <rect x="233" y="28" width="67" height="20" rx="3" fill="#f87171"/>
        <line x1="266" y1="28" x2="266" y2="8" stroke="#fca5a5" strokeWidth="3"/>
        <circle cx="266" cy="6" r="5" fill="#fca5a5"/>
        <Windows positions={[[237,50],[257,50],[277,50],[237,67],[257,67],[277,67],[237,84],[257,84],[277,84],[237,101],[257,101],[277,101],[237,118],[257,118],[277,118],[237,135],[257,135],[277,135],[237,152],[257,152],[277,152],[237,169],[257,169],[277,169]]}/>
        <rect x="316" y="110" width="60" height="130" rx="4" fill="#f87171"/>
        <rect x="323" y="96" width="46" height="17" rx="2" fill="#fca5a5"/>
        <Windows positions={[[323,115],[342,115],[323,130],[342,130],[323,145],[342,145],[323,160],[342,160]]} w={13} h={9}/>
        <text x="236" y="256" fontFamily="DM Sans,sans-serif" fontSize="9" fill="#ef4444" fontWeight="600" letterSpacing="1.5">ADPLAY HQ</text>
        {glow('work', 278, 248, 90, 19)}
      </>)}

      {/* ══ EDUCATION — BLUE ══ */}
      {block('education', <>
        <rect x="458" y="55" width="140" height="110" rx="4" fill={active==='education'?'#2563eb':'#3b82f6'} style={{transition:'fill .2s'}}/>
        <rect x="468" y="40" width="120" height="18" rx="2" fill="#60a5fa"/>
        <ellipse cx="528" cy="40" rx="30" ry="13" fill="#2563eb"/>
        <ellipse cx="528" cy="37" rx="19" ry="8" fill="#93c5fd"/>
        <rect x="525" y="15" width="6" height="22" fill="#60a5fa"/>
        <circle cx="528" cy="12" r="5" fill="#bfdbfe"/>
        <Windows positions={[[468,60],[492,60],[516,60],[540,60],[564,60],[468,80],[492,80],[516,80],[540,80],[564,80],[468,100],[516,100],[564,100]]} w={18} h={13}/>
        <rect x="606" y="80" width="65" height="85" rx="4" fill="#2563eb"/>
        <rect x="613" y="66" width="51" height="17" rx="2" fill="#60a5fa"/>
        <Windows positions={[[614,86],[633,86],[614,102],[633,102],[614,118],[633,118]]} w={13} h={10}/>
        <rect x="510" y="165" width="22" height="24" rx="2" fill="#d4c99a"/>
        <text x="468" y="200" fontFamily="DM Sans,sans-serif" fontSize="9" fill="#3b82f6" fontWeight="600" letterSpacing="1.5">UNIVERSITY CAMPUS</text>
        {glow('education', 528, 192, 100, 19)}
      </>)}

      {/* ══ SKILLS — YELLOW ══ */}
      {block('skills', <>
        <rect x="450" y="395" width="80" height="65" rx="4" fill={active==='skills'?'#b45309':'#ca8a04'} style={{transition:'fill .2s'}}/>
        <rect x="458" y="380" width="64" height="18" rx="2" fill="#eab308"/>
        <Windows positions={[[462,400],[490,400],[462,420],[490,420]]} w={22} h={14}/>
        <rect x="538" y="408" width="50" height="52" rx="4" fill="#eab308"/>
        <rect x="545" y="395" width="36" height="15" rx="2" fill="#fbbf24"/>
        <Windows positions={[[546,412],[566,412],[546,428],[566,428]]} w={14} h={10}/>
        <text x="450" y="478" fontFamily="DM Sans,sans-serif" fontSize="9" fill="#ca8a04" fontWeight="600" letterSpacing="1.5">SKILLS LAB</text>
        {glow('skills', 504, 468, 78, 17)}
      </>)}

      {/* ══ PROJECTS — GREEN ══ */}
      {block('projects', <>
        <rect x="30" y="390" width="50" height="145" rx="4" fill={active==='projects'?'#15803d':'#16a34a'} style={{transition:'fill .2s'}}/>
        <rect x="37" y="374" width="36" height="18" rx="2" fill="#22c55e"/>
        <line x1="55" y1="374" x2="55" y2="355" stroke="#4ade80" strokeWidth="2.5"/>
        <circle cx="55" cy="353" r="4" fill="#4ade80"/>
        <Windows positions={[[37,395],[54,395],[37,410],[54,410],[37,425],[54,425],[37,440],[54,440],[37,455],[54,455],[37,470],[54,470]]} w={11} h={8}/>
        <rect x="90" y="415" width="42" height="120" rx="4" fill="#22c55e"/>
        <rect x="97" y="401" width="28" height="16" rx="2" fill="#4ade80"/>
        <rect x="143" y="405" width="46" height="130" rx="4" fill="#15803d"/>
        <rect x="149" y="390" width="34" height="17" rx="2" fill="#22c55e"/>
        <Windows positions={[[150,412],[168,412],[150,428],[168,428],[150,444],[168,444],[150,460],[168,460],[150,476],[168,476]]} w={11} h={9}/>
        <rect x="200" y="425" width="36" height="110" rx="4" fill="#4ade80"/>
        <rect x="206" y="413" width="24" height="14" rx="2" fill="#86efac"/>
        <rect x="248" y="415" width="40" height="120" rx="4" fill="#16a34a"/>
        <rect x="254" y="401" width="28" height="16" rx="2" fill="#22c55e"/>
        <rect x="300" y="430" width="34" height="105" rx="4" fill="#15803d"/>
        <rect x="306" y="418" width="22" height="14" rx="2" fill="#4ade80"/>
        <text x="55" y="555" fontFamily="DM Sans,sans-serif" fontSize="9" fill="#16a34a" fontWeight="600" letterSpacing="1.5">INNOVATION PARK</text>
        {glow('projects', 178, 544, 128, 20)}
      </>)}

      {/* ══ CONTACT — PURPLE ══ */}
      {block('contact', <>
        <rect x="690" y="570" width="100" height="80" rx="6" fill={active==='contact'?'#9333ea':'#a855f7'} style={{transition:'fill .2s'}}/>
        <rect x="704" y="555" width="72" height="18" rx="3" fill="#c084fc"/>
        <ellipse cx="740" cy="555" rx="22" ry="10" fill="#9333ea"/>
        <rect x="737" y="535" width="6" height="20" fill="#c084fc"/>
        <circle cx="740" cy="533" r="5" fill="#e9d5ff"/>
        <Windows positions={[[703,576],[725,576],[747,576],[769,576],[703,596],[725,596],[747,596]]}/>
        <rect x="800" y="588" width="55" height="62" rx="4" fill="#9333ea"/>
        <rect x="807" y="575" width="41" height="15" rx="2" fill="#c084fc"/>
        <Windows positions={[[808,593],[827,593],[808,609],[827,609]]} w={13} h={10}/>
        <text x="695" y="668" fontFamily="DM Sans,sans-serif" fontSize="9" fill="#a855f7" fontWeight="600" letterSpacing="1.5">COMMUNITY CENTRE</text>
        {glow('contact', 745, 659, 88, 18)}
      </>)}

      {/* ── Animated Cars layer ── */}
      <Cars />
    </svg>
  );
}
