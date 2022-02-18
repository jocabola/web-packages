"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachedCurve = void 0;
const three_1 = require("three");
const MathUtils_1 = __importDefault(require("./MathUtils"));
const TMP = new three_1.Vector3();
class CachedCurve {
    constructor(curve, nPoints = 100) {
        this.points = curve.getPoints(nPoints);
    }
    getPoint(t) {
        const T = t * (this.nPoints - 1);
        const k1 = ~~(T);
        const k2 = k1 != T ? Math.min(this.nPoints - 1, Math.ceil(T)) : k1;
        if (k1 === k2)
            return this.points[k1];
        const fract = MathUtils_1.default.fract(T);
        return TMP.copy(this.points[k1]).lerp(this.points[k2], fract);
    }
}
exports.CachedCurve = CachedCurve;
