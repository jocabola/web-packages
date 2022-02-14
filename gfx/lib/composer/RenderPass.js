"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RenderPass {
    constructor() {
    }
    render(renderer, composer, toScreen = false) {
        renderer.setRenderTarget(toScreen ? null : composer.write);
        composer.quad.material = this.shader;
        if (this.shader.uniforms.tInput)
            this.shader.uniforms.tInput.value = composer.read.texture;
        if (this.shader.uniforms.tDepth)
            this.shader.uniforms.tDepth.value = composer.read.depthTexture;
        renderer.render(composer.scene, composer.camera);
    }
}
exports.default = RenderPass;
