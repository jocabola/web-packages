import { Mesh, OrthographicCamera, RawShaderMaterial, Scene, WebGLRenderTarget, WebGLRenderer, Material } from 'three';
export default class FboUtils {
    camera: OrthographicCamera;
    material: RawShaderMaterial;
    quad: Mesh;
    scene: Scene;
    constructor();
    render(target: WebGLRenderTarget, renderer: WebGLRenderer, x?: number, y?: number, width?: number, height?: number): void;
    renderToFbo(target: WebGLRenderTarget, renderer: WebGLRenderer, material: Material): void;
    dispose(): void;
}
