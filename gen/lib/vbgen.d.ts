import { BufferGeometry } from "three";
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
};
export interface VBGenerator {
    generate(any: any): VBA;
}
export declare function vb2TypedArray(vb: VB): ArrayLike<number>;
export declare function vba2BufferGeometry(vba: VBA): BufferGeometry;
