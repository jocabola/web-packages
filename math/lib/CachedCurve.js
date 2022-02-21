import { Vector3 } from "three";
import MathUtils from "./MathUtils";
const TMP = new Vector3();
export class CachedCurve {
    constructor(curve, nPoints = 100) {
        this.points = curve.getPoints(nPoints);
        this.curve = curve;
        this.nPoints = this.points.length;
    }
    getPoint(t, target = null) {
        const T = t * (this.nPoints - 1);
        const k1 = ~~(T);
        const k2 = k1 != T ? Math.min(this.nPoints - 1, Math.ceil(T)) : k1;
        if (k1 === k2) {
            if (target != null)
                return target.copy(this.points[k1]);
            return this.points[k1];
        }
        const fract = MathUtils.fract(T);
        if (target != null)
            return target.copy(this.points[k1]).lerp(this.points[k2], fract);
        return TMP.copy(this.points[k1]).lerp(this.points[k2], fract);
    }
}
