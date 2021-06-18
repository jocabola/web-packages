import { WebGLRenderer } from "three";
import { TextureOptions } from "../utils/TextureUtils";
import TextureAsset from "./TextureAsset";
export default class BasisAsset extends TextureAsset {
    static setupBasisLoader(basisPath: string, renderer: WebGLRenderer): void;
    constructor(url: string, opts?: TextureOptions);
    load(callback?: any): void;
}
