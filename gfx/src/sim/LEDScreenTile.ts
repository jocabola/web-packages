import { MathUtils } from "@jocabola/math";
import { BoxBufferGeometry, InstancedBufferAttribute, InstancedMesh, Matrix4, Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D, PerspectiveCamera, PlaneBufferGeometry, Texture, Vector3 } from "three";


export const SCREEN_MAT = new MeshBasicMaterial({
    map: new Texture(),
    color: 0xffffff
});

export type UVCrop = {
    u:number,
    v:number,
    width:number,
    height:number
}

SCREEN_MAT.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace(
        '#include <uv2_pars_vertex>',
        `#include <uv2_pars_vertex>
        attribute vec2 cuv;
        varying vec2 vCUv;`
    );

    shader.vertexShader = shader.vertexShader.replace(
        '#include <fog_vertex>',
        `vCUv = cuv;`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
        '#include <clipping_planes_pars_fragment>',
        `#include <clipping_planes_pars_fragment>
        varying vec2 vCUv;`
    );
    
    shader.fragmentShader = shader.fragmentShader.replace(
        '#include <map_fragment>',
        `diffuseColor.rgb = texture2D(map, vCUv).rgb;`
    );
}

const SCREEN_MAT_2 = new MeshBasicMaterial({
    map: SCREEN_MAT.map,
    color: 0xffffff,
    opacity: 1,
    transparent: true
});

export const BASE_MAT = new MeshStandardMaterial({
    color: 0x333333,
    roughness: .6,
    metalness: .4
});

export const BASE_GEO = new BoxBufferGeometry(1, 1, 1);

const tmp = new Vector3();

/**
 * Screen LED tile has a width x height in cm,
 * rows and cols of pixels
 * a pitch (sep between pixels)
 */
export class LEDScreenTile {
    container:Object3D;
    base:Mesh;
    pixels:InstancedMesh;
    screen:Mesh;
    
    constructor(width:number, height:number, pitch:number, cols:number, crop:UVCrop) {
        const s = width/cols;

        this.container = new Object3D();

        const base = new Mesh(BASE_GEO, BASE_MAT);
        base.scale.set(width, height, .1);
        this.add(base);

        const pos = [];
        const uv = [];
        let x = -width/2 + s/2;
        let y = -height/2 + s/2;
        let j = 0;

        const h = cols * height/width;

        while(y<height/2) {
            for(let i=0; i<cols; i++) {
                pos.push(x, y, 0);
                x += s;
                const u = crop.u + crop.width * i/(cols-1);
                const v = crop.v + j * crop.height;
                uv.push(u, v);
            }
            x = -width/2 + s/2;
            y += s;
            j += 1/h;
        }

        // Pixels
        // const rs = s;
        const geo = new PlaneBufferGeometry(s, s);
        this.pixels = new InstancedMesh(geo, SCREEN_MAT, pos.length/3);

        const uvatt = new InstancedBufferAttribute(
            new Float32Array(uv),
            2
        );
        geo.setAttribute(
            "cuv",
            uvatt
        );

        const matrix = new Matrix4();
        const scale = new Vector3(1-pitch,1-pitch,1);

        for(let i=0; i<pos.length/3; i++) {
            matrix.identity();
            matrix.scale(scale);
            matrix.setPosition( pos[i*3], pos[i*3+1], 0 );
            this.pixels.setMatrixAt(i, matrix);
        }

        const sgeo = new PlaneBufferGeometry(width, height);
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
        this.screen = new Mesh(sgeo, SCREEN_MAT_2.clone());

        this.pixels.position.z = base.scale.z/2 + .01;
        this.screen.position.copy(this.pixels.position);
        this.add(this.pixels);
        this.add(this.screen);

        this.base= base;
    }

    set thickness(val:number) {
        this.base.scale.z = val;
        this.pixels.position.z = this.base.scale.z/2 + .01;
        this.screen.position.copy(this.pixels.position);
    }

    add(o:Object3D) {
        this.container.add(o);
    }

    update(camera:PerspectiveCamera) {
        camera.getWorldPosition(tmp);
        const d = tmp.sub(this.container.position).length();
        const o = MathUtils.smoothstep(1, 2, d);

        this.pixels.visible = o < 1;

        this.screen.material.opacity = o;
    }
}