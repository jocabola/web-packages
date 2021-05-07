import { RawShaderMaterial, WebGLRenderer } from "three";
import RenderComposer from "./RenderComposer";

export default class RenderPass {
	shader: RawShaderMaterial
	constructor () {

	}

	render(renderer:WebGLRenderer, composer:RenderComposer, toScreen:Boolean=false) {
		renderer.setRenderTarget(toScreen ? null : composer.write);
		composer.quad.material = this.shader;
		if(this.shader.uniforms.tInput) this.shader.uniforms.tInput.value = composer.read.texture;
		if(this.shader.uniforms.tDepth) this.shader.uniforms.tDepth.value = composer.read.depthTexture;
		renderer.render(composer.scene, composer.camera);
	}
}