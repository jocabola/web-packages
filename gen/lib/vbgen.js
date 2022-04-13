import { BufferAttribute, BufferGeometry, InstancedBufferAttribute, InstancedMesh, Object3D, Vector3 } from "three";
export var ArrayTypes;
(function (ArrayTypes) {
    ArrayTypes[ArrayTypes["FLOAT32"] = 0] = "FLOAT32";
    ArrayTypes[ArrayTypes["UINT8"] = 1] = "UINT8";
    ArrayTypes[ArrayTypes["UINT16"] = 2] = "UINT16";
    ArrayTypes[ArrayTypes["UINT32"] = 3] = "UINT32";
})(ArrayTypes || (ArrayTypes = {}));
export function vb2TypedArray(vb) {
    if (vb.type == ArrayTypes.UINT8)
        return new Uint8Array(vb.array);
    if (vb.type == ArrayTypes.UINT16)
        return new Uint16Array(vb.array);
    if (vb.type == ArrayTypes.UINT32)
        return new Uint32Array(vb.array);
    return new Float32Array(vb.array);
}
export function vba2BufferGeometry(vba) {
    const geo = new BufferGeometry();
    for (const vb of vba.attributes) {
        const attr = new BufferAttribute(vb2TypedArray(vb), vb.size);
        geo.setAttribute(vb.id, attr);
    }
    if (vba.index != null)
        geo.setIndex(vba.index);
    if (vba.instancedAttributes) {
        for (const vb of vba.attributes) {
            const attr = new InstancedBufferAttribute(vb2TypedArray(vb), vb.size);
            geo.setAttribute(vb.id, attr);
        }
    }
    return geo;
}
export function vba2InstancedMesh(vba, mat) {
    if (!vba.instances || vba.instances.length === 0) {
        console.warn('There is no instance information!');
        return null;
    }
    const geo = vba2BufferGeometry(vba);
    const count = vba.instances.length;
    const im = new InstancedMesh(geo, mat, count);
    const dummy = new Object3D();
    const tmp = new Vector3();
    const tmp2 = new Vector3();
    for (let i = 0; i < count; i++) {
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
