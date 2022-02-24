/**
 * Ported from https://github.com/spite/THREE.EquirectangularToCubemap
 */

import { BackSide, CubeCamera, IcosahedronBufferGeometry, Mesh, MeshBasicMaterial, Scene, Texture, WebGLCubeRenderTarget, WebGLRenderer } from "three";

export class EquirectangularToCubemap {
    renderer:WebGLRenderer;
    mesh:Mesh;
    scene:Scene;
    camera:CubeCamera;
    material:MeshBasicMaterial;
    rt:WebGLCubeRenderTarget;

    constructor(renderer:WebGLRenderer, _size:number=256) {
        this.renderer = renderer;
        this.scene = new Scene();

        var gl = this.renderer.getContext();
        const maxSize = gl.getParameter( gl.MAX_CUBE_MAP_TEXTURE_SIZE );

        const size = Math.min(_size, maxSize/4);

        this.rt = new WebGLCubeRenderTarget(size);

        this.camera = new CubeCamera( 1, 100000, this.rt );

        this.material = new MeshBasicMaterial( {
            map: null,
            side: BackSide
        } );

        this.mesh = new Mesh(
            new IcosahedronBufferGeometry( 100, 4 ),
            this.material
        );
        this.scene.add( this.mesh );
    }

    convert(source:Texture):Texture {
        this.material.map = source;

        this.camera.update( this.renderer, this.scene );

        return this.texture;
    }

    get texture ():Texture {
        return this.camera.renderTarget.texture;
    }
}