import { CanvasTexture, ClampToEdgeWrapping, CubeTexture, LinearFilter, LinearMipmapLinearFilter, PixelFormat, RGBAFormat, Texture, TextureFilter, Vector2, VideoTexture, Wrapping } from "three";

class TextureOptions {
	format?:PixelFormat;
	wrapS?:Wrapping;
	wrapT?:Wrapping;
	repeat?:Vector2;
	magFilter?:TextureFilter;
	minFilter?:TextureFilter;
	flipY?:boolean;
}

class TextureUtils {
	static TextureDefaults:TextureOptions = {
		format: RGBAFormat,
		wrapS: ClampToEdgeWrapping,
		wrapT: ClampToEdgeWrapping,
		repeat: new Vector2(1,1),
		magFilter: LinearFilter,
		minFilter: LinearMipmapLinearFilter,
		flipY: true
	}

	static applyTextureOptions(tex:Texture|VideoTexture|CanvasTexture|CubeTexture, opts:TextureOptions) {
		const d = TextureUtils.TextureDefaults;
		tex.format = opts.format ? opts.format : d.format;
		tex.wrapS = opts.wrapS ? opts.wrapS : d.wrapS;
		tex.wrapT = opts.wrapT ? opts.wrapT : d.wrapT;
		tex.repeat = opts.repeat ? opts.repeat : d.repeat;
		tex.magFilter = opts.magFilter ? opts.magFilter : d.magFilter;
		tex.minFilter = opts.minFilter ? opts.minFilter : d.minFilter;
		tex.flipY = opts.flipY != undefined ? opts.flipY : d.flipY;
	}
}

export {
	TextureOptions,
	TextureUtils
}