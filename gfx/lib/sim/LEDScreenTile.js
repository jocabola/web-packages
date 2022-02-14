"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LEDScreenTile = exports.BASE_GEO = exports.BASE_MAT = exports.SCREEN_MAT = void 0;
const math_1 = require("@jocabola/math");
const three_1 = require("three");
exports.SCREEN_MAT = new three_1.MeshBasicMaterial({
    map: new three_1.Texture(),
    color: 0xffffff
});
exports.SCREEN_MAT.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace('#include <uv2_pars_vertex>', `#include <uv2_pars_vertex>
        attribute vec2 cuv;
        varying vec2 vCUv;`);
    shader.vertexShader = shader.vertexShader.replace('#include <fog_vertex>', `vCUv = cuv;`);
    shader.fragmentShader = shader.fragmentShader.replace('#include <clipping_planes_pars_fragment>', `#include <clipping_planes_pars_fragment>
        varying vec2 vCUv;`);
    shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', `diffuseColor.rgb = texture2D(map, vCUv).rgb;`);
};
const SCREEN_MAT_2 = new three_1.MeshBasicMaterial({
    map: exports.SCREEN_MAT.map,
    color: 0xffffff,
    opacity: 1,
    transparent: true
});
exports.BASE_MAT = new three_1.MeshStandardMaterial({
    color: 0x333333,
    roughness: .6,
    metalness: .4
});
exports.BASE_GEO = new three_1.BoxBufferGeometry(1, 1, 1);
const tmp = new three_1.Vector3();
class LEDScreenTile {
    constructor(width, height, pitch, cols, crop) {
        const s = width / cols;
        this.container = new three_1.Object3D();
        const base = new three_1.Mesh(exports.BASE_GEO, exports.BASE_MAT);
        base.scale.set(width, height, .1);
        this.add(base);
        const pos = [];
        const uv = [];
        let x = -width / 2 + s / 2;
        let y = -height / 2 + s / 2;
        let j = 0;
        const h = cols * height / width;
        while (y < height / 2) {
            for (let i = 0; i < cols; i++) {
                pos.push(x, y, 0);
                x += s;
                const u = crop.u + crop.width * i / (cols - 1);
                const v = crop.v + j * crop.height;
                uv.push(u, v);
            }
            x = -width / 2 + s / 2;
            y += s;
            j += 1 / h;
        }
        const geo = new three_1.PlaneBufferGeometry(s, s);
        this.pixels = new three_1.InstancedMesh(geo, exports.SCREEN_MAT, pos.length / 3);
        const uvatt = new three_1.InstancedBufferAttribute(new Float32Array(uv), 2);
        geo.setAttribute("cuv", uvatt);
        const matrix = new three_1.Matrix4();
        const scale = new three_1.Vector3(1 - pitch, 1 - pitch, 1);
        for (let i = 0; i < pos.length / 3; i++) {
            matrix.identity();
            matrix.scale(scale);
            matrix.setPosition(pos[i * 3], pos[i * 3 + 1], 0);
            this.pixels.setMatrixAt(i, matrix);
        }
        const sgeo = new three_1.PlaneBufferGeometry(width, height);
        const suv = sgeo.attributes.uv;
        suv.array[0] = crop.u;
        suv.array[1] = crop.v + crop.height;
        suv.array[2] = crop.u + crop.width;
        suv.array[3] = crop.v + crop.height;
        suv.array[4] = crop.u;
        suv.array[5] = crop.v;
        suv.array[6] = crop.u + crop.width;
        suv.array[7] = crop.v;
        suv.needsUpdate = true;
        this.screen = new three_1.Mesh(sgeo, SCREEN_MAT_2.clone());
        this.pixels.position.z = base.scale.z / 2 + .01;
        this.screen.position.copy(this.pixels.position);
        this.add(this.pixels);
        this.add(this.screen);
        this.base = base;
    }
    set thickness(val) {
        this.base.scale.z = val;
        this.pixels.position.z = this.base.scale.z / 2 + .01;
        this.screen.position.copy(this.pixels.position);
    }
    add(o) {
        this.container.add(o);
    }
    update(camera) {
        camera.getWorldPosition(tmp);
        const d = tmp.sub(this.container.position).length();
        const o = math_1.MathUtils.smoothstep(1, 2, d);
        this.pixels.visible = o < 1;
        this.screen.material.opacity = o;
    }
}
exports.LEDScreenTile = LEDScreenTile;
