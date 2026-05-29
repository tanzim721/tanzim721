import { LEGEND } from '../data';
import styles from './Sidebar.module.css';

export default function Sidebar({ active, onOpen }) {
  return (
    <aside className={styles.panel}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>A PORTFOLIO LAID OUT AS A CITY</p>

        <h1 className={styles.title}>
          A city of my<br />
          <em className={styles.accent}>work.</em>
        </h1>

        <p className={styles.desc}>
          Each block is a part of my résumé. Click an <strong>office</strong> for
          experience, the <strong>campus</strong> for education, the <strong>lab</strong> for
          skills, the <strong>park</strong> for projects. Grey blocks are classified.
        </p>

        <nav className={styles.legend}>
          {LEGEND.map(({ id, label, sub, color }) => (
            <button
              key={id}
              className={`${styles.row} ${active === id ? styles.rowActive : ''}`}
              onClick={() => onOpen(id)}
              style={active === id ? { borderColor: color + '55', background: 'white' } : {}}
            >
              <span className={styles.pip} style={{ background: color }} />
              <span><strong>{label}</strong> — {sub}</span>
            </button>
          ))}
          <div className={`${styles.row} ${styles.rowMuted}`}>
            <span className={styles.pip} style={{ background: '#9ca3af' }} />
            <span>Grey blocks · classified</span>
          </div>
        </nav>

        <p className={styles.hint}>DRAG · SCROLL TO ZOOM · CLICK A BUILDING</p>
      </div>
    </aside>
  );
}
