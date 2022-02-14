"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
const fbo_frag_1 = __importDefault(require("../glsl/fbo.frag"));
const fbo_vert_1 = __importDefault(require("../glsl/fbo.vert"));
const TMP = new three_1.Vector2();
const MAT = new three_1.RawShaderMaterial({
    vertexShader: fbo_vert_1.default,
    fragmentShader: fbo_frag_1.default,
    uniforms: {
        tInput: { value: null },
        opacity: { value: 1 }
    }
});
class FboHelper {
    constructor() {
        this.camera = new three_1.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        this.material = MAT;
        var postPlane = new three_1.PlaneBufferGeometry(1, 1);
        this.quad = new three_1.Mesh(postPlane, this.material);
        this.scene = new three_1.Scene();
        this.scene.add(this.quad);
    }
    render(target, renderer, x = 0, y = 0, width = 0, height = 0, opacity = 1) {
        if (width == 0 || height == 0) {
            width = target.width;
            height = target.height;
        }
        this.drawTexture(target.texture, renderer, x, y, width, height, opacity);
    }
    renderMRT(target, renderer, index, x = 0, y = 0, width = 0, height = 0) {
        if (width == 0 || height == 0) {
            width = target.width;
            height = target.height;
        }
        this.drawTexture(target.texture[index], renderer, x, y, width, height);
    }
    drawTexture(texture, renderer, x = 0, y = 0, width = 0, height = 0, opacity = 1) {
        const s = new three_1.Vector2();
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
        this.material.transparent = texture.format == three_1.RGBAFormat;
        this.material.uniforms.opacity.value = opacity;
        renderer.render(this.scene, this.camera);
    }
    renderToFbo(target, renderer, material) {
        let s = new three_1.Vector2(target.width, target.height);
        this.camera.left = -s.width / 2;
        this.camera.right = s.width / 2;
        this.camera.top = s.height / 2;
        this.camera.bottom = -s.height / 2;
        this.camera.updateProjectionMatrix();
        this.quad.scale.set(s.width, s.height, 1);
        this.quad.position.set(0, 0, 0);
        this.quad.material = material;
        renderer.setRenderTarget(target);
        renderer.render(this.scene, this.camera);
        renderer.setRenderTarget(null);
    }
    renderToViewport(renderer, material) {
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
        renderer.render(this.scene, this.camera);
    }
    dispose() {
        this.quad.geometry.dispose();
    }
}
exports.default = FboHelper;
