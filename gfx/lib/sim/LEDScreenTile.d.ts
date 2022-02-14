import { InstancedMesh, Mesh, Object3D, PerspectiveCamera } from "three";
export declare const SCREEN_MAT: any;
export declare type UVCrop = {
    u: number;
    v: number;
    width: number;
    height: number;
};
export declare const BASE_MAT: any;
export declare const BASE_GEO: any;
export declare class LEDScreenTile {
    container: Object3D;
    base: Mesh;
    pixels: InstancedMesh;
    screen: Mesh;
    constructor(width: number, height: number, pitch: number, cols: number, crop: UVCrop);
    set thickness(val: number);
    add(o: Object3D): void;
    update(camera: PerspectiveCamera): void;
}
