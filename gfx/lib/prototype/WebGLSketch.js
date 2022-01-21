import { Clock, OrthographicCamera, PerspectiveCamera, Scene, Vector2, WebGLRenderer } from "three";
import Sketch from "./Sketch";
export default class WebGLSketch extends Sketch {
    constructor(width = window.innerWidth, height = window.innerHeight, opts = {}, autoStart = false) {
        super();
        this.size = new Vector2();
        this.scene = new Scene();
        if (opts.ortho) {
            this.camera = new OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, opts.near != undefined ? opts.near : .1, opts.far != undefined ? opts.far : 1000);
        }
        else {
            this.camera = new PerspectiveCamera(opts.fov != undefined ? opts.fov : 35, width / height, opts.near != undefined ? opts.near : .1, opts.far != undefined ? opts.far : 1000);
        }
        this.scene.add(this.camera);
        this.renderer = new WebGLRenderer({
            antialias: opts.antialias != undefined ? opts.antialias : true,
            alpha: opts.alpha != undefined ? opts.alpha : true
        });
        this.renderer.setSize(width, height);
        if (autoStart)
            this.start();
    }
    start(customRaf = null) {
        if (this.started)
            return;
        this.clock = new Clock(true);
        super.start(customRaf);
    }
    get domElement() {
        return this.renderer.domElement;
    }
    resize(width, height) {
        if (width === this.size.x && height === this.size.y)
            return;
        this.size.set(width, height);
        this.renderer.setSize(this.size.x, this.size.y);
        if (this.camera.type == "PerspectiveCamera") {
            this.camera.aspect = this.size.x / this.size.y;
        }
        else {
            this.camera.left = -width / 2;
            this.camera.right = width / 2;
            this.camera.top = height / 2;
            this.camera.bottom = -height / 2;
        }
        this.camera.updateProjectionMatrix();
    }
    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
