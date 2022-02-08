import { sRGBEncoding } from "three";
import { BasisTextureLoader } from 'three/examples/jsm/loaders/BasisTextureLoader.js';
import TextureAsset from "./TextureAsset";
const basisLoader = new BasisTextureLoader();
export default class BasisAsset extends TextureAsset {
    static setupBasisLoader(basisPath, renderer) {
        basisLoader.setTranscoderPath(basisPath);
        basisLoader.detectSupport(renderer);
    }
    constructor(url, opts = {}) {
        super(url, opts);
    }
    load(callback = null) {
        if (this._loaded)
            return;
        basisLoader.load(this.url, (texture) => {
            texture.encoding = sRGBEncoding;
            this.content = texture;
            if (callback != null)
                callback();
            this._loaded = true;
        });
    }
}
