import { ClampToEdgeWrapping, DepthTexture, LinearFilter, Mesh, OrthographicCamera, PlaneBufferGeometry, RawShaderMaterial, RGBAFormat, Scene, UnsignedByteType, UnsignedShortType, WebGLRenderTarget } from "three";
import frag from '../glsl/fbo.frag';
import vert from '../glsl/fbo.vert';
const TO_SCREEN = new RawShaderMaterial({
    vertexShader: vert,
    fragmentShader: frag,
    uniforms: {
        tInput: {
            value: null
        }
    }
});
export default class RenderComposer {
    constructor(width, height, settings = {}) {
        this.ping = new WebGLRenderTarget(width, height, {
            minFilter: settings.minFilter !== undefined ? settings.minFilter : LinearFilter,
            magFilter: settings.magFilter !== undefined ? settings.magFilter : LinearFilter,
            wrapS: settings.wrapS !== undefined ? settings.wrapS : ClampToEdgeWrapping,
            wrapT: settings.wrapT !== undefined ? settings.wrapT : ClampToEdgeWrapping,
            format: RGBAFormat,
            type: settings.type !== undefined ? settings.type : UnsignedByteType,
            stencilBuffer: settings.stencilBuffer !== undefined ? settings.stencilBuffer : true
        });
        const depth = settings.depth != undefined ? settings.depth : false;
        this.pong = this.ping.clone();
        if (depth) {
            this.ping.depthTexture = new DepthTexture(width, height, UnsignedShortType);
            this.pong.depthTexture = new DepthTexture(width, height, UnsignedShortType);
        }
        this.read = this.ping;
        this.write = this.pong;
        this.scene = new Scene();
        const w = width / 2;
        const h = height / 2;
        this.camera = new OrthographicCamera(-w, w, h, -h, 0, 100);
        this.camera.position.z = 1;
        this.scene.add(this.camera);
        this.quad = new Mesh(new PlaneBufferGeometry(1, 1), null);
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
