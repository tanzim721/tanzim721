import { DISTRICTS } from '../data';
import { useState } from 'react';
import styles from './DistrictPanel.module.css';

/* ── Work ── */
function WorkPanel({ d }) {
  const [open, setOpen] = useState(0);
  return (
    <div className={styles.stack}>
      {d.entries.map((e, i) => (
        <div key={i}
          className={`${styles.card} ${open === i ? styles.cardOpen : ''}`}
          style={open === i ? { borderColor: d.color, background: d.bg } : {}}
          onClick={() => setOpen(open === i ? -1 : i)}
        >
          <div className={styles.cardHead}>
            <div>
              <div className={styles.role}>{e.role}</div>
              <div className={styles.co}>{e.company} · {e.location}</div>
              <span className={styles.date} style={{ background: d.bg, color: d.color, borderColor: d.border }}>{e.date}</span>
            </div>
            <span className={styles.chevron} style={{ transform: open === i ? 'rotate(180deg)' : 'none' }}>▼</span>
          </div>
          {open === i && (
            <ul className={styles.bullets}>
              {e.bullets.map((b, j) => (
                <li key={j}><span style={{ color: d.color }}>▸</span>{b}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Education ── */
function EducationPanel({ d }) {
  return (
    <div className={styles.stack}>
      {d.entries.map((e, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.role}>{e.name}</div>
          <div className={styles.co}>{e.inst}</div>
          <div style={{ fontSize: 12, color: d.color, marginTop: 4 }}>{e.detail}</div>
        </div>
      ))}
      <div className={styles.card} style={{ borderColor: d.border, background: d.bg }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: '#1d4ed8', marginBottom: 6 }}>Career Objective</div>
        <div style={{ fontSize: 12.5, color: '#374151', lineHeight: 1.7 }}>{d.objective}</div>
      </div>
    </div>
  );
}

/* ── Skills ── */
function SkillsPanel({ d }) {
  const [hov, setHov] = useState(null);
  return (
    <div className={styles.stack}>
      {d.groups.map((g, i) => (
        <div key={i}>
          <div className={styles.groupLabel}>{g.label}</div>
          <div className={styles.tags}>
            {g.items.map((item, j) => {
              const k = `${i}-${j}`;
              return (
                <span key={j} className={styles.tag}
                  onMouseEnter={() => setHov(k)} onMouseLeave={() => setHov(null)}
                  style={hov === k ? { background: d.bg, color: d.color, borderColor: d.color, fontWeight: 500 } : {}}>
                  {item}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Projects ── */
function ProjectsPanel({ d }) {
  return (
    <div className={styles.stack}>
      {d.items.map((p, i) => (
        <div key={i} className={styles.projCard}
          onMouseEnter={e => { e.currentTarget.style.borderColor = d.color; e.currentTarget.style.boxShadow = `0 4px 14px ${d.color}22`; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.boxShadow = ''; }}>
          <div className={styles.projName}>
            {p.url
              ? <a href={p.url} target="_blank" rel="noopener">↗ {p.name}</a>
              : p.name}
          </div>
          <div className={styles.projDesc}>{p.desc}</div>
          <div className={styles.tags}>
            {p.tech.map((t, j) => (
              <span key={j} className={styles.tag} style={{ background: d.bg, color: d.color, borderColor: d.border, fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Contact ── */
function ContactPanel({ d }) {
  return (
    <div className={styles.stack}>
      <p className={styles.contactIntro}>
        Open to full-time roles, freelance projects, and interesting collaborations.
        Drop me a message and I'll get back to you soon.
      </p>
      {d.links.map((l, i) => {
        const inner = (
          <div className={styles.contactItem}
            onMouseEnter={e => { e.currentTarget.style.borderColor = d.color; e.currentTarget.style.transform = 'translateX(3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.transform = ''; }}>
            <div className={styles.contactIcon} style={{ background: d.bg }}>{l.icon}</div>
            <div>
              <div className={styles.contactLabel}>{l.label}</div>
              <div className={styles.contactVal}>{l.val}</div>
            </div>
          </div>
        );
        return l.href
          ? <a key={i} href={l.href} target="_blank" rel="noopener" style={{ textDecoration: 'none' }}>{inner}</a>
          : <div key={i}>{inner}</div>;
      })}
    </div>
  );
}

/* ── Main panel ── */
export default function DistrictPanel({ district, onClose, visible, mounted }) {
  const d = DISTRICTS[district] || {};

  return (
    <div className={`${styles.panel} ${visible ? styles.panelOpen : ''}`}
      style={{ pointerEvents: visible ? 'all' : 'none' }}>
      <button className={styles.close} onClick={onClose}>✕</button>
      {mounted && district && (
        <div className={styles.body} key={district}>
          <span className={styles.tag} style={{ background: d.bg, color: d.color, borderColor: d.border + 'aa' }}>{d.tag}</span>
          <h2 className={styles.title}>{d.title}</h2>
          {district === 'work'      && <WorkPanel d={d} />}
          {district === 'education' && <EducationPanel d={d} />}
          {district === 'skills'    && <SkillsPanel d={d} />}
          {district === 'projects'  && <ProjectsPanel d={d} />}
          {district === 'contact'   && <ContactPanel d={d} />}
        </div>
      )}
    </div>
  );
}
