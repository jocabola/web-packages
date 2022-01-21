import { Material, Mesh, OrthographicCamera, PlaneBufferGeometry, RawShaderMaterial, RGBAFormat, Scene, Texture, Vector2, WebGLMultipleRenderTargets, WebGLRenderer, WebGLRenderTarget } from 'three';
import frag from '../glsl/fbo.frag';
import vert from '../glsl/fbo.vert';

const TMP:Vector2 = new Vector2();

const MAT:RawShaderMaterial = new RawShaderMaterial({
	vertexShader: vert,
	fragmentShader: frag,
	uniforms: {
		tInput: { value: null },
		opacity: {value: 1}
	}
});

export default class FboHelper {
	camera:OrthographicCamera
	material:RawShaderMaterial
	quad:Mesh
	scene:Scene

	constructor () {
		this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
		this.material = MAT;
		var postPlane = new PlaneBufferGeometry(1, 1);
		this.quad = new Mesh(postPlane, this.material);
		this.scene = new Scene();
		this.scene.add(this.quad);
	}

	render(target:WebGLRenderTarget, renderer:WebGLRenderer, x:number=0, y:number=0, width:number=0, height:number=0, opacity:number=1) {
		// render FBO to screen
		if (width == 0 || height == 0) {
			width = target.width;
			height = target.height;
		}

		this.drawTexture(target.texture, renderer, x, y, width, height, opacity);
	}

	renderMRT(target:WebGLMultipleRenderTargets, renderer:WebGLRenderer, index:number, x:number=0, y:number=0, width:number=0, height:number=0) {
		// render FBO to screen
		if (width == 0 || height == 0) {
			width = target.width;
			height = target.height;
		}

		this.drawTexture(target.texture[index], renderer, x, y, width, height);
	}

	drawTexture(texture:Texture, renderer:WebGLRenderer, x:number=0, y:number=0, width:number=0, height:number=0, opacity:number=1) {
		const s = new Vector2();
		renderer.getSize(s);

		this.camera.left = -s.width / 2;
		this.camera.right = s.width / 2;
		this.camera.top = s.height / 2;
		this.camera.bottom = -s.height / 2;
		this.camera.updateProjectionMatrix();

		this.quad.scale.set(width, height, 1);
		this.quad.position.set(-s.width / 2 + width / 2 + x, s.height / 2 - height / 2 - y, 0);
		this.quad.material = this.material;
		this.material.uniforms.tInput.value = texture;
		this.material.transparent = texture.format == RGBAFormat;
		this.material.uniforms.opacity.value = opacity;
		//renderer.clearDepth();
		renderer.render(this.scene, this.camera);
	}

	renderToFbo(target:WebGLRenderTarget|WebGLMultipleRenderTargets, renderer:WebGLRenderer, material:Material) {
		let s = new Vector2(target.width, target.height);
		
		this.camera.left = -s.width / 2;
		this.camera.right = s.width / 2;
		this.camera.top = s.height / 2;
		this.camera.bottom = -s.height / 2;
		this.camera.updateProjectionMatrix();
		
		this.quad.scale.set(s.width, s.height, 1);
		this.quad.position.set(0, 0, 0);
		this.quad.material = material;
		renderer.setRenderTarget(target);
		//renderer.clearDepth();
		renderer.render(this.scene, this.camera);
		renderer.setRenderTarget(null);
	}

	renderToViewport(renderer:WebGLRenderer, material:Material) {
		renderer.getSize(TMP);

		this.camera.left = -TMP.x / 2;
		this.camera.right = TMP.x / 2;
		this.camera.top = TMP.y / 2;
		this.camera.bottom = -TMP.y / 2;
		this.camera.updateProjectionMatrix();

		this.quad.scale.set(TMP.x, TMP.y, 1);
		this.quad.position.set(0, 0, 0);
		this.quad.material = material;
		renderer.setRenderTarget(null);
		//renderer.clearDepth();
		renderer.render(this.scene, this.camera);
	}

	dispose() {
		this.quad.geometry.dispose();
	}
}