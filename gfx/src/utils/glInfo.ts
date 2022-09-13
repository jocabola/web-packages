/*
 * glInfo Class
 * Thanks to: https://alteredqualia.com/tmp/webgl-maxparams-test/
 * 
 */

export default class glInfo {
	gl:WebGL2RenderingContext|WebGLRenderingContext
	dds:boolean
	maxTextureSize:number
	maxCubeTextureSize:number
	maxTextureUnits:number
	maxViewportSize:number
	pointSizeMin:number
	pointSizeMax:number
	maxVertexImageUnits:number
	renderer:string
	vendor:string
	halfFloatRenderTarget:boolean
	fullFloatRenderTarget:boolean
	
	constructor(gl:WebGL2RenderingContext|WebGLRenderingContext) {
		this.gl = gl;

		const glExtensionDebugRendererInfo = gl.getExtension('webgl');
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

		if (this.halfFloatRenderTarget == null) this.halfFloatRenderTarget = false;
		if (this.fullFloatRenderTarget == null) this.fullFloatRenderTarget = false;
	}

	checkRenderTargetSupport(format:number, type:number):boolean {
		// create temporary frame buffer and texture
		let framebuffer = this.gl.createFramebuffer();
		let texture = this.gl.createTexture();

		this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, format, 2, 2, 0, format, type, null);

		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, framebuffer);
		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, texture, 0);

		// check frame buffer status
		let status = this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER);

		// clean up
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
		this.gl.bindTexture(this.gl.TEXTURE_2D, null);

		return status === this.gl.FRAMEBUFFER_COMPLETE;
	}

	/*
	 * A complete biased detection of 'crap' GPU
	 * Sometimes I have fallbacks or certain things turned off
	 * this.vendor.indexOf("Intel") > -1 can be an indicator too
	 */
	crapGPU():boolean {
		return this.pointSizeMax < 260 || this.maxViewportSize < 8192;
	}
	
	/*
	 * Non modern Apple GPUs are considered
	 * the "PowerVR" ones used before Apple Silicon
	 * Note: Apple used to return chipset generation number but
	 * stopped doing so a few iOS generations ago
	 * https://twitter.com/jocabola/status/1127873842070917121
	 */
	isModernAppleGPU():boolean {
		let vendor = this.renderer.toLocaleLowerCase();
		let re = new RegExp('(apple\ a)([0-9]+)(\ gpu)');
		let re2 = new RegExp('(apple\ a)([0-9]+)(x\ gpu)');
		let re3 = new RegExp('(apple\ gpu)');

		return re.test(vendor) || re2.test(vendor) || re3.test(vendor);
	}
}