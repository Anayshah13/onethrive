import type { Curve } from "./decor";

type Point = readonly [number, number];

/**
 * Turn hand-placed points (fractions of the host's width and height) into a smooth curve
 * by Catmull-Rom interpolation, so the original sketched shapes keep their character but
 * are still rebuilt cleanly at every viewport size.
 */
function fromPoints(points: readonly Point[]): Curve {
  const last = points.length - 1;
  return (t, w, h) => {
    const s = Math.min(last - 1e-9, Math.max(0, t * last));
    const i = Math.floor(s);
    const u = s - i;
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(last, i + 2)];
    const cr = (a: number, b: number, c: number, d: number) =>
      0.5 * (2 * b + (-a + c) * u + (2 * a - 5 * b + 4 * c - d) * u * u + (-a + 3 * b - 3 * c + d) * u * u * u);
    return [cr(p0[0], p1[0], p2[0], p3[0]) * w, cr(p0[1], p1[1], p2[1], p3[1]) * h];
  };
}

/* Hero: enters mid-left, rises over the crowd, ties a small curl low in the centre, exits right. */
export const heroCurve = fromPoints([
  [-0.05, 0.3], [0.08, 0.35], [0.2, 0.44], [0.34, 0.42], [0.44, 0.34], [0.56, 0.31],
  [0.62, 0.39], [0.56, 0.49], [0.5, 0.56], [0.52, 0.62], [0.575, 0.61], [0.565, 0.57],
  [0.53, 0.59], [0.55, 0.64], [0.66, 0.67], [0.8, 0.65], [0.92, 0.58], [1.05, 0.62],
]);

export const heroCurveMobile = fromPoints([
  [-0.1, 0.24], [0.35, 0.34], [0.75, 0.29], [0.9, 0.4], [0.6, 0.48], [0.45, 0.54],
  [0.5, 0.6], [0.64, 0.59], [0.6, 0.54], [0.5, 0.57], [0.66, 0.62], [1.1, 0.6],
]);

/* Promise: a gentle wave that hugs the section's bottom padding and lifts out to the right. */
export const promiseCurve = fromPoints([
  [-0.05, 0.84], [0.18, 0.9], [0.38, 0.95], [0.6, 0.93], [0.8, 0.87], [0.93, 0.78], [1.06, 0.72],
]);

/* Offer: sweeps right across the top, swings back and exits low on the left. */
export const offerCurve = fromPoints([
  [-0.05, 0.22], [0.1, 0.18], [0.3, 0.34], [0.55, 0.28], [0.82, 0.44], [0.62, 0.62], [0.3, 0.7], [0.08, 0.82], [-0.06, 0.96],
]);

/* Closing CTA: hugs the lower edge so it never crosses the headline or the button. */
export const ctaCurve = fromPoints([
  [-0.05, 0.8], [0.18, 0.9], [0.38, 0.97], [0.6, 0.93], [0.8, 0.84], [0.93, 0.66], [1.06, 0.5],
]);
