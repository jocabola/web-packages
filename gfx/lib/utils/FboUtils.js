"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
const FboHelper_1 = __importDefault(require("./FboHelper"));
class FboUtils {
    static getRenderTarget(width, height, settings = {}, depth = false) {
        const target = new three_1.WebGLRenderTarget(width, height, {
            minFilter: settings.minFilter !== undefined ? settings.minFilter : three_1.LinearFilter,
            magFilter: settings.magFilter !== undefined ? settings.magFilter : three_1.LinearFilter,
            wrapS: settings.wrapS !== undefined ? settings.wrapS : three_1.ClampToEdgeWrapping,
            wrapT: settings.wrapT !== undefined ? settings.wrapT : three_1.ClampToEdgeWrapping,
            format: settings.format ? settings.format : three_1.RGBAFormat,
            type: settings.type !== undefined ? settings.type : three_1.UnsignedByteType,
            stencilBuffer: settings.stencilBuffer !== undefined ? settings.stencilBuffer : true
        });
        if (depth) {
            target.depthTexture = new three_1.DepthTexture(width, height, three_1.UnsignedShortType);
        }
        return target;
    }
    static drawFbo(fbo, renderer, x = 0, y = 0, width = 0, height = 0, opacity = 1) {
        FboUtils.helper.render(fbo, renderer, x, y, width, height, opacity);
    }
    static drawMRT(mrt, renderer, index, x = 0, y = 0, width = 0, height = 0) {
        FboUtils.helper.renderMRT(mrt, renderer, index, x, y, width, height);
    }
    static drawTexture(texture, renderer, x = 0, y = 0, width = 0, height = 0, opacity = 1) {
        FboUtils.helper.drawTexture(texture, renderer, x, y, width, height, opacity);
    }
    static renderToFbo(fbo, renderer, material) {
        FboUtils.helper.renderToFbo(fbo, renderer, material);
    }
    static renderToViewport(renderer, material) {
        FboUtils.helper.renderToViewport(renderer, material);
    }
}
exports.default = FboUtils;
FboUtils.helper = new FboHelper_1.default();
