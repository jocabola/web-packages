import { RawShaderMaterial, ShaderChunk, WebGLRenderer } from "three";
import BlurPass from './BlurPass';
import RenderPass from './RenderPass';
import RenderComposer from "./RenderComposer";

import vert from '../glsl/fbo.vert';
import frag from '../glsl/vfx/dof.frag';
import depth from '../glsl/lib/depth.glsl';

const SHADER = new RawShaderMaterial({
	vertexShader: vert,
	fragmentShader: frag,
	uniforms: {
		tInput: {value: null},
		tBlur: {value: null},
		tDepth: {value: null},
		cameraNear: {value: 0},
		cameraFar: {value: 100},
		aperture: {value: 1.5},
		focalDistance: {value: 1},
		debug: {value: false}
	}
})

class DoFSettings {
	blurScale?:number;
	camNear?:number;
	camFar?:number;
	blurRadius?:number;
	blurIterations?:number;
	blurQuality?:0|1|2;
	focalDistance?:number;
	aperture?:number;
}

const DEFAULTS:DoFSettings = {
	blurScale: .25,
	camNear: 0,
	camFar: 100,
	blurRadius: 2,
	blurIterations: 4,
	blurQuality: 0,
	focalDistance: 1,
	aperture: 5
}

export default class DoFPass extends RenderPass {
	private blurPass: BlurPass;
	
	constructor(width:number, height:number, settings:DoFSettings={}) {
		super();
		this.blurPass = new BlurPass(
			null,
			width,
			height,
			settings.blurScale || DEFAULTS.blurScale,
			settings.blurRadius || DEFAULTS.blurRadius,
			settings.blurIterations || DEFAULTS.blurIterations,
			settings.blurQuality || DEFAULTS.blurQuality);

		ShaderChunk.depth = depth;

		this.shader = SHADER;
		SHADER.uniforms.cameraNear.value = settings.camNear || DEFAULTS.camNear;
		SHADER.uniforms.cameraFar.value = settings.camFar || DEFAULTS.camFar;
		SHADER.uniforms.focalDistance.value = settings.focalDistance || DEFAULTS.focalDistance;
		SHADER.uniforms.aperture.value = settings.aperture || DEFAULTS.aperture;
	}

	setSize(width:number, height:number) {
		this.blurPass.setSize(width, height);
	}

	render(renderer:WebGLRenderer, composer:RenderComposer, toScreen:boolean=false) {
		this.blurPass.source = composer.read.texture;
		this.blurPass.renderInternal(renderer);
		SHADER.uniforms.tBlur.value = this.blurPass.texture;
		super.render(renderer, composer, toScreen);
	}
}