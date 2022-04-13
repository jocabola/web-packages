import { BufferGeometry, InstancedMesh, Material } from "three";
import { F } from "./types";
export declare enum ArrayTypes {
    FLOAT32 = 0,
    UINT8 = 1,
    UINT16 = 2,
    UINT32 = 3
}
export declare type VB = {
    id: string;
    array: Array<number>;
    size: number;
    type: ArrayTypes;
};
export declare type VBA = {
    attributes: Array<VB>;
    index: Array<number>;
    instancedAttributes?: Array<VB>;
    instances?: Array<F>;
};
export interface VBGenerator {
    generate(params: any): VBA;
}
export declare function vb2TypedArray(vb: VB): ArrayLike<number>;
export declare function vba2BufferGeometry(vba: VBA): BufferGeometry;
export declare function vba2InstancedMesh(vba: VBA, mat: Material): InstancedMesh;
