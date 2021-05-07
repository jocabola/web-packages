import { ACESFilmicToneMapping, EquirectangularReflectionMapping, LinearEncoding, LinearFilter, PMREMGenerator } from "three";
const DEFAULTS = {
    toneMapping: ACESFilmicToneMapping,
    exposure: 1.75,
    outputEncoding: LinearEncoding
};
export default class SceneUtils {
    static setHDRI(env, renderer, opts = {}) {
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
