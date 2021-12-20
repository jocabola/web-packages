import { ACESFilmicToneMapping, EquirectangularReflectionMapping, LinearEncoding, LinearFilter, PMREMGenerator, Texture, TextureEncoding, ToneMapping, WebGLRenderer } from "three";

type ToneMappingOptions = {
	toneMapping?:ToneMapping,
	exposure?:number,
	outputEncoding?:TextureEncoding
}

export default class SceneUtils {
	static setHDRI(env:Texture, renderer:WebGLRenderer, opts:ToneMappingOptions={}):Texture {
		env.mapping = EquirectangularReflectionMapping;
		env.magFilter = LinearFilter;
		env.needsUpdate = true;

		const pmrem = new PMREMGenerator(renderer);
		const envMap = pmrem.fromEquirectangular(env).texture;
		pmrem.dispose();

		if(opts.toneMapping != undefined) renderer.toneMapping = opts.toneMapping;
		if(opts.exposure != undefined) renderer.toneMappingExposure = opts.exposure;
		if(opts.outputEncoding != undefined) renderer.outputEncoding = opts.outputEncoding;

		return envMap;
	}
}