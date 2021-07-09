import { TextureLoader } from 'three';
import { TextureUtils } from '../utils/TextureUtils';
import Asset from "./Asset";
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader';
const loader = new TextureLoader();
const compLoader = new DDSLoader();
export default class TextureAsset extends Asset {
    constructor(url, opts = {}, compressed = false) {
        super(url, false);
        this.options = opts;
        this.isCompressed = compressed;
    }
    load(callback = null) {
        const L = this.isCompressed ? compLoader : loader;
        L.load(this.url, (texture) => {
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
