import { BufferGeometry } from "three";
import { pt, Quad, Tri } from "./types";
export declare function getV3FromVA(geo: BufferGeometry, id: string, i?: number): pt;
export declare function getVertex(geo: BufferGeometry, i?: number): pt;
export declare function getNormal(geo: BufferGeometry, i?: number): pt;
export declare function getTri(p1: pt, p2: pt, width?: number): Tri;
export declare function addTri(pos: Array<number>, index: Array<number>, p1: pt, p2: pt, width?: number, addP12?: boolean): void;
export declare function getQuad(p1: pt, p2: pt, width?: number): Quad;
export declare function addQuad(pos: Array<number>, index: Array<number>, p1: pt, p2: pt, width?: number, addP1?: boolean): void;
