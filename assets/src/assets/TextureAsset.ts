import { Texture, TextureLoader } from 'three';
import { TextureOptions, TextureUtils } from '../utils/TextureUtils';
import Asset from "./Asset";

export default class TextureAsset extends Asset {
	options:TextureOptions;
	content:Texture;
	constructor(url:string, opts:TextureOptions={}) {
		super(url, false);
		this.options = opts;
	}
	load(callback = null) {
		// console.log( "Loading", this.url );
		let loader = new TextureLoader();
		loader.load(
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