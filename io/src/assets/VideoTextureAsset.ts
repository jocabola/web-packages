import {VideoTexture, RGBFormat} from 'three';
import { TextureOptions, TextureUtils } from '../utils/TextureUtils';
import Asset from "./Asset";

export default class VideoTextureAsset extends Asset {
	loop:boolean;
	content:VideoTexture;
	options:TextureOptions;
	constructor(url:string, loop:boolean=false, options:TextureOptions={}) {
		super(url);
		this.loop = loop;
		this.options = options;
	}

	load(callback?:Function) {
		// console.log( "Loading", this.url );
		let video = document.createElement('video');
		video.loop = this.loop;
		video.crossOrigin = 'anonymous';
		video.autoplay = true;
		video.muted = true;
		video.style.display = 'none';
		document.body.appendChild(video);

		let finish = () => {
			if (this.loaded) return;
			this.content = new VideoTexture(video);
			TextureUtils.applyTextureOptions(this.content,this.options);
			if (callback != null) callback();
			// video.play();
			this._loaded = true;
			document.body.removeChild(video);
		};

		video.addEventListener('error', (event) => {
			console.warn('Error loading Video Asset');
			console.log(event);
			this._failed = true;
		});
		video.src = this.url;
	
		let loaded = () => {
			if (!this.loaded && video.readyState > 3) {
				return finish();
			}
			requestAnimationFrame(loaded);
		};

		loaded();

	}

	destroy() {
		this.content.dispose();
		this.content = null;
	}
}