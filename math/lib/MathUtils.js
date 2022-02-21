export default class MathUtils {
    static clamp(v, min, max) {
        return Math.min(max, Math.max(min, v));
    }
    static lerp(v1, v2, alpha) {
        return v1 + (v2 - v1) * alpha;
    }
    static mix(v1, v2, alpha) {
        return MathUtils.lerp(v1, v2, alpha);
    }
    static smoothstep(min, max, val) {
        if (val < min)
            return 0;
        if (val > max)
            return 1;
        return (val - min) / (max - min);
    }
    static step(thrsh, val) {
        return val < thrsh ? 0 : 1;
    }
    static map(x, a, b, c, d) {
        return ((x - a) * (d - c)) / (b - a) + c;
    }
    static fract(n) {
        return n % 1;
    }
}
