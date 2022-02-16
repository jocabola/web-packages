"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
const Sketch_1 = __importDefault(require("./Sketch"));
class WebGLSketch extends Sketch_1.default {
    constructor(width = window.innerWidth, height = window.innerHeight, opts = {}, autoStart = false) {
        super();
        this.size = new three_1.Vector2();
        this.scene = new three_1.Scene();
        if (opts.ortho) {
            this.camera = new three_1.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, opts.near != undefined ? opts.near : .1, opts.far != undefined ? opts.far : 1000);
        }
        else {
            this.camera = new three_1.PerspectiveCamera(opts.fov != undefined ? opts.fov : 35, width / height, opts.near != undefined ? opts.near : .1, opts.far != undefined ? opts.far : 1000);
        }
        this.scene.add(this.camera);
        this.renderer = new three_1.WebGLRenderer({
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
        this.clock = new three_1.Clock(true);
        return super.start(customRaf);
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
exports.default = WebGLSketch;
