import { ClampToEdgeWrapping, DepthTexture, LinearFilter, Material, RGBFormat, UnsignedByteType, UnsignedShortType, WebGLMultipleRenderTargets, WebGLRenderer, WebGLRenderTarget, WebGLRenderTargetOptions } from "three";
import FBOHelper from "./FboHelper";

export default class FboUtils {
	static helper:FBOHelper = new FBOHelper();

	static getRenderTarget(width:number, height:number, settings:WebGLRenderTargetOptions={}, depth:boolean=false):WebGLRenderTarget {
		const target = new WebGLRenderTarget(width, height, {
			minFilter: settings.minFilter !== undefined ? settings.minFilter : LinearFilter,
			magFilter: settings.magFilter !== undefined ? settings.magFilter : LinearFilter,
			wrapS: settings.wrapS !== undefined ? settings.wrapS : ClampToEdgeWrapping,
			wrapT: settings.wrapT !== undefined ? settings.wrapT : ClampToEdgeWrapping,
			format: settings.format ? settings.format : RGBFormat,
			type: settings.type !== undefined ? settings.type : UnsignedByteType,
			stencilBuffer: settings.stencilBuffer !== undefined ? settings.stencilBuffer : true	
		});

		if (depth) {
			target.depthTexture = new DepthTexture(width, height, UnsignedShortType);
		}

		return target;
	}

	static drawFbo(fbo:WebGLRenderTarget, renderer:WebGLRenderer, x:number=0, y:number=0, width:number=0, height:number=0) {
		FboUtils.helper.render(fbo, renderer, x, y, width, height);
	}

	static drawMRT(mrt:WebGLMultipleRenderTargets, renderer:WebGLRenderer, index:number, x:number=0, y:number=0, width:number=0, height:number=0) {
		FboUtils.helper.renderMRT(mrt, renderer, index, x, y, width, height);
	}

	static renderToFbo(fbo:WebGLRenderTarget|WebGLMultipleRenderTargets, renderer:WebGLRenderer, material:Material) {
		FboUtils.helper.renderToFbo(fbo, renderer, material);
	}
}