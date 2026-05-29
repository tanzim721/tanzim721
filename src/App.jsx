import { useState, useEffect, useCallback } from 'react'
import Topbar        from './components/Topbar'
import Sidebar       from './components/Sidebar'
import City3D        from './components/City3D'
import DistrictPanel from './components/DistrictPanel'
import styles        from './App.module.css'

export default function App() {
  const [active,  setActive]  = useState(null)
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  const openDistrict = useCallback(id => {
    if (!id) return
    if (active === id) { closePanel(); return }
    setActive(id)
    setMounted(true)
    setTimeout(() => setVisible(true), 10)
  }, [active])

  const closePanel = useCallback(() => {
    setVisible(false)
    setTimeout(() => { setActive(null); setMounted(false) }, 420)
  }, [])

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') closePanel() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closePanel])

  return (
    <div className={styles.root}>
      <Topbar />
      <main className={styles.main}>
        <Sidebar active={active} onOpen={openDistrict} />

        <div className={styles.cityWrap}>
          {/* 3D city fills the right panel */}
          <City3D onBuildingClick={openDistrict} active={active} />

          {/* Legend overlay */}
          <div className={styles.legend3d}>
            {[
              { id:'work',      color:'#ef4444', label:'Work Experience'  },
              { id:'education', color:'#3b82f6', label:'Education'         },
              { id:'skills',    color:'#eab308', label:'Skills Lab'        },
              { id:'projects',  color:'#22c55e', label:'Projects'          },
              { id:'contact',   color:'#a855f7', label:'Contact'           },
            ].map(({ id, color, label }) => (
              <button key={id} className={`${styles.legendBtn} ${active===id ? styles.legendBtnActive : ''}`}
                onClick={() => openDistrict(id)}
                style={active===id ? { borderColor: color, color } : {}}>
                <span className={styles.legendDot} style={{ background: color }} />
                {label}
              </button>
            ))}
          </div>

          {/* Tip */}
          <div className={styles.tip}>🖱 Drag to orbit · Scroll to zoom · Click a building</div>

          {/* District info panel */}
          <DistrictPanel
            district={active}
            onClose={closePanel}
            visible={visible}
            mounted={mounted}
          />
        </div>
      </main>
    </div>
  )
}
