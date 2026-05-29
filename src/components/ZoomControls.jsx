import styles from './ZoomControls.module.css';

export default function ZoomControls({ onZoom }) {
  return (
    <div className={styles.wrap}>
      {[['in','+'],['out','−'],['reset','⌖']].map(([dir, label]) => (
        <button key={dir} className={styles.btn} onClick={() => onZoom(dir)} title={`Zoom ${dir}`}>
          {label}
        </button>
      ))}
    </div>
  );
}
