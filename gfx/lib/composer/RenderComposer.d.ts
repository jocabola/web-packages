import { Mesh, OrthographicCamera, PerspectiveCamera, Scene, WebGLRenderer, WebGLRenderTarget } from "three";
import RenderPass from "./RenderPass";
export default class RenderComposer {
    private ping;
    private pong;
    write: WebGLRenderTarget;
    read: WebGLRenderTarget;
    scene: Scene;
    quad: Mesh;
    camera: OrthographicCamera;
    width: number;
    height: number;
    stack: Array<RenderPass>;
    constructor(width: number, height: number, settings?: any);
    addPass(pass: RenderPass): void;
    removePass(pass: RenderPass): void;
    setSize(width: number, height: number): void;
    swapBuffers(): void;
    render(renderer: WebGLRenderer, scene: Scene, camera: PerspectiveCamera | OrthographicCamera): void;
    pass(renderer: WebGLRenderer, pass: RenderPass, toScreen?: boolean): void;
    toScreen(renderer: WebGLRenderer): void;
    renderStack(renderer: WebGLRenderer, scene: Scene, camera: PerspectiveCamera | OrthographicCamera): void;
}
