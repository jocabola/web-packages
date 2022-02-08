import { BufferAttribute } from "three";
import { BufferGeometry } from "three"

export enum ArrayTypes {
    FLOAT32,
    UINT8,
    UINT16,
    UINT32
}

export type VB = {
    id:string,
    array:Array<number>,
    size:number,
    type:ArrayTypes // float32 defaut
}

export type VBA = {
    attributes:Array<VB>;
    index:Array<number>;
}

export interface VBGenerator {
    generate(any):VBA;
}

export function vb2TypedArray(vb:VB):ArrayLike<number> {
    if(vb.type == ArrayTypes.UINT8) return new Uint8Array(vb.array);
    if(vb.type == ArrayTypes.UINT16) return new Uint16Array(vb.array);
    if(vb.type == ArrayTypes.UINT32) return new Uint32Array(vb.array);

    return new Float32Array(vb.array); // default
}

export function vba2BufferGeometry(vba:VBA):BufferGeometry {
    const geo = new BufferGeometry();

    for(const vb of vba.attributes) {
        const attr = new BufferAttribute(
            vb2TypedArray(vb),
            vb.size
        );

        geo.setAttribute(vb.id, attr);
    }

    if(vba.index != null) geo.setIndex(vba.index);

    return geo;
}