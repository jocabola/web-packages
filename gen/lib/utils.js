export function getV3FromVA(geo, id, i = 0) {
    const attr = geo.getAttribute(id);
    const a = attr.array;
    if (!attr.data && !attr.data.stride) {
        return {
            x: a[i * 3],
            y: a[i * 3 + 1],
            z: a[i * 3 + 2]
        };
    }
    const stride = attr.data.stride;
    const offset = attr.offset;
    return {
        x: a[i * stride + offset],
        y: a[i * stride + offset + 1],
        z: a[i * stride + offset + 2]
    };
}
export function getV2FromVA(geo, id, i = 0) {
    const attr = geo.getAttribute(id);
    const a = attr.array;
    if (!attr.data && !attr.data.stride) {
        return {
            x: a[i * 2],
            y: a[i * 2 + 1]
        };
    }
    const stride = attr.data.stride;
    const offset = attr.offset;
    return {
        x: a[i * stride + offset],
        y: a[i * stride + offset + 1]
    };
}
export function getVertex(geo, i = 0) {
    return getV3FromVA(geo, 'position', i);
}
export function getUV(geo, i = 0) {
    return getV2FromVA(geo, 'uv', i);
}
export function getNormal(geo, i = 0) {
    return getV3FromVA(geo, 'normal', i);
}
export function getTri(p1, p2, width = .1) {
    const a = Math.atan2(p2.z - p1.z, p2.x - p1.x);
    const b = a + Math.PI / 2;
    const c = a - Math.PI / 2;
    const hlw = width * .5;
    const p11 = {
        x: p1.x + hlw * Math.sin(b),
        y: p1.y,
        z: p1.z + hlw * Math.cos(b)
    };
    const p12 = {
        x: p1.x + hlw * Math.sin(c),
        y: p1.y,
        z: p1.z + hlw * Math.cos(c)
    };
    return {
        p1: p11,
        p2: p12,
        p3: p2
    };
}
export function addTri(pos, index, p1, p2, width = .1, addP12 = true) {
    const tri = getTri(p1, p2, width);
    if (addP12) {
        pos.push(tri.p1.x, tri.p1.y, tri.p1.z);
        pos.push(tri.p2.x, tri.p2.y, tri.p2.z);
    }
    pos.push(tri.p3.x, tri.p3.y, tri.p3.z);
    const ilen = pos.length / 3;
    index.push(ilen - 3, ilen - 2, ilen - 1);
}
export function getQuad(p1, p2, width = .1) {
    const a = Math.atan2(p2.z - p1.z, p2.x - p1.x);
    const b = a + Math.PI / 2;
    const c = a - Math.PI / 2;
    const hlw = width * .5;
    const p11 = {
        x: p1.x + hlw * Math.sin(b),
        y: p1.y,
        z: p1.z + hlw * Math.cos(b)
    };
    const p12 = {
        x: p1.x + hlw * Math.sin(c),
        y: p1.y,
        z: p1.z + hlw * Math.cos(c)
    };
    const p21 = {
        x: p2.x + hlw * Math.sin(b),
        y: p2.y,
        z: p2.z + hlw * Math.cos(b)
    };
    const p22 = {
        x: p2.x + hlw * Math.sin(c),
        y: p2.y,
        z: p2.z + hlw * Math.cos(c)
    };
    return {
        p1: p11,
        p2: p12,
        p3: p21,
        p4: p22
    };
}
export function addQuad(pos, index, p1, p2, width = .1, addP1 = true) {
    const quad = getQuad(p1, p2, width);
    if (addP1) {
        pos.push(quad.p1.x, quad.p1.y, quad.p1.z);
        pos.push(quad.p2.x, quad.p2.y, quad.p2.z);
    }
    pos.push(quad.p3.x, quad.p3.y, quad.p3.z);
    pos.push(quad.p4.x, quad.p4.y, quad.p4.z);
    const ilen = pos.length / 3;
    index.push(ilen - 3, ilen - 1, ilen - 2);
    index.push(ilen - 3, ilen - 2, ilen - 4);
}
