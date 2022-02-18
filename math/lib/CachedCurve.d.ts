import { Curve, Vector3 } from "three";
export declare class CachedCurve {
    private nPoints;
    points: Array<Vector3>;
    private curve;
    constructor(curve: Curve<Vector3>, nPoints?: number);
    getPoint(t: number): Vector3;
}
