import { RawShaderMaterial, WebGLRenderer } from "three";
import RenderComposer from "./RenderComposer";
export default class RenderPass {
    shader: RawShaderMaterial;
    constructor();
    render(renderer: WebGLRenderer, composer: RenderComposer, toScreen?: Boolean): void;
}
