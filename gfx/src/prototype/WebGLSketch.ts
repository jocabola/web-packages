/*
 * WebGL / THREE Sketch Base Class
 */

import { Clock, OrthographicCamera, PerspectiveCamera, Scene, Vector2, WebGLRenderer } from "three";
import Sketch from "./Sketch";

type RenderOptions = {
	antialias?:boolean;
	alpha?:boolean;
	ortho?:boolean;
	fov?:number;
	near?:number;
	far?:number;
}

export default class WebGLSketch extends Sketch {
	renderer:WebGLRenderer;
	scene:Scene;
	camera:PerspectiveCamera|OrthographicCamera;
	clock:Clock;
	size:Vector2;
	pixelRatio:number;

	constructor(width:number=window.innerWidth, height:number=window.innerHeight, opts:RenderOptions={}, autoStart:boolean=false) {
		super();
		this.clock = new Clock(true);

		this.size = new Vector2();

		this.scene = new Scene();
		if(opts.ortho) {
			this.camera = new OrthographicCamera(
				-width/2,
				width/2,
				height/2,
				-height/2,
				opts.near != undefined ? opts.near : .1,
				opts.far != undefined ? opts.far : 1000);
		}
		else {
			this.camera = new PerspectiveCamera(
				opts.fov != undefined ? opts.fov : 35,
				width/height,
				opts.near != undefined ? opts.near : .1,
				opts.far != undefined ? opts.far : 1000);
		}
		this.scene.add(this.camera);

		this.renderer = new WebGLRenderer({
			antialias: opts.antialias != undefined ? opts.antialias : true,
			alpha: opts.alpha != undefined ? opts.alpha : true
		});

		this.renderer.setSize(width, height);

		if(autoStart) this.start();
	}

	get domElement ():HTMLCanvasElement {
		return this.renderer.domElement;
	}

	resize(width:number, height:number) {
		if(width === this.size.x && height === this.size.y) return;
		this.size.set(width, height);
		this.renderer.setSize(this.size.x, this.size.y);
		
		if(this.camera.type == "PerspectiveCamera") {
			this.camera.aspect = this.size.x/this.size.y;
		}
		else {
			this.camera.left = -width/2;
			this.camera.right = width/2;
			this.camera.top = height/2;
			this.camera.bottom = -height/2;
		}

		this.camera.updateProjectionMatrix();
	}
	
	render() {
		this.renderer.render(this.scene, this.camera);
	}
	
}