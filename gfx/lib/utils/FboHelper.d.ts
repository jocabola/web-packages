import { Mesh, OrthographicCamera, RawShaderMaterial, Scene, WebGLRenderTarget, WebGLRenderer, Material, WebGLMultipleRenderTargets, Texture } from 'three';
export default class FboHelper {
    camera: OrthographicCamera;
    material: RawShaderMaterial;
    quad: Mesh;
    scene: Scene;
    constructor();
    render(target: WebGLRenderTarget, renderer: WebGLRenderer, x?: number, y?: number, width?: number, height?: number): void;
    renderMRT(target: WebGLMultipleRenderTargets, renderer: WebGLRenderer, index: number, x?: number, y?: number, width?: number, height?: number): void;
    drawTexture(texture: Texture, renderer: WebGLRenderer, x?: number, y?: number, width?: number, height?: number): void;
    renderToFbo(target: WebGLRenderTarget | WebGLMultipleRenderTargets, renderer: WebGLRenderer, material: Material): void;
    dispose(): void;
}
