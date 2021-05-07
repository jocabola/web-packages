"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MathUtils = (function () {
    function MathUtils() {
    }
    MathUtils.clamp = function (v, min, max) {
        return Math.min(max, Math.max(min, v));
    };
    MathUtils.lerp = function (v1, v2, alpha) {
        return v1 + (v2 - v1) * alpha;
    };
    MathUtils.mix = function (v1, v2, alpha) {
        return MathUtils.lerp(v1, v2, alpha);
    };
    MathUtils.smoothstep = function (min, max, val) {
        if (val < min)
            return 0;
        if (val > max)
            return 1;
        return (val - min) / (max - min);
    };
    MathUtils.step = function (thrsh, val) {
        return val < thrsh ? 0 : 1;
    };
    MathUtils.map = function (x, a, b, c, d) {
        return ((x - a) * (d - c)) / (b - a) + c;
    };
    return MathUtils;
}());
exports.default = MathUtils;
