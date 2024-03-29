import { Mesh, OrthographicCamera, Scene, Texture, WebGLRenderer, WebGLRenderTarget } from "three";
import RenderPass from "./RenderPass";
import RenderComposer from "./RenderComposer";
export declare type BlurQuality = 0 | 1 | 2;
export declare type BlurSettings = {
    scale?: number;
    radius?: number;
    iterations?: number;
    quality?: BlurQuality;
};
export declare class BlurPass extends RenderPass {
    radius: number;
    iterations: number;
    quality: BlurQuality;
    scale: number;
    ping: WebGLRenderTarget;
    pong: WebGLRenderTarget;
    scene: Scene;
    camera: OrthographicCamera;
    quad: Mesh;
    source: Texture;
    constructor(src: Texture | null, width: number, height: number, settings?: BlurSettings);
    private swapBuffers;
    setSize(width: number, height: number): void;
    blurPass(renderer: WebGLRenderer, src: Texture, dst: WebGLRenderTarget, dx: number, dy: number): void;
    render(renderer: WebGLRenderer, composer: RenderComposer, toScreen?: boolean): void;
    renderInternal(renderer: WebGLRenderer): void;
    get texture(): Texture;
}
