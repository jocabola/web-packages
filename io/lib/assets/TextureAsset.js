import { TextureLoader } from 'three';
import { TextureUtils } from '../utils/TextureUtils';
import Asset from "./Asset";
export default class TextureAsset extends Asset {
    constructor(url, opts = {}) {
        super(url, false);
        this.options = opts;
    }
    load(callback = null) {
        let loader = new TextureLoader();
        loader.load(this.url, (texture) => {
            this.content = texture;
            TextureUtils.applyTextureOptions(texture, this.options);
            if (callback != null)
                callback();
            this._loaded = true;
        }, (event) => { }, (event) => {
            console.warn('Error Loading Image Asset');
            this._failed = true;
        });
    }
    destroy() {
        this.content.dispose();
        this.content = null;
    }
}
