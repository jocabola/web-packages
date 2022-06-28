import { WebGLRenderer } from "three";
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { TextureOptions, TextureUtils } from "../utils/TextureUtils";
import TextureAsset from "./TextureAsset";

const ktx2Loader = new KTX2Loader();

export default class KTX2Asset extends TextureAsset {
	static setupBasisLoader(basisPath:string, renderer:WebGLRenderer) {
		ktx2Loader.setTranscoderPath(basisPath);
		ktx2Loader.detectSupport(renderer);
	}
	
	constructor(url:string, opts:TextureOptions={}) {
		super(url, opts);
	}

	load(callback=null) {
		if(this._loaded) return;
		ktx2Loader.load(this.url, (texture) => {
			TextureUtils.applyTextureOptions(texture, this.options);
			// texture.encoding = sRGBEncoding;
			this.content = texture;
			if (callback != null) callback();
			this._loaded = true;
		});
	}
}