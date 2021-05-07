import { Mesh, OrthographicCamera, PlaneBufferGeometry, RawShaderMaterial, RGBAFormat, Scene, Vector2, WebGLRenderTarget, WebGLRenderer, Material } from 'three';
import vert from '../glsl/fbo.vert';
import frag from '../glsl/fbo.frag';

const MAT:RawShaderMaterial = new RawShaderMaterial({
	vertexShader: vert,
	fragmentShader: frag,
	uniforms: {
		tInput: { value: null }
	}
});

export default class FboUtils {
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

	render(target:WebGLRenderTarget, renderer:WebGLRenderer, x:number=0, y:number=0, width:number=0, height:number=0) {
		// render FBO to screen
		if (width == 0 || height == 0) {
			width = target.width;
			height = target.height;
		}

		let s = new Vector2();
		renderer.getSize(s);
		
		this.camera.left = -s.width / 2;
		this.camera.right = s.width / 2;
		this.camera.top = s.height / 2;
		this.camera.bottom = -s.height / 2;
		this.camera.updateProjectionMatrix();
		
		this.quad.scale.set(width, height, 1);
		this.quad.position.set(-s.width / 2 + width / 2 + x, s.height / 2 - height / 2 - y, 0);
		this.quad.material = this.material;
		this.material.uniforms.tInput.value = target.texture;
		this.material.transparent = target.texture.format == RGBAFormat;
		//renderer.clearDepth();
		renderer.render(this.scene, this.camera);
	}

	renderToFbo(target:WebGLRenderTarget, renderer:WebGLRenderer, material:Material) {
		let s = new Vector2();
		renderer.getSize(s);
		
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
	}

	dispose() {
		this.quad.geometry.dispose();
	}
}