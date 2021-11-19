/**
 * Robert Penner's Easing Functions: http://robertpenner.com/easing/
 * Implementation in TypeScript ported from GLSL implementation here:
 * https://github.com/glslify/glsl-easings
 */

const PI = Math.PI;
const HALF_PI = PI/2;

export function backIn(t:number): number {
	return Math.pow(t, 3) - t * Math.sin(t * PI);
}

export function backOut(t:number): number {
	const f = 1 - t;
	return 1 - (Math.pow(f, 3) - f * Math.sin(f * PI));
}

export function backInOut(t:number): number {
	const f = t < 0.5 ? 2 * t : 1 - (2 * t - 1);
	const g = Math.pow(f, 3) - f * Math.sin(f * PI);
	return t < 0.5 ? 0.5 * g : 0.5 * (1 - g) + 0.5;
}

export function bounceOut(t:number): number {
	const a = 4 / 11;
	const b = 8 / 11;
	const c = 9 / 10;

	const ca = 4356 / 361;
	const cb = 35442 / 1805;
	const cc = 16061 / 1805;

	const t2 = t * t;

	return t < a ? 7.5625 * t2
	: t < b ? 975 * t2 - 9.9 * t + 3.4
	: t < c ? ca * t2 - cb * t + cc
	: 10.8 * t * t - 20.52 * t + 10.72;
}

export function bounceIn(t:number): number {
	return 1 - bounceOut(1 - t);
}

export function bounceInOut(t:number): number {
	return t < 0.5 ? 0.5 * (1 - bounceOut(1 - t * 2))
	: 0.5 * bounceOut(t * 2 - 1) + 0.5;
}

export function circularInOut(t:number): number {
	return t < 0.5 ? 0.5 * (1 - Math.sqrt(1 - 4 * t * t))
	: 0.5 * (Math.sqrt((3 - 2 * t) * (2 * t - 1)) + 1);
}

export function circularIn(t:number): number {
	return 1 - Math.sqrt(1 - t * t);
}

export function circularOut(t: number): number {
	return Math.sqrt((2 - t) * t);
}

export function cubicInOut(t:number): number {
	return t < 0.5 ? 4 * t * t * t
	: 0.5 * Math.pow(2 * t - 2, 3) + 1;
}

export function cubicIn(t:number): number {
	return t * t * t;
}

export function cubicOut(t:number): number {
	const f = t - 1;
	return f * f * f + 1;
}

export function elasticInOut(t:number): number {
	return t < 0.5 ? 0.5 * Math.sin(+13 * HALF_PI * 2 * t) * Math.pow(2, 10 * (2 * t - 1))
	: 0.5 * Math.sin(-13 * HALF_PI * ((2 * t - 1) + 1)) * Math.pow(2, -10 * (2 * t - 1)) + 1;
}

export function elasticIn(t:number): number {
	return Math.sin(13 * t * HALF_PI) * Math.pow(2, 10 * (t - 1));
}

export function elasticOut(t:number): number {
	return Math.sin(-13 * (t + 1) * HALF_PI) * Math.pow(2, -10 * t) + 1;
}

export function exponentialInOut(t:number): number {
	return t == 0 || t == 1 ? t : t < 0.5
	? +0.5 * Math.pow(2, (20 * t) - 10)
	: -0.5 * Math.pow(2, 10 - (t * 20)) + 1;
}

export function exponentialIn(t:number): number {
	return t == 0 ? t : Math.pow(2, 10 * (t - 1));
}

export function exponentialOut(t:number): number {
	return t == 1 ? t : 1 - Math.pow(2, -10 * t);
}