import RenderPass from "./RenderPass";
import { RawShaderMaterial, Vector2 } from "three";

import vert from '../glsl/vfx/fxaa.vert';
import frag from '../glsl/vfx/fxaa.frag'

export default class FXAAPass extends RenderPass {
	constructor(width:number, height:number) {
		super();
		this.shader = new RawShaderMaterial({
			vertexShader: vert,
			fragmentShader: frag,
			uniforms: {
				tInput: {
					value: null
				},
				resolution: {
					value: new Vector2(width, height)
				}
			}
		})
	}

	resize(width, height) {
		this.shader.uniforms.resolution.value.set(width,height);
	}
}