import { Clock, OrthographicCamera, PerspectiveCamera, Scene, Vector2, WebGLRenderer } from "three";
import Sketch from "./Sketch";
declare type RenderOptions = {
    antialias?: boolean;
    alpha?: boolean;
    ortho?: boolean;
    fov?: number;
    near?: number;
    far?: number;
};
export default class WebGLSketch extends Sketch {
    renderer: WebGLRenderer;
    scene: Scene;
    camera: PerspectiveCamera | OrthographicCamera;
    clock: Clock;
    size: Vector2;
    pixelRatio: number;
    constructor(width?: number, height?: number, opts?: RenderOptions, autoStart?: boolean);
    start(customRaf?: FrameRequestCallback): number;
    get domElement(): HTMLCanvasElement;
    resize(width: number, height: number): void;
    render(): void;
}
export {};
