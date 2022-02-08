import { Texture, TextureLoader } from 'three';
import { TextureOptions, TextureUtils } from '../utils/TextureUtils';
import Asset from "./Asset";
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';

const loader = new TextureLoader();
const compLoader = new DDSLoader();

export default class TextureAsset extends Asset {
	options:TextureOptions;
	content:Texture;
	isCompressed:boolean;
	constructor(url:string, opts:TextureOptions={}, compressed:boolean=false) {
		super(url, false);
		this.options = opts;
		this.isCompressed = compressed;
	}
	load(callback = null) {
		// console.log( "Loading", this.url );
		const L = this.isCompressed ? compLoader : loader;
		L.load(
			this.url,
			(texture:Texture) => {
				this.content = texture;
				TextureUtils.applyTextureOptions(texture, this.options);
				if (callback != null) callback();
				this._loaded = true;
			},
			(event) => {},
			(event) => {
				console.warn('Error Loading Image Asset');
				this._failed = true;
			}
		);
	}

	destroy() {
		this.content.dispose();
		this.content = null;
	}
}