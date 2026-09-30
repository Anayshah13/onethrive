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
/* Y values shifted +0.3 to position the line 30% lower in the hero frame. */
export const heroCurve = fromPoints([
  [-0.05, 0.6], [0.08, 0.65], [0.2, 0.74], [0.34, 0.72], [0.44, 0.64], [0.56, 0.61],
  [0.62, 0.69], [0.56, 0.79], [0.5, 0.86], [0.52, 0.92], [0.575, 0.91], [0.565, 0.87],
  [0.53, 0.89], [0.55, 0.94], [0.66, 0.97], [0.8, 0.95], [0.92, 0.88], [1.05, 0.92],
]);

export const heroCurveMobile = fromPoints([
  [-0.1, 0.54], [0.35, 0.64], [0.75, 0.59], [0.9, 0.70], [0.6, 0.78], [0.45, 0.84],
  [0.5, 0.90], [0.64, 0.89], [0.6, 0.84], [0.5, 0.87], [0.66, 0.92], [1.1, 0.90],
]);

/* Promise: enters low-left, arcs through the bottom third, and rises gracefully toward the right. */
export const promiseCurve = fromPoints([
  [-0.05, 0.88], [0.1, 0.93], [0.28, 0.97], [0.46, 0.95], [0.62, 0.88], [0.76, 0.8], [0.9, 0.72], [1.06, 0.62],
]);

/* Offer: one wide, smooth arc out to the right and a slightly tighter return path back to the left edge. */
export const offerCurve = fromPoints([
  [-0.05, 0.12], [0.4, 0.15], [0.82, 0.3], [0.92, 0.52], [0.7, 0.7], [0.3, 0.82], [-0.05, 0.92],
]);

/* Closing CTA: hugs the lower edge so it never crosses the headline or the button. */
export const ctaCurve = fromPoints([
  [-0.05, 0.8], [0.18, 0.9], [0.38, 0.97], [0.6, 0.93], [0.8, 0.84], [0.93, 0.66], [1.06, 0.5],
]);
