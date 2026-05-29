import { useCars } from '../hooks/useCars';

/**
 * Pure SVG top-down car — no foreignObject, no nested <svg>.
 * The car is always drawn facing RIGHT (front = right side).
 * Rotation is applied by the parent <g> transform.
 *
 * Coordinate origin = top-left of bounding box (w × h).
 */
function Car({ car }) {
  const { pos, lane, axis, color, w, h, to, from, id } = car;

  const isH     = axis === 'h';
  const goingNeg = to < from;          // left (h) or up (v)

  /* Position on the SVG canvas */
  const x = isH ? pos          : lane - w / 2;
  const y = isH ? lane - h / 2 : pos;
  const cx = x + w / 2;
  const cy = y + h / 2;

  /*
   * We draw the car facing right (→).
   * Rotation to make it face its travel direction:
   *   H right  →  0°
   *   H left   →  180°
   *   V down   →  90°
   *   V up     →  -90°
   */
  let rot = 0;
  if (!isH) rot = goingNeg ? -90 : 90;
  else if (goingNeg) rot = 180;

  /* --- car geometry (drawn facing right, origin at 0,0) --- */
  const bw = w * 0.72;   // body width  (along x)
  const bh = h * 0.48;   // body height (along y)
  const bx = (w - bw) / 2;
  const by = (h - bh) / 2;

  const ww = bx * 0.9;   // wheel width
  const wh = 3.5;         // wheel height

  return (
    <g transform={`rotate(${rot},${cx},${cy})`}>
      {/* shadow */}
      <ellipse cx={cx} cy={cy + bh * 0.55} rx={bw * 0.45} ry={3} fill="rgba(0,0,0,.18)" />

      {/* body */}
      <rect x={x + bx} y={y + by} width={bw} height={bh} rx={3.5} fill={color} />

      {/* windscreen / cabin highlight */}
      <rect
        x={x + bx + bw * 0.38} y={y + by + 2}
        width={bw * 0.3} height={bh * 0.42}
        rx={2} fill="rgba(255,255,255,.32)"
      />

      {/* rear window */}
      <rect
        x={x + bx + 4} y={y + by + 3}
        width={bw * 0.22} height={bh * 0.38}
        rx={1.5} fill="rgba(255,255,255,.18)"
      />

      {/* headlights (front = right) */}
      <rect x={x + bx + bw - 2} y={y + by + 3}       width={3} height={wh} rx={1} fill="#fef9c3" />
      <rect x={x + bx + bw - 2} y={y + by + bh - 7}  width={3} height={wh} rx={1} fill="#fef9c3" />

      {/* tail lights (rear = left) */}
      <rect x={x + bx}     y={y + by + 3}      width={3} height={wh} rx={1} fill="#fca5a5" />
      <rect x={x + bx}     y={y + by + bh - 7} width={3} height={wh} rx={1} fill="#fca5a5" />

      {/* wheels — 4 corners */}
      <rect x={x + bx - ww}       y={y + by - 1}        width={ww} height={wh} rx={1.5} fill="#1e293b" />
      <rect x={x + bx - ww}       y={y + by + bh - wh}  width={ww} height={wh} rx={1.5} fill="#1e293b" />
      <rect x={x + bx + bw}       y={y + by - 1}        width={ww} height={wh} rx={1.5} fill="#1e293b" />
      <rect x={x + bx + bw}       y={y + by + bh - wh}  width={ww} height={wh} rx={1.5} fill="#1e293b" />

      {/* centre stripe */}
      <rect
        x={x + bx + bw * 0.2} y={y + by + bh * 0.43}
        width={bw * 0.55} height={1.5}
        fill="rgba(255,255,255,.2)" rx={1}
      />
    </g>
  );
}

export default function Cars() {
  const cars = useCars();
  return (
    <>
      {cars.map(car => <Car key={car.id} car={car} />)}
    </>
  );
}
