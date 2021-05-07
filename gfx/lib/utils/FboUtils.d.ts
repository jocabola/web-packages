import { Material, WebGLRenderer, WebGLRenderTarget, WebGLRenderTargetOptions } from "three";
import FBOHelper from "./FboHelper";
export default class FboUtils {
    static helper: FBOHelper;
    static getRenderTarget(width: number, height: number, settings?: WebGLRenderTargetOptions, depth?: boolean): WebGLRenderTarget;
    static drawFbo(fbo: WebGLRenderTarget, renderer: WebGLRenderer, x?: number, y?: number, width?: number, height?: number): void;
    static renderToFbo(fbo: WebGLRenderTarget, renderer: WebGLRenderer, material: Material): void;
}
