"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
const fbo_frag_1 = __importDefault(require("../glsl/fbo.frag"));
const fbo_vert_1 = __importDefault(require("../glsl/fbo.vert"));
const TO_SCREEN = new three_1.RawShaderMaterial({
    vertexShader: fbo_vert_1.default,
    fragmentShader: fbo_frag_1.default,
    uniforms: {
        tInput: {
            value: null
        }
    }
});
class RenderComposer {
    constructor(width, height, settings = {}) {
        this.ping = new three_1.WebGLRenderTarget(width, height, {
            minFilter: settings.minFilter !== undefined ? settings.minFilter : three_1.LinearFilter,
            magFilter: settings.magFilter !== undefined ? settings.magFilter : three_1.LinearFilter,
            wrapS: settings.wrapS !== undefined ? settings.wrapS : three_1.ClampToEdgeWrapping,
            wrapT: settings.wrapT !== undefined ? settings.wrapT : three_1.ClampToEdgeWrapping,
            format: three_1.RGBAFormat,
            type: settings.type !== undefined ? settings.type : three_1.UnsignedByteType,
            stencilBuffer: settings.stencilBuffer !== undefined ? settings.stencilBuffer : true
        });
        const depth = settings.depth != undefined ? settings.depth : false;
        this.pong = this.ping.clone();
        if (depth) {
            this.ping.depthTexture = new three_1.DepthTexture(width, height, three_1.UnsignedShortType);
            this.pong.depthTexture = new three_1.DepthTexture(width, height, three_1.UnsignedShortType);
        }
        this.read = this.ping;
        this.write = this.pong;
        this.scene = new three_1.Scene();
        const w = width / 2;
        const h = height / 2;
        this.camera = new three_1.OrthographicCamera(-w, w, h, -h, 0, 100);
        this.camera.position.z = 1;
        this.scene.add(this.camera);
        this.quad = new three_1.Mesh(new three_1.PlaneBufferGeometry(1, 1), null);
        this.quad.scale.set(width, height, 1);
        this.scene.add(this.quad);
        this.width = width;
        this.height = height;
        this.stack = [];
    }
    addPass(pass) {
        this.stack.push(pass);
    }
    removePass(pass) {
        this.stack.splice(this.stack.indexOf(pass), 1);
    }
    setSize(width, height) {
        const w = width / 2;
        const h = height / 2;
        this.camera.left = -w;
        this.camera.right = w;
        this.camera.top = h;
        this.camera.bottom = -h;
        this.camera.updateProjectionMatrix();
        this.ping.setSize(width, height);
        this.pong.setSize(width, height);
        this.quad.scale.set(width, height, 1);
        this.width = width;
        this.height = height;
    }
    swapBuffers() {
        const buff = this.read;
        this.read = this.write;
        this.write = buff;
    }
    render(renderer, scene, camera) {
        renderer.setRenderTarget(this.write);
        renderer.render(scene, camera);
        this.swapBuffers();
    }
    pass(renderer, pass, toScreen = false) {
        if (pass.shader.uniforms.resolution)
            pass.shader.uniforms.resolution.value.set(this.width, this.height);
        pass.render(renderer, this, toScreen);
        if (!toScreen)
            this.swapBuffers();
    }
    toScreen(renderer) {
        renderer.setRenderTarget(null);
        this.quad.material = TO_SCREEN;
        TO_SCREEN.uniforms.tInput.value = this.read;
        renderer.render(this.scene, this.camera);
    }
    renderStack(renderer, scene, camera) {
        this.render(renderer, scene, camera);
        for (let i = 0, len = this.stack.length; i < len; i++) {
            this.pass(renderer, this.stack[i], i == len - 1);
        }
    }
}
exports.default = RenderComposer;
