import { Material, Mesh, OrthographicCamera, RawShaderMaterial, Scene, Texture, WebGLMultipleRenderTargets, WebGLRenderer, WebGLRenderTarget } from 'three';
export default class FboHelper {
    camera: OrthographicCamera;
    material: RawShaderMaterial;
    quad: Mesh;
    scene: Scene;
    constructor();
    render(target: WebGLRenderTarget, renderer: WebGLRenderer, x?: number, y?: number, width?: number, height?: number, opacity?: number): void;
    renderMRT(target: WebGLMultipleRenderTargets, renderer: WebGLRenderer, index: number, x?: number, y?: number, width?: number, height?: number): void;
    drawTexture(texture: Texture, renderer: WebGLRenderer, x?: number, y?: number, width?: number, height?: number, opacity?: number): void;
    renderToFbo(target: WebGLRenderTarget | WebGLMultipleRenderTargets, renderer: WebGLRenderer, material: Material): void;
    renderToViewport(renderer: WebGLRenderer, material: Material): void;
    dispose(): void;
}
