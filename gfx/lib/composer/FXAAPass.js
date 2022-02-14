"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RenderPass_1 = __importDefault(require("./RenderPass"));
const three_1 = require("three");
const fxaa_vert_1 = __importDefault(require("../glsl/vfx/fxaa.vert"));
const fxaa_frag_1 = __importDefault(require("../glsl/vfx/fxaa.frag"));
class FXAAPass extends RenderPass_1.default {
    constructor(width, height) {
        super();
        this.shader = new three_1.RawShaderMaterial({
            vertexShader: fxaa_vert_1.default,
            fragmentShader: fxaa_frag_1.default,
            uniforms: {
                tInput: {
                    value: null
                },
                resolution: {
                    value: new three_1.Vector2(width, height)
                }
            }
        });
    }
    resize(width, height) {
        this.shader.uniforms.resolution.value.set(width, height);
    }
}
exports.default = FXAAPass;
