import { useRef, useEffect, useCallback } from 'react';

const SVG_W = 900;
const SVG_H = 700;

/* Slow auto-pan: drifts gently around the centre */
const AUTO_PAN_SPEED = 0.18;   // px per frame
const AUTO_PAN_RANGE = 60;     // max px offset from centre

export function usePanZoom() {
  const viewportRef = useRef(null);
  const stageRef    = useRef(null);

  const scale   = useRef(1);
  const panX    = useRef(0);
  const panY    = useRef(0);
  const centrePx = useRef({ x: 0, y: 0 });

  /* auto-pan state */
  const autoAngle = useRef(0);          // slowly increments each frame
  const userActive = useRef(false);     // pause auto when user is dragging
  const autoRaf  = useRef(null);

  const drag = useRef({ active: false, sx: 0, sy: 0, spx: 0, spy: 0 });

  /* ── apply transform ── */
  const apply = useCallback(() => {
    if (stageRef.current)
      stageRef.current.style.transform =
        `translate(${panX.current}px,${panY.current}px) scale(${scale.current})`;
  }, []);

  /* ── centre map (initial + resize) ── */
  const centre = useCallback(() => {
    if (!viewportRef.current) return;
    const { clientWidth: vw, clientHeight: vh } = viewportRef.current;
    const cx = (vw - SVG_W * scale.current) / 2;
    const cy = (vh - SVG_H * scale.current) / 2;
    centrePx.current = { x: cx, y: cy };
    panX.current = cx;
    panY.current = cy;
    apply();
  }, [apply]);

  /* ── auto-pan loop ── */
  useEffect(() => {
    const tick = () => {
      if (!userActive.current) {
        autoAngle.current += AUTO_PAN_SPEED * 0.012;   // radians/frame
        const ox = Math.sin(autoAngle.current)              * AUTO_PAN_RANGE;
        const oy = Math.sin(autoAngle.current * 0.63 + 1.1) * AUTO_PAN_RANGE * 0.6;
        panX.current = centrePx.current.x + ox;
        panY.current = centrePx.current.y + oy;
        apply();
      }
      autoRaf.current = requestAnimationFrame(tick);
    };
    autoRaf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(autoRaf.current);
  }, [apply]);

  /* ── init / resize ── */
  useEffect(() => {
    centre();
    window.addEventListener('resize', centre);
    return () => window.removeEventListener('resize', centre);
  }, [centre]);

  /* ── wheel zoom (centred on cursor) ── */
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const onWheel = e => {
      e.preventDefault();
      userActive.current = true;
      const rect = vp.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      const d  = e.deltaY > 0 ? 0.92 : 1.09;
      const ns = Math.min(2.8, Math.max(0.35, scale.current * d));
      panX.current = mx - (mx - panX.current) * (ns / scale.current);
      panY.current = my - (my - panY.current) * (ns / scale.current);
      scale.current = ns;
      apply();
      /* resume auto-pan after 2 s idle */
      clearTimeout(vp._wt);
      vp._wt = setTimeout(() => {
        userActive.current = false;
        centrePx.current = { x: panX.current, y: panY.current };
      }, 2000);
    };
    vp.addEventListener('wheel', onWheel, { passive: false });
    return () => vp.removeEventListener('wheel', onWheel);
  }, [apply]);

  /* ── mouse drag ── */
  const onMouseDown = useCallback(e => {
    if (e.target.closest('.city-block')) return;
    userActive.current = true;
    drag.current = { active: true, sx: e.clientX, sy: e.clientY, spx: panX.current, spy: panY.current };
    if (viewportRef.current) viewportRef.current.style.cursor = 'grabbing';
  }, []);

  const onMouseMove = useCallback(e => {
    if (!drag.current.active) return;
    panX.current = drag.current.spx + (e.clientX - drag.current.sx);
    panY.current = drag.current.spy + (e.clientY - drag.current.sy);
    apply();
  }, [apply]);

  const onMouseUp = useCallback(() => {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (viewportRef.current) viewportRef.current.style.cursor = 'grab';
    /* resume auto-pan after 2 s */
    setTimeout(() => {
      userActive.current = false;
      centrePx.current = { x: panX.current, y: panY.current };
    }, 2000);
  }, []);

  /* ── zoom buttons ── */
  const zoomBtn = useCallback(dir => {
    if (!viewportRef.current) return;
    userActive.current = true;
    const vw = viewportRef.current.clientWidth / 2;
    const vh = viewportRef.current.clientHeight / 2;
    if (dir === 'reset') { scale.current = 1; centre(); userActive.current = false; return; }
    const f  = dir === 'in' ? 1.22 : 0.82;
    const ns = Math.min(2.8, Math.max(0.35, scale.current * f));
    panX.current = vw - (vw - panX.current) * (ns / scale.current);
    panY.current = vh - (vh - panY.current) * (ns / scale.current);
    scale.current = ns;
    apply();
    setTimeout(() => {
      userActive.current = false;
      centrePx.current = { x: panX.current, y: panY.current };
    }, 2000);
  }, [apply, centre]);

  return { viewportRef, stageRef, onMouseDown, onMouseMove, onMouseUp, zoomBtn };
}
