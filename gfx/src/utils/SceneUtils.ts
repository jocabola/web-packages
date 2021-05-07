import { ACESFilmicToneMapping, EquirectangularReflectionMapping, LinearEncoding, LinearFilter, PMREMGenerator, Texture, TextureEncoding, ToneMapping, WebGLRenderer } from "three";

type ToneMappingOptions = {
	toneMapping?:ToneMapping,
	exposure?:number,
	outputEncoding?:TextureEncoding
}

const DEFAULTS:ToneMappingOptions = {
	toneMapping: ACESFilmicToneMapping,
	exposure: 1.75,
	outputEncoding: LinearEncoding
}

export default class SceneUtils {
	static setHDRI(env:Texture, renderer:WebGLRenderer, opts:ToneMappingOptions={}):Texture {
		env.mapping = EquirectangularReflectionMapping;
		env.magFilter = LinearFilter;
		env.needsUpdate = true;

		const pmrem = new PMREMGenerator(renderer);
		const envMap = pmrem.fromEquirectangular(env).texture;
		pmrem.dispose();

		renderer.toneMapping = opts.toneMapping != undefined ? opts.toneMapping : DEFAULTS.toneMapping;
		renderer.toneMappingExposure = opts.exposure != undefined ? opts.exposure : DEFAULTS.exposure;
		renderer.outputEncoding = opts.outputEncoding != undefined ? opts.outputEncoding : DEFAULTS.outputEncoding;

		return envMap;
	}
}