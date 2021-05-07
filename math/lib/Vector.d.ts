export default class Vec {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    copy(v: Vec): Vec;
    set(x: number, y: number, z?: number): Vec;
    clone(): Vec;
    add(v: Vec): Vec;
    sub(v: Vec): Vec;
    mul(v: Vec): Vec;
    div(v: Vec): Vec;
    scale(scl: number): Vec;
    length(): number;
    lerp(target: Vec, alpha: number): Vec;
    equals(v: Vec): boolean;
    dot(v: Vec): number;
    distanceTo(v: Vec): number;
}
