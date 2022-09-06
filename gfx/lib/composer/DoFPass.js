import { RawShaderMaterial, ShaderChunk } from "three";
import { BlurPass } from './BlurPass';
import RenderPass from './RenderPass';
import vert from '../glsl/fbo.vert';
import frag from '../glsl/vfx/dof.frag';
import depth from '../glsl/lib/depth.glsl';
const SHADER = new RawShaderMaterial({
    vertexShader: vert,
    fragmentShader: frag,
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
    blur: {
        scale: .25,
        radius: 2,
        iterations: 4,
        quality: 0
    },
    camNear: 0,
    camFar: 100,
    focalDistance: 1,
    aperture: 5
};
export default class DoFPass extends RenderPass {
    constructor(width, height, settings = {}) {
        super();
        this.blurPass = new BlurPass(null, width, height, settings.blur);
        ShaderChunk.depth = depth;
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
