import { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, MeshReflectorMaterial, Stars } from '@react-three/drei'
import * as THREE from 'three'

/* ─── palette ─────────────────────────────────────────── */
const C = {
  work:      '#ef4444',
  education: '#3b82f6',
  skills:    '#eab308',
  projects:  '#22c55e',
  contact:   '#a855f7',
  grey:      '#94a3b8',
  road:      '#1e1e2e',
  roadLine:  '#ffffff',
  ground:    '#e8e4dc',
  sky1:      '#bfdbfe',
  sky2:      '#f0f9ff',
}

/* ─── isometric camera helper ─────────────────────────── */
function IsoCamera() {
  const { camera } = useThree()
  useEffect(() => {
    camera.position.set(28, 22, 28)
    camera.lookAt(0, 0, 0)
  }, [camera])
  return null
}

/* ─── slow auto-rotate ────────────────────────────────── */
function AutoRotate({ paused }) {
  const groupRef = useRef()
  useFrame((_, delta) => {
    if (!paused && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08
    }
  })
  return <group ref={groupRef} />
}

/* ─── Building component ──────────────────────────────── */
function Building({ x, z, w, d, h, color, id, label, onClick, active }) {
  const meshRef = useRef()
  const [hov, setHov] = useState(false)

  const isActive = active === id
  const bright = hov || isActive

  // face color (slightly lighter front face illusion via emissive)
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    emissive: new THREE.Color(color),
    emissiveIntensity: bright ? 0.22 : 0.04,
    roughness: 0.55,
    metalness: 0.1,
  }), [color, bright])

  // side face (darker)
  const matSide = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(color).multiplyScalar(0.65),
    roughness: 0.7,
    metalness: 0.05,
  }), [color])

  useFrame(() => {
    if (meshRef.current) {
      const target = bright ? h * 1.04 : h
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, target / h, 0.08)
      meshRef.current.position.y = meshRef.current.scale.y * h / 2
    }
  })

  /* window grid on the front face */
  const windows = useMemo(() => {
    const wins = []
    const cols = Math.max(1, Math.floor(w / 1.4))
    const rows = Math.max(1, Math.floor(h / 1.6))
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        wins.push({ r, c, lit: Math.random() > 0.25 })
      }
    }
    return wins
  }, [w, h])

  return (
    <group position={[x, 0, z]}>
      {/* shadow plane */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0.01, d/2 + 0.3]} receiveShadow>
        <planeGeometry args={[w + 1.2, d + 0.6]} />
        <meshBasicMaterial color="#00000015" transparent />
      </mesh>

      {/* main box */}
      <mesh ref={meshRef} position={[0, h/2, 0]} castShadow receiveShadow
        onClick={e => { e.stopPropagation(); onClick(id) }}
        onPointerEnter={e => { e.stopPropagation(); setHov(true); document.body.style.cursor = 'pointer' }}
        onPointerLeave={e => { e.stopPropagation(); setHov(false); document.body.style.cursor = 'default' }}
      >
        <boxGeometry args={[w, h, d]} />
        {/* custom face materials: [+x, -x, top, bottom, front, back] */}
        <meshStandardMaterial attach="material-0" color={new THREE.Color(color).multiplyScalar(0.7)} roughness={0.7} />
        <meshStandardMaterial attach="material-1" color={new THREE.Color(color).multiplyScalar(0.7)} roughness={0.7} />
        <meshStandardMaterial attach="material-2" color={new THREE.Color(color).multiplyScalar(0.9)} roughness={0.3} metalness={0.2} emissive={new THREE.Color(color)} emissiveIntensity={bright ? 0.3 : 0.06} />
        <meshStandardMaterial attach="material-3" color="#111" roughness={1} />
        <meshStandardMaterial attach="material-4" color={color} roughness={0.5} metalness={0.1} emissive={new THREE.Color(color)} emissiveIntensity={bright ? 0.25 : 0.05} />
        <meshStandardMaterial attach="material-5" color={new THREE.Color(color).multiplyScalar(0.75)} roughness={0.65} />
      </mesh>

      {/* windows on front face */}
      {windows.map(({ r, c, lit }, i) => {
        const cols = Math.max(1, Math.floor(w / 1.4))
        const rows = Math.max(1, Math.floor(h / 1.6))
        const wx = -w/2 + (c + 0.7) * (w / cols)
        const wy = 0.5 + r * (h / rows) + 0.3
        return (
          <mesh key={i} position={[wx, wy, d/2 + 0.02]}>
            <planeGeometry args={[0.35, 0.5]} />
            <meshBasicMaterial
              color={lit ? (isActive ? '#fff9c4' : '#fffde7') : '#1e293b'}
              transparent opacity={lit ? 0.9 : 0.6}
            />
          </mesh>
        )
      })}

      {/* roof detail / antenna for tall buildings */}
      {h > 5 && (
        <>
          <mesh position={[0, h + 0.15, 0]}>
            <boxGeometry args={[w * 0.3, 0.3, d * 0.3]} />
            <meshStandardMaterial color={new THREE.Color(color).multiplyScalar(0.8)} />
          </mesh>
          <mesh position={[0, h + 0.6, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.9, 6]} />
            <meshStandardMaterial color="#cbd5e1" />
          </mesh>
          <pointLight position={[0, h + 1.1, 0]} color={isActive ? color : '#ff6b6b'} intensity={isActive ? 1.5 : 0.4} distance={4} />
        </>
      )}

      {/* active glow ring */}
      {isActive && (
        <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0.05, 0]}>
          <ringGeometry args={[Math.max(w,d) * 0.7, Math.max(w,d) * 0.85, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
      )}

      {/* label */}
      <LabelSprite text={label} y={h + 1.2} color={color} visible={hov || isActive} />
    </group>
  )
}

/* ─── floating text label ─────────────────────────────── */
function LabelSprite({ text, y, color, visible }) {
  const ref = useRef()
  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.quaternion.copy(camera.quaternion)
      ref.current.material.opacity = THREE.MathUtils.lerp(
        ref.current.material.opacity,
        visible ? 1 : 0,
        0.1
      )
    }
  })

  const texture = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 256; c.height = 64
    const ctx = c.getContext('2d')
    ctx.fillStyle = color + 'dd'
    ctx.roundRect(4, 4, 248, 56, 12)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 22px DM Sans, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, 128, 32)
    return new THREE.CanvasTexture(c)
  }, [text, color])

  return (
    <mesh ref={ref} position={[0, y, 0]}>
      <planeGeometry args={[3.2, 0.8]} />
      <meshBasicMaterial map={texture} transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  )
}

/* ─── Road segment ────────────────────────────────────── */
function Road({ x, z, w, d, isMain }) {
  return (
    <mesh position={[x, 0.02, z]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
      <planeGeometry args={[w, d]} />
      <meshStandardMaterial color={isMain ? '#1e1e2e' : '#252535'} roughness={0.9} />
    </mesh>
  )
}

/* ─── Centre dashes ───────────────────────────────────── */
function RoadDashes({ axis, pos, length, isMain }) {
  const count = Math.floor(length / 2.2)
  return Array.from({ length: count }, (_, i) => {
    const off = -length/2 + i * 2.2 + 0.8
    const [x, z] = axis === 'x' ? [pos + off, 0] : [0, pos + off]
    return (
      <mesh key={i} position={[x, 0.03, z]} rotation={[-Math.PI/2, 0, axis === 'z' ? 0 : 0]}>
        <planeGeometry args={axis === 'x' ? [1.1, 0.08] : [0.08, 1.1]} />
        <meshBasicMaterial color="#ffffff30" />
      </mesh>
    )
  })
}

/* ─── 3D Car ──────────────────────────────────────────── */
function Car3D({ carData }) {
  const ref = useRef()
  const posRef = useRef(carData.start)
  const speed = carData.speed

  useFrame((_, delta) => {
    if (!ref.current) return
    posRef.current += speed * delta * 12
    const range = Math.abs(carData.end - carData.start)
    if (posRef.current > range) posRef.current -= range

    const t = posRef.current
    const sign = carData.end > carData.start ? 1 : -1

    if (carData.axis === 'x') {
      ref.current.position.x = carData.start + t * sign
      ref.current.position.z = carData.lane
      ref.current.rotation.y = sign > 0 ? 0 : Math.PI
    } else {
      ref.current.position.x = carData.lane
      ref.current.position.z = carData.start + t * sign
      ref.current.rotation.y = sign > 0 ? -Math.PI/2 : Math.PI/2
    }
    ref.current.position.y = 0.18
  })

  const { color, w, h: ch, d } = carData
  const bodyColor = new THREE.Color(color)
  const roofColor = new THREE.Color(color).multiplyScalar(0.8)

  return (
    <group ref={ref}>
      {/* body */}
      <mesh castShadow position={[0, ch * 0.3, 0]}>
        <boxGeometry args={[w, ch * 0.55, d]} />
        <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.4} />
      </mesh>
      {/* cabin */}
      <mesh castShadow position={[w * 0.05, ch * 0.75, 0]}>
        <boxGeometry args={[w * 0.55, ch * 0.4, d * 0.8]} />
        <meshStandardMaterial color={roofColor} roughness={0.4} metalness={0.3} />
      </mesh>
      {/* windscreen */}
      <mesh position={[w * 0.33, ch * 0.75, 0]}>
        <boxGeometry args={[0.02, ch * 0.32, d * 0.7]} />
        <meshStandardMaterial color="#bfdbfe" transparent opacity={0.7} metalness={0.1} />
      </mesh>
      {/* headlights */}
      <pointLight position={[w * 0.55, ch * 0.3, 0]} color="#fef9c3" intensity={0.5} distance={3} />
      {/* tail lights glow */}
      <mesh position={[-w * 0.5, ch * 0.3, 0]}>
        <boxGeometry args={[0.05, ch * 0.2, d * 0.6]} />
        <meshBasicMaterial color="#fca5a5" />
      </mesh>
      {/* wheels */}
      {[[-w*0.3, d*0.48], [-w*0.3, -d*0.48], [w*0.3, d*0.48], [w*0.3, -d*0.48]].map(([wx, wz], i) => (
        <mesh key={i} position={[wx, 0.08, wz]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.12, 10]} />
          <meshStandardMaterial color="#1e293b" roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

/* ─── Tree ────────────────────────────────────────────── */
function Tree({ x, z }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.8, 6]} />
        <meshStandardMaterial color="#92400e" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.3, 0]} castShadow>
        <sphereGeometry args={[0.55, 8, 8]} />
        <meshStandardMaterial color="#16a34a" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.8, 0]} castShadow>
        <sphereGeometry args={[0.38, 8, 8]} />
        <meshStandardMaterial color="#15803d" roughness={0.8} />
      </mesh>
    </group>
  )
}

/* ─── Ground grid ─────────────────────────────────────── */
function Ground() {
  return (
    <>
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#d4cfc6" roughness={0.9} />
      </mesh>
      {/* city blocks (beige fill between roads) */}
      {[
        [-8, -8, 10, 10], [8, -8, 10, 10],
        [-8, 8, 10, 10],  [8, 8, 10, 10],
      ].map(([x, z, w, d], i) => (
        <mesh key={i} rotation={[-Math.PI/2, 0, 0]} position={[x, 0.01, z]} receiveShadow>
          <planeGeometry args={[w, d]} />
          <meshStandardMaterial color="#e8e2d8" roughness={1} />
        </mesh>
      ))}
    </>
  )
}

/* ─── Main scene ──────────────────────────────────────── */
function CityScene({ onBuildingClick, active }) {
  const groupRef = useRef()
  const [userDrag, setUserDrag] = useState(false)

  useFrame((_, delta) => {
    if (!userDrag && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.07
    }
  })

  /* Buildings: { id, label, x, z, w, d, h, color } */
  const buildings = [
    // Work — red cluster top-left
    { id:'work', label:'ADPLAY HQ',        x:-10, z:-10, w:2.2, d:2.2, h:9,   color:C.work },
    { id:'work', label:'ADPLAY HQ',        x:-7,  z:-10, w:1.4, d:1.4, h:6,   color:'#f87171' },
    { id:'work', label:'ADPLAY HQ',        x:-10, z:-7,  w:1.2, d:1.6, h:4.5, color:'#fca5a5' },

    // Education — blue cluster top-right
    { id:'education', label:'UNIVERSITY',  x:8,   z:-10, w:3,   d:2.5, h:5,   color:C.education },
    { id:'education', label:'UNIVERSITY',  x:12,  z:-10, w:1.8, d:1.8, h:7,   color:'#2563eb' },
    { id:'education', label:'UNIVERSITY',  x:8,   z:-7,  w:1.5, d:2,   h:3.5, color:'#60a5fa' },

    // Skills — yellow cluster bottom-right
    { id:'skills', label:'SKILLS LAB',     x:9,   z:8,   w:2.5, d:2,   h:4,   color:C.skills },
    { id:'skills', label:'SKILLS LAB',     x:12,  z:10,  w:1.5, d:1.5, h:6,   color:'#ca8a04' },

    // Projects — green cluster bottom-left
    { id:'projects', label:'INNO PARK',    x:-11, z:8,   w:1.6, d:1.6, h:8,   color:C.projects },
    { id:'projects', label:'INNO PARK',    x:-8,  z:9,   w:1.4, d:1.4, h:5.5, color:'#16a34a' },
    { id:'projects', label:'INNO PARK',    x:-11, z:11,  w:1.8, d:1.5, h:4,   color:'#4ade80' },
    { id:'projects', label:'INNO PARK',    x:-8,  z:12,  w:1.2, d:1.2, h:3,   color:'#15803d' },

    // Contact — purple cluster far right
    { id:'contact', label:'COMMUNITY',     x:11,  z:2,   w:2,   d:2,   h:5,   color:C.contact },
    { id:'contact', label:'COMMUNITY',     x:14,  z:2,   w:1.3, d:1.5, h:3.5, color:'#9333ea' },

    // Grey classified
    { id:null, label:'', x:-2,  z:-13, w:1.2, d:1.2, h:3,   color:C.grey },
    { id:null, label:'', x:2,   z:-13, w:0.9, d:0.9, h:2.5, color:C.grey },
    { id:null, label:'', x:14,  z:-5,  w:1.4, d:1.4, h:5,   color:C.grey },
    { id:null, label:'', x:-14, z:3,   w:1,   d:1,   h:4,   color:C.grey },
    { id:null, label:'', x:3,   z:13,  w:1.3, d:1.3, h:3.5, color:C.grey },
    { id:null, label:'', x:-3,  z:13,  w:1,   d:1,   h:2.8, color:C.grey },
  ]

  /* Cars on roads */
  const cars = [
    // main H road (z=0)
    { axis:'x', lane: -0.7, start:-20, end:20,  speed:1.4,  color:'#f59e0b', w:1.0, h:0.4, d:0.55 },
    { axis:'x', lane:  0.7, start:20,  end:-20, speed:1.1,  color:'#6366f1', w:0.9, h:0.4, d:0.5  },
    { axis:'x', lane: -0.7, start:-5,  end:20,  speed:1.9,  color:'#ec4899', w:0.8, h:0.35,d:0.48 },
    { axis:'x', lane:  0.7, start:8,   end:-20, speed:1.5,  color:'#0ea5e9', w:0.95,h:0.4, d:0.52 },
    { axis:'x', lane: -0.7, start:12,  end:20,  speed:0.9,  color:'#f97316', w:1.1, h:0.4, d:0.58 },

    // main V road (x=0)
    { axis:'z', lane: -0.7, start:-20, end:20,  speed:1.3,  color:'#facc15', w:1.0, h:0.4, d:0.55 },
    { axis:'z', lane:  0.7, start:20,  end:-20, speed:1.6,  color:'#60a5fa', w:0.9, h:0.38,d:0.5  },
    { axis:'z', lane: -0.7, start:5,   end:20,  speed:2.0,  color:'#f472b6', w:0.85,h:0.38,d:0.48 },
    { axis:'z', lane:  0.7, start:-8,  end:-20, speed:1.2,  color:'#4ade80', w:1.0, h:0.4, d:0.54 },

    // secondary H road (z = -5)
    { axis:'x', lane:-5.5,  start:-20, end:-2,  speed:1.1,  color:'#84cc16', w:0.8, h:0.35,d:0.46 },
    { axis:'x', lane:-4.5,  start:-2,  end:-20, speed:1.4,  color:'#fb7185', w:0.75,h:0.35,d:0.44 },

    // secondary H road (z = 5)
    { axis:'x', lane: 4.5,  start:2,   end:20,  speed:1.3,  color:'#34d399', w:0.85,h:0.38,d:0.48 },
    { axis:'x', lane: 5.5,  start:20,  end:2,   speed:1.0,  color:'#a78bfa', w:0.8, h:0.35,d:0.46 },
  ]

  const trees = [
    [-5, -5],[-5, 5],[5,-5],[5,5],
    [-15,-15],[15,-15],[-15,15],[15,15],
    [-13, 0],[13, 0],[0,-13],[0,13],
    [-7,-14],[7,-14],[-7,14],[7,14],
  ]

  return (
    <group ref={groupRef}>
      <Ground />

      {/* Roads */}
      <Road x={0}    z={0} w={40} d={2}   isMain={true}  />
      <Road x={0}    z={0} w={2}  d={40}  isMain={true}  />
      <Road x={-11}  z={-2.5} w={16} d={1.4} isMain={false} />
      <Road x={5}    z={5}    w={1.4} d={16} isMain={false} />
      <Road x={0}   z={-5}  w={20} d={1.4} isMain={false} />
      <Road x={0}   z={5}   w={20} d={1.4} isMain={false} />

      {/* Road dashes */}
      <RoadDashes axis="x" pos={0} length={40} isMain />
      <RoadDashes axis="z" pos={0} length={40} isMain />

      {/* Buildings */}
      {buildings.map((b, i) => (
        <Building key={i} {...b}
          onClick={b.id ? onBuildingClick : () => {}}
          active={active}
        />
      ))}

      {/* Trees */}
      {trees.map(([x, z], i) => <Tree key={i} x={x} z={z} />)}

      {/* Cars */}
      {cars.map((c, i) => (
        <Car3D key={i} carData={{ ...c, start: c.start, end: c.end }} />
      ))}
    </group>
  )
}

/* ─── Lights ──────────────────────────────────────────── */
function Lights() {
  return (
    <>
      <ambientLight intensity={0.7} color="#e0e8ff" />
      <directionalLight
        position={[20, 30, 20]} intensity={1.4} color="#fff8e7"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <directionalLight position={[-15, 20, -10]} intensity={0.4} color="#bfdbfe" />
      <hemisphereLight skyColor="#bfdbfe" groundColor="#d4cfc6" intensity={0.5} />
    </>
  )
}

/* ─── Exported component ──────────────────────────────── */
export default function City3D({ onBuildingClick, active }) {
  return (
    <Canvas
      shadows
      camera={{ position: [28, 22, 28], fov: 45 }}
      style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg,#bfdbfe 0%,#f0f9ff 60%,#e2e8f0 100%)' }}
      gl={{ antialias: true, alpha: false }}
    >
      <Lights />
      <Stars radius={80} depth={30} count={400} factor={2} fade speed={0.5} />

      <CityScene onBuildingClick={onBuildingClick} active={active} />

      <OrbitControls
        enablePan={false}
        minDistance={12}
        maxDistance={55}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.4}
        autoRotate
        autoRotateSpeed={0.9}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  )
}
