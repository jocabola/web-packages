import Asset from './Asset';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
export default class GLTFAsset extends Asset {
    constructor(url) {
        super(url);
    }
    load(callback) {
        let url = this.url;
        let loader = new GLTFLoader();
        loader.load(this.url, (gltf) => {
            gltf.animations;
            gltf.scene;
            gltf.scenes;
            gltf.cameras;
            gltf.asset;
            this.content = gltf;
            this._loaded = true;
            if (callback != null)
                callback();
        }, function (xhr) {
        }, (error) => {
            console.warn('Error loading', url);
            this._failed = true;
        });
    }
    destroy() {
        const dispose = (scene) => {
            for (let c of scene.children) {
                if (c.geometry)
                    c.geometry.dispose();
                if (c.material)
                    c.material.dispose();
                dispose(c);
            }
        };
        dispose(this.content.scene);
        this.content.scene = null;
        this.content = null;
    }
}
