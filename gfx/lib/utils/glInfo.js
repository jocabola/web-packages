"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class glInfo {
    constructor(gl) {
        this.gl = gl;
        const glExtensionDebugRendererInfo = gl.getExtension('WEBGL_debug_renderer_info');
        const glExtensionTextureFloat = gl.getExtension('OES_texture_float');
        const glExtensionTextureHalfFloat = gl.getExtension('OES_texture_half_float');
        this.dds = gl.getExtension('WEBGL_compressed_texture_s3tc') ||
            gl.getExtension('MOZ_WEBGL_compressed_texture_s3tc') ||
            gl.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');
        this.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        this.maxCubeTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
        this.maxTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
        this.maxViewportSize = gl.getParameter(gl.MAX_VIEWPORT_DIMS);
        this.pointSizeMin = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)[0];
        this.pointSizeMax = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)[1];
        this.maxVertexImageUnits = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
        this.renderer = glExtensionDebugRendererInfo && gl.getParameter(glExtensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL) ? gl.getParameter(glExtensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL) : "unknown";
        this.vendor = glExtensionDebugRendererInfo && gl.getParameter(glExtensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL) ? gl.getParameter(glExtensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL) : "unknown";
        this.halfFloatRenderTarget = (glExtensionTextureHalfFloat != null && this.checkRenderTargetSupport(gl.RGBA, glExtensionTextureHalfFloat.HALF_FLOAT_OES));
        this.fullFloatRenderTarget = (glExtensionTextureFloat != null && this.checkRenderTargetSupport(gl.RGBA, gl.FLOAT));
        if (this.halfFloatRenderTarget == null)
            this.halfFloatRenderTarget = false;
        if (this.fullFloatRenderTarget == null)
            this.fullFloatRenderTarget = false;
    }
    checkRenderTargetSupport(format, type) {
        let framebuffer = this.gl.createFramebuffer();
        let texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, format, 2, 2, 0, format, type, null);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, framebuffer);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, texture, 0);
        let status = this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        return status === this.gl.FRAMEBUFFER_COMPLETE;
    }
    crapGPU() {
        return this.pointSizeMax < 260 || this.maxViewportSize < 8192;
    }
    isModernAppleGPU() {
        let vendor = this.renderer.toLocaleLowerCase();
        let re = new RegExp('(apple\ a)([0-9]+)(\ gpu)');
        let re2 = new RegExp('(apple\ a)([0-9]+)(x\ gpu)');
        let re3 = new RegExp('(apple\ gpu)');
        return re.test(vendor) || re2.test(vendor) || re3.test(vendor);
    }
}
exports.default = glInfo;
