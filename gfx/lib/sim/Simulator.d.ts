import { AssetsBundle, GLTFAsset } from '@jocabola/io';
import { PerspectiveCamera, Scene, WebGLRenderer, WebGLRenderTarget } from 'three';
import { BlurPass } from '../main';
export declare const Figures: {
    boy: GLTFAsset;
    girl: GLTFAsset;
    female: GLTFAsset;
    male: GLTFAsset;
    male2: GLTFAsset;
};
export declare class Simulator {
    scene: Scene;
    protected blur: BlurPass;
    protected rt: WebGLRenderTarget;
    private isLoading;
    camera: PerspectiveCamera;
    constructor(renderer: WebGLRenderer);
    load(renderer: WebGLRenderer, onLoaded?: Function, onProgress?: Function): void;
    setSize(width: number, height: number): void;
    get bundle(): AssetsBundle;
    setFloorSize(s: number): void;
    render(renderer: WebGLRenderer): void;
}
