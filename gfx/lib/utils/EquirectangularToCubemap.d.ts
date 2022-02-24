import { CubeCamera, Mesh, MeshBasicMaterial, Scene, Texture, WebGLCubeRenderTarget, WebGLRenderer } from "three";
export declare class EquirectangularToCubemap {
    renderer: WebGLRenderer;
    mesh: Mesh;
    scene: Scene;
    camera: CubeCamera;
    material: MeshBasicMaterial;
    rt: WebGLCubeRenderTarget;
    constructor(renderer: WebGLRenderer, _size?: number);
    convert(source: Texture): Texture;
    get texture(): Texture;
}
