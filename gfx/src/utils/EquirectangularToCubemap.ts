/**
 * Ported from https://github.com/spite/THREE.EquirectangularToCubemap
 */

 import { BackSide, CubeCamera, CubeTexture, Mesh, MeshBasicMaterial, Scene, SphereGeometry, WebGLCubeRenderTarget, WebGLRenderer } from "three";

 const GEO = new SphereGeometry(100, 64, 64);
 
 export class EquirectangularToCubemap {
     renderer:WebGLRenderer;
     scene:Scene = new Scene();
     rt:WebGLCubeRenderTarget;
     camera:CubeCamera;
     material:MeshBasicMaterial;
     mesh:Mesh;
 
     constructor(renderer:WebGLRenderer, _size = 256) {
         this.renderer = renderer;
         this.scene = new Scene();
         var gl = this.renderer.getContext();
         const maxSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
         const size = Math.min(_size, maxSize / 4);
         this.rt = new WebGLCubeRenderTarget(size);
         this.camera = new CubeCamera(1, 100000, this.rt);
         this.material = new MeshBasicMaterial({
             map: null,
             side: BackSide
         });
         this.mesh = new Mesh(GEO, this.material);
         this.scene.add(this.mesh);
     }
     convert(source) {
         this.material.map = source;
         this.camera.update(this.renderer, this.scene);
         return this.texture;
     }
     get texture():CubeTexture {
         return this.camera.renderTarget.texture;
     }
 } 