import { Random } from "@jocabola/math";
import { BufferGeometry } from "three";
import { pt, F } from "./types";
import { getNormal, getUV, getVertex } from "./utils";

export function pointInTriangle(p1:pt, p2:pt, p3:pt, a:number, b:number):pt {
    if (a + b > 1) {
        a = 1-a;
        b = 1-b;
    }

    let c = 1-a-b;
    let pX = (a*p1.x)+(b*p2.x)+(c*p3.x);
    let pY = (a*p1.y)+(b*p2.y)+(c*p3.y);
    let pZ = (a*p1.z)+(b*p2.z)+(c*p3.z);

    return {
        x: pX,
        y: pY,
        z: pZ
    }
}

export function uvInTriangle(p1:pt, p2:pt, p3:pt, a:number, b:number):pt {
    if (a + b > 1) {
        a = 1-a;
        b = 1-b;
    }

    let c = 1-a-b;
    let pX = (a*p1.x)+(b*p2.x)+(c*p3.x);
    let pY = (a*p1.y)+(b*p2.y)+(c*p3.y);

    return {
        x: pX,
        y: pY
    }
}

export function randomPointOnTriangle(geo:BufferGeometry, i1:number, i2:number, i3:number):pt {
    const p1 = getVertex(geo, i1);
    const p2 = getVertex(geo, i2);
    const p3 = getVertex(geo, i3);

    let a = Random.randf(0,1);
    let b = Random.randf(0,1);

    return pointInTriangle(p1, p2, p3, a, b);
}

export function randomFOnTriangle(geo:BufferGeometry, i1:number, i2:number, i3:number, withUV:boolean=false):F {
    const p1 = getVertex(geo, i1);
    const p2 = getVertex(geo, i2);
    const p3 = getVertex(geo, i3);

    const n1 = getNormal(geo, i1);
    const n2 = getNormal(geo, i2);
    const n3 = getNormal(geo, i3);

    let a = Random.randf(0,1);
    let b = Random.randf(0,1);

    if(withUV) {
        const uv1 = getUV(geo, i1);
        const uv2 = getUV(geo, i2);
        const uv3 = getUV(geo, i3);
        return {
            v: pointInTriangle(p1, p2, p3, a, b),
            n: pointInTriangle(n1, n2, n3, a, b),
            uv: uvInTriangle(uv1, uv2, uv3, a, b)
        }
    }

    return {
        v: pointInTriangle(p1, p2, p3, a, b),
        n: pointInTriangle(n1, n2, n3, a, b)
    }
}