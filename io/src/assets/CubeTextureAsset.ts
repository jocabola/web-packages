import Asset from "./Asset";
import {CubeTexture, CubeTextureLoader} from 'three';
import { TextureOptions, TextureUtils } from "../utils/TextureUtils";

type ImgExt = 'jpg'|'png'|'dds';

const loader = new CubeTextureLoader();

export default class CubeTextureAsset extends Asset {
	content:CubeTexture;
	format:ImgExt;
	options:TextureOptions;
	constructor(url:string, frmt:ImgExt="jpg", opts:TextureOptions) {
		super(url);
		this.format = frmt;
		this.options = opts;
	}

	load(callback?:Function) {
		// console.log("Loading", this.url);
		loader.setPath(this.url);
		loader.load([
			'px.'+this.format,
			'nx.'+this.format,
			'py.'+this.format,
			'ny.'+this.format,
			'pz.'+this.format,
			'nz.'+this.format
			], (texture:CubeTexture) => {
				this.content = texture;
				TextureUtils.applyTextureOptions(texture, this.options);
				if (callback != null) callback();
				this._loaded = true;
			},(event)=>{},(event)=>{
				this._failed = true;
			}
		);
	}

	destroy() {
		this.content.dispose();
		this.content = null;
	}
}