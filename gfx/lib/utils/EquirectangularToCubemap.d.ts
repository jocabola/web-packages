import { CubeCamera, CubeTexture, Mesh, MeshBasicMaterial, Scene, WebGLCubeRenderTarget, WebGLRenderer } from "three";
export declare class EquirectangularToCubemap {
    renderer: WebGLRenderer;
    scene: Scene;
    rt: WebGLCubeRenderTarget;
    camera: CubeCamera;
    material: MeshBasicMaterial;
    mesh: Mesh;
    constructor(renderer: WebGLRenderer, _size?: number);
    convert(source: any): CubeTexture;
    get texture(): CubeTexture;
}
