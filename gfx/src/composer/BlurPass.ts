import { Mesh, OrthographicCamera, PlaneGeometry, RawShaderMaterial, RGBAFormat, Scene, Texture, Vector2, WebGLRenderer, WebGLRenderTarget } from "three";
import FboUtils from '../utils/FboUtils';
import RenderPass from "./RenderPass";
import RenderComposer from "./RenderComposer";

import vert from '../glsl/fbo.vert';
import frag from '../glsl/vfx/blur.frag'

export type BlurQuality = 0|1|2;

export type BlurSettings = {
	scale?: number;
	radius?: number;
	iterations?: number;
	quality?:BlurQuality;
}

const BlurDefaults:BlurSettings = {
	scale: 1,
	radius: 1,
	iterations: 4,
	quality: 0
}

export class BlurPass extends RenderPass{
	radius:number = 2;
	iterations:number = 4;
	quality:BlurQuality = 0;
	scale:number;
	ping:WebGLRenderTarget;
	pong:WebGLRenderTarget;
	scene:Scene;
	camera:OrthographicCamera;
	quad:Mesh;
	source:Texture;
	constructor(src:Texture|null, width:number, height:number, settings:BlurSettings=BlurDefaults){
		super();

		this.source = src;

		const scale = settings.scale || BlurDefaults.scale;
		const radius = settings.radius || BlurDefaults.radius;
		const iterations = settings.iterations || BlurDefaults.iterations;
		const quality = settings.quality || BlurDefaults.quality;

		this.ping = FboUtils.getRenderTarget(width*scale, height*scale,{
			format:RGBAFormat
		});
		this.pong = this.ping.clone();

		this.radius = radius;
		this.iterations = iterations;
		this.scale = scale;

		this.shader = new RawShaderMaterial({
			vertexShader: vert,
			fragmentShader: frag,
			uniforms: {
				resolution: {
					value: new Vector2(width, height)
				},
				direction: {
					value: new Vector2()
				},
				scale: {
					value: scale
				},
				tMap: {
					value: null
				},
				mode: {
					value: quality
				}
			}
		});

		this.scene = new Scene()
		const w = scale * width/2;
		const h = scale * height/2;
		this.camera = new OrthographicCamera(-w,w,h,-h,0,100);
		this.camera.position.z = 1;
		this.scene.add(this.camera);

		this.quad = new Mesh(
			new PlaneGeometry(1,1),
			this.shader
		);
		this.quad.scale.set(width*scale,height*scale,1);
		this.scene.add(this.quad);
	}

	private swapBuffers () {
		const tmp = this.pong;
		this.pong = this.ping;
		this.ping = tmp;
	}

	setSize(width:number, height:number) {
		this.ping.setSize(width*this.scale, height*this.scale);
		this.pong.setSize(width*this.scale, height*this.scale);
		
		const w = this.scale * width/2;
		const h = this.scale * height/2;
		this.camera.left = -w;
		this.camera.right = w;
		this.camera.top = h;
		this.camera.bottom = -h;
		this.camera.updateProjectionMatrix();

		this.quad.scale.set(width * this.scale, height * this.scale, 1);
		this.shader.uniforms.resolution.value.set(width, height);
	}

	blurPass(renderer:WebGLRenderer, src:Texture, dst:WebGLRenderTarget, dx:number, dy:number) {
		renderer.setRenderTarget(dst);
		this.shader.uniforms.direction.value.set(dx,dy);
		this.shader.uniforms.tMap.value = src;
		renderer.render(this.scene, this.camera);
	}

	render(renderer:WebGLRenderer, composer:RenderComposer, toScreen:boolean=false) {
		this.blurPass(renderer, this.source != null ? this.source : composer.read.texture, this.ping, this.radius, 0);
		for(let i=1;i<this.iterations-1;i++) {
			this.blurPass(renderer, this.ping.texture, this.pong, i%2==0? this.radius : 0, i%2==0? 0 : this.radius);
			this.swapBuffers();
		}
		const i = this.iterations-1;
		this.blurPass(renderer, this.ping.texture, toScreen ? null : composer.write, i%2==0? this.radius : 0, i%2==0? 0 : this.radius);
	}

	// render internal
	renderInternal(renderer:WebGLRenderer) {
		if(this.source == null) return console.warn("Internal rendering needs a source texture!");
		this.blurPass(renderer, this.source, this.ping, this.radius, 0);
		for(let i=1;i<this.iterations;i++) {
			this.blurPass(renderer, this.ping.texture, this.pong, i%2==0? this.radius : 0, i%2==0? 0 : this.radius);
			this.swapBuffers();
		}
	}

	get texture ():Texture {
		return this.pong.texture;
	}
}