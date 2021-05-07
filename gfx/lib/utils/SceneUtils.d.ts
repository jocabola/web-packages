import { Texture, TextureEncoding, ToneMapping, WebGLRenderer } from "three";
declare type ToneMappingOptions = {
    toneMapping?: ToneMapping;
    exposure?: number;
    outputEncoding?: TextureEncoding;
};
export default class SceneUtils {
    static setHDRI(env: Texture, renderer: WebGLRenderer, opts?: ToneMappingOptions): Texture;
}
export {};
