import { BufferGeometry } from "three";
import { pt, F } from "./types";
export declare function pointInTriangle(p1: pt, p2: pt, p3: pt, a: number, b: number): pt;
export declare function uvInTriangle(p1: pt, p2: pt, p3: pt, a: number, b: number): pt;
export declare function randomPointOnTriangle(geo: BufferGeometry, i1: number, i2: number, i3: number): pt;
export declare function randomFOnTriangle(geo: BufferGeometry, i1: number, i2: number, i3: number, withUV?: boolean): F;
