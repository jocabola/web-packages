const PI = Math.PI;
const HALF_PI = PI / 2;
export function linear(t) {
    return t;
}
export function backIn(t) {
    return Math.pow(t, 3) - t * Math.sin(t * PI);
}
export function backOut(t) {
    const f = 1 - t;
    return 1 - (Math.pow(f, 3) - f * Math.sin(f * PI));
}
export function backInOut(t) {
    const f = t < 0.5 ? 2 * t : 1 - (2 * t - 1);
    const g = Math.pow(f, 3) - f * Math.sin(f * PI);
    return t < 0.5 ? 0.5 * g : 0.5 * (1 - g) + 0.5;
}
export function bounceOut(t) {
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
export function bounceIn(t) {
    return 1 - bounceOut(1 - t);
}
export function bounceInOut(t) {
    return t < 0.5 ? 0.5 * (1 - bounceOut(1 - t * 2))
        : 0.5 * bounceOut(t * 2 - 1) + 0.5;
}
export function circularInOut(t) {
    return t < 0.5 ? 0.5 * (1 - Math.sqrt(1 - 4 * t * t))
        : 0.5 * (Math.sqrt((3 - 2 * t) * (2 * t - 1)) + 1);
}
export function circularIn(t) {
    return 1 - Math.sqrt(1 - t * t);
}
export function circularOut(t) {
    return Math.sqrt((2 - t) * t);
}
export function cubicInOut(t) {
    return t < 0.5 ? 4 * t * t * t
        : 0.5 * Math.pow(2 * t - 2, 3) + 1;
}
export function cubicIn(t) {
    return t * t * t;
}
export function cubicOut(t) {
    const f = t - 1;
    return f * f * f + 1;
}
export function elasticInOut(t) {
    return t < 0.5 ? 0.5 * Math.sin(+13 * HALF_PI * 2 * t) * Math.pow(2, 10 * (2 * t - 1))
        : 0.5 * Math.sin(-13 * HALF_PI * ((2 * t - 1) + 1)) * Math.pow(2, -10 * (2 * t - 1)) + 1;
}
export function elasticIn(t) {
    return Math.sin(13 * t * HALF_PI) * Math.pow(2, 10 * (t - 1));
}
export function elasticOut(t) {
    return Math.sin(-13 * (t + 1) * HALF_PI) * Math.pow(2, -10 * t) + 1;
}
export function exponentialInOut(t) {
    return t == 0 || t == 1 ? t : t < 0.5
        ? +0.5 * Math.pow(2, (20 * t) - 10)
        : -0.5 * Math.pow(2, 10 - (t * 20)) + 1;
}
export function exponentialIn(t) {
    return t == 0 ? t : Math.pow(2, 10 * (t - 1));
}
export function exponentialOut(t) {
    return t == 1 ? t : 1 - Math.pow(2, -10 * t);
}
export function quadraticInOut(t) {
    const p = 2 * t * t;
    return t < 0.5 ? p : -p + (4 * t) - 1;
}
export function quadraticIn(t) {
    return t * t;
}
export function quadraticOut(t) {
    return -t * (t - 2);
}
export function quarticInOut(t) {
    return t < 0.5
        ? +8 * Math.pow(t, 4)
        : -8 * Math.pow(t - 1, 4) + 1;
}
export function quarticIn(t) {
    return Math.pow(t, 4);
}
export function quarticOut(t) {
    return Math.pow(t - 1, 3) * (1 - t) + 1;
}
export function qinticInOut(t) {
    return t < 0.5
        ? +16 * Math.pow(t, 5)
        : -0.5 * Math.pow(2 * t - 2, 5) + 1;
}
export function qinticIn(t) {
    return Math.pow(t, 5);
}
export function qinticOut(t) {
    return 1 - (Math.pow(t - 1, 5));
}
export function sineInOut(t) {
    return -0.5 * (Math.cos(PI * t) - 1);
}
export function sineIn(t) {
    return Math.sin((t - 1) * HALF_PI) + 1;
}
export function sineOut(t) {
    return Math.sin(t * HALF_PI);
}
