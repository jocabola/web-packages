import { BackSide, CubeCamera, Mesh, MeshBasicMaterial, Scene, SphereGeometry, WebGLCubeRenderTarget } from "three";
const GEO = new SphereGeometry(100, 64, 64);
export class EquirectangularToCubemap {
    constructor(renderer, _size = 256) {
        this.scene = new Scene();
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
    get texture() {
        return this.camera.renderTarget.texture;
    }
}
