import { sRGBEncoding, WebGLRenderer } from "three";
import { BasisTextureLoader } from 'three/examples/jsm/loaders/BasisTextureLoader';
import { TextureOptions } from "../utils/TextureUtils";
import TextureAsset from "./TextureAsset";

const basisLoader = new BasisTextureLoader();

export default class BasisAsset extends TextureAsset {
	static setupBasisLoader(basisPath:string, renderer:WebGLRenderer) {
		basisLoader.setTranscoderPath(basisPath);
		basisLoader.detectSupport(renderer);
	}
	
	constructor(url:string, opts:TextureOptions={}) {
		super(url, opts);
	}

	load(callback=null) {
		basisLoader.load(this.url, (texture) => {
			// TextureUtils.applyTextureOptions(texture, this.options);	
			texture.encoding = sRGBEncoding;
			this.content = texture;
			if (callback != null) callback();
			this._loaded = true;
		});
	}
}