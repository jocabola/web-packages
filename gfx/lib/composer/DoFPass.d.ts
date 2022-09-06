import { WebGLRenderer } from "three";
import { BlurSettings } from './BlurPass';
import RenderPass from './RenderPass';
import RenderComposer from "./RenderComposer";
declare class DoFSettings {
    blur?: BlurSettings;
    camNear?: number;
    camFar?: number;
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
