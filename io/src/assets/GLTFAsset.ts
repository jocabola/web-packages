import Asset from './Asset';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();

export default class GLTFAsset extends Asset {
	constructor(url:string) {
		super(url);
	}

	load(callback?:Function) {
		// console.log("Loading", this.url);
		let url = this.url;
		loader.load(
		// resource URL
		this.url,
		// called when the resource is loaded
		(gltf) => {

			gltf.animations; // Array<THREE.AnimationClip>
			gltf.scene; // THREE.Scene
			gltf.scenes; // Array<THREE.Scene>
			gltf.cameras; // Array<THREE.Camera>
			gltf.asset; // Object

			//console.log( gltf.scene );

			this.content = gltf;

			this._loaded = true;

			if (callback != null) callback();

		},
		// called when loading is in progresses
		function (xhr) {
			// console.log((xhr.loaded / xhr.total * 100) + '% loaded');

		},
		// called when loading has errors
		(error) => {
			console.warn('Error loading', url);
			this._failed = true;
			//if (callback != null) callback();
		});
	}

	destroy() {
		const dispose = (scene) => {
			for ( let c of scene.children ) {
				if (c.geometry) c.geometry.dispose();
				if (c.material) c.material.dispose();
				dispose(c);
			}	
		}
		dispose(this.content.scene);
		this.content.scene = null;
		this.content = null;
	}
}