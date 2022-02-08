import { BufferAttribute } from "three";
import { BufferGeometry } from "three";
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
    return geo;
}
