import styles from './Topbar.module.css';

const LINKS = [
  {
    title: 'Email', href: 'mailto:tanzimulislam799@gmail.com',
    svg: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
      </svg>
    ),
  },
  {
    title: 'GitHub', href: 'https://github.com/tanzim721',
    svg: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    title: 'LinkedIn', href: 'https://www.linkedin.com/in/tanzimul-islam-73083b190/',
    svg: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

export default function Topbar() {
  return (
    <header className={styles.bar}>
      <div className={styles.left}>
        <span className={styles.name}>Tanzimul Islam<span className={styles.dot}>.</span></span>
        <span className={styles.sub}>SOFTWARE ENGINEER · A CITY OF MY WORK</span>
      </div>
      <div className={styles.right}>
        {LINKS.map(({ title, href, svg }) => (
          <a key={title} href={href} target="_blank" rel="noopener" title={title} className={styles.icon}>
            {svg}
          </a>
        ))}
        <a href="/Tanzimul_Islam_CV.pdf" target="_blank" rel="noopener" className={styles.resume}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M14 3h7v7M10 14L21 3M5 5H3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-2"/>
          </svg>
          Resume
        </a>
      </div>
    </header>
  );
}
