import { Random } from "@jocabola/math";
import { getNormal, getVertex } from "./utils";
export function pointInTriangle(p1, p2, p3, a, b) {
    if (a + b > 1) {
        a = 1 - a;
        b = 1 - b;
    }
    let c = 1 - a - b;
    let pX = (a * p1.x) + (b * p2.x) + (c * p3.x);
    let pY = (a * p1.y) + (b * p2.y) + (c * p3.y);
    let pZ = (a * p1.z) + (b * p2.z) + (c * p3.z);
    return {
        x: pX,
        y: pY,
        z: pZ
    };
}
export function randomPointOnTriangle(geo, i1, i2, i3) {
    const p1 = getVertex(geo, i1);
    const p2 = getVertex(geo, i2);
    const p3 = getVertex(geo, i3);
    let a = Random.randf(0, 1);
    let b = Random.randf(0, 1);
    return pointInTriangle(p1, p2, p3, a, b);
}
export function randomFOnTriangle(geo, i1, i2, i3) {
    const p1 = getVertex(geo, i1);
    const p2 = getVertex(geo, i2);
    const p3 = getVertex(geo, i3);
    const n1 = getNormal(geo, i1);
    const n2 = getNormal(geo, i2);
    const n3 = getNormal(geo, i3);
    let a = Random.randf(0, 1);
    let b = Random.randf(0, 1);
    return {
        v: pointInTriangle(p1, p2, p3, a, b),
        n: pointInTriangle(n1, n2, n3, a, b)
    };
}
