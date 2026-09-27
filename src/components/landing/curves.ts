import type { Curve } from "./decor";

const TAU = Math.PI * 2;

/**
 * Hero: one period of a prolate trochoid, a sweeping arc with a single clean loop at the
 * centre, tilted slightly upward to the right. Enters and exits just past the edges.
 */
export const heroCurve: Curve = (t, w, h) => {
  const a = (w * 1.3) / TAU; // horizontal advance per radian
  const bx = a * 1.6; // > a, which is what makes the loop
  const by = h * 0.2;
  const phi = Math.PI + t * TAU;
  const x = a * phi - bx * Math.sin(phi) - (a * TAU - w * 0.38);
  const y = h * 0.58 - by * Math.cos(phi) + (0.5 - t) * h * 0.12;
  return [x, y];
};

export const heroCurveMobile: Curve = (t, w, h) => {
  const a = (w * 1.1) / TAU;
  const bx = a * 2.1;
  const by = h * 0.12;
  const phi = Math.PI + t * TAU;
  const x = a * phi - bx * Math.sin(phi) - (a * TAU - w * 0.5);
  const y = h * 0.5 - by * Math.cos(phi) + (0.5 - t) * h * 0.1;
  return [x, y];
};

/* Promise: a low sine wave along the section's bottom padding. */
export const promiseCurve: Curve = (t, w, h) => [
  -w * 0.05 + w * 1.1 * t,
  h * (0.9 - 0.05 * Math.sin(TAU * (1.25 * t + 0.1))),
];

/* Offer: a cosine laid on its side, sweeping right then back left down the section. */
export const offerCurve: Curve = (t, w, h) => [w * (0.46 - 0.54 * Math.cos(TAU * t)), h * (0.16 + 0.8 * t)];

/* Closing CTA: a rising wave that hugs the lower edge before lifting out to the right. */
export const ctaCurve: Curve = (t, w, h) => [
  -w * 0.05 + w * 1.1 * t,
  h * (0.86 + 0.1 * Math.sin(1.4 * Math.PI * t) - 0.3 * t * t),
];
