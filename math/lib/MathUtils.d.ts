export default class MathUtils {
    static clamp(v: number, min: number, max: number): number;
    static lerp(v1: number, v2: number, alpha: number): number;
    static mix(v1: number, v2: number, alpha: number): number;
    static smoothstep(min: number, max: number, val: number): number;
    static step(thrsh: number, val: number): number;
    static map(x: number, a: number, b: number, c: number, d: number): number;
    static fract(n: number): number;
}
