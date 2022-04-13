import { BufferAttribute, BufferGeometry, InstancedBufferAttribute, InstancedMesh, Material, Object3D, Vector3 } from "three";
import { F } from "./types";

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
    instancedAttributes?:Array<VB>;
    instances?:Array<F>;
}

export interface VBGenerator {
    generate(params:any):VBA;
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

    if(vba.instancedAttributes) {
        for(const vb of vba.attributes) {
            const attr = new InstancedBufferAttribute(
                vb2TypedArray(vb),
                vb.size
            );

            geo.setAttribute(vb.id, attr);
        }
    }

    return geo;
}

export function vba2InstancedMesh(vba:VBA, mat:Material):InstancedMesh {
    if(!vba.instances || vba.instances.length === 0) {
        console.warn('There is no instance information!');
        return null;
        
    }
    const geo = vba2BufferGeometry(vba);
    const count = vba.instances.length;
    const im = new InstancedMesh(geo, mat, count);

    const dummy = new Object3D();
    const tmp = new Vector3();
    const tmp2 = new Vector3();
    for (let i=0; i<count; i++) {
        const f = vba.instances[i];
        dummy.matrix.identity();
        dummy.position.set(f.v.x, f.v.y, f.v.z);
        tmp2.set(f.n.x, f.n.y, f.n.z);
        tmp.copy(dummy.position).add(tmp2);
        dummy.lookAt(tmp);
        im.setMatrixAt(i, dummy.matrix);
    }

    return im;
}