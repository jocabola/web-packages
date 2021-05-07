import { WebGLRenderer } from "three";
import RenderPass from './RenderPass';
import RenderComposer from "./RenderComposer";
declare class DoFSettings {
    blurScale?: number;
    camNear?: number;
    camFar?: number;
    blurRadius?: number;
    blurIterations?: number;
    blurQuality?: 0 | 1 | 2;
    focalDistance?: number;
    aperture?: number;
}
export default class DoFPass extends RenderPass {
    private blurPass;
    constructor(width: number, height: number, settings?: DoFSettings);
    setSize(width: number, height: number): void;
    render(renderer: WebGLRenderer, composer: RenderComposer, toScreen?: boolean): void;
}
export {};
