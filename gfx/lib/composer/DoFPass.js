"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
const BlurPass_1 = __importDefault(require("./BlurPass"));
const RenderPass_1 = __importDefault(require("./RenderPass"));
const fbo_vert_1 = __importDefault(require("../glsl/fbo.vert"));
const dof_frag_1 = __importDefault(require("../glsl/vfx/dof.frag"));
const depth_glsl_1 = __importDefault(require("../glsl/lib/depth.glsl"));
const SHADER = new three_1.RawShaderMaterial({
    vertexShader: fbo_vert_1.default,
    fragmentShader: dof_frag_1.default,
    uniforms: {
        tInput: { value: null },
        tBlur: { value: null },
        tDepth: { value: null },
        cameraNear: { value: 0 },
        cameraFar: { value: 100 },
        aperture: { value: 1.5 },
        focalDistance: { value: 1 },
        debug: { value: false }
    }
});
class DoFSettings {
}
const DEFAULTS = {
    blurScale: .25,
    camNear: 0,
    camFar: 100,
    blurRadius: 2,
    blurIterations: 4,
    blurQuality: 0,
    focalDistance: 1,
    aperture: 5
};
class DoFPass extends RenderPass_1.default {
    constructor(width, height, settings = {}) {
        super();
        this.blurPass = new BlurPass_1.default(null, width, height, settings.blurScale || DEFAULTS.blurScale, settings.blurRadius || DEFAULTS.blurRadius, settings.blurIterations || DEFAULTS.blurIterations, settings.blurQuality || DEFAULTS.blurQuality);
        three_1.ShaderChunk.depth = depth_glsl_1.default;
        this.shader = SHADER;
        SHADER.uniforms.cameraNear.value = settings.camNear || DEFAULTS.camNear;
        SHADER.uniforms.cameraFar.value = settings.camFar || DEFAULTS.camFar;
        SHADER.uniforms.focalDistance.value = settings.focalDistance || DEFAULTS.focalDistance;
        SHADER.uniforms.aperture.value = settings.aperture || DEFAULTS.aperture;
    }
    setSize(width, height) {
        this.blurPass.setSize(width, height);
    }
    render(renderer, composer, toScreen = false) {
        this.blurPass.source = composer.read.texture;
        this.blurPass.renderInternal(renderer);
        SHADER.uniforms.tBlur.value = this.blurPass.texture;
        super.render(renderer, composer, toScreen);
    }
}
exports.default = DoFPass;
