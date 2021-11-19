import { WebGLRenderer } from "three";
import { TextureOptions } from "../utils/TextureUtils";
import TextureAsset from "./TextureAsset";
export default class KTX2Asset extends TextureAsset {
    static setupBasisLoader(basisPath: string, renderer: WebGLRenderer): void;
    constructor(url: string, opts?: TextureOptions);
    load(callback?: any): void;
}
