"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
class SceneUtils {
    static setHDRI(env, renderer, opts = {}) {
        env.mapping = three_1.EquirectangularReflectionMapping;
        env.magFilter = three_1.LinearFilter;
        env.needsUpdate = true;
        const pmrem = new three_1.PMREMGenerator(renderer);
        const envMap = pmrem.fromEquirectangular(env).texture;
        pmrem.dispose();
        if (opts.toneMapping != undefined)
            renderer.toneMapping = opts.toneMapping;
        if (opts.exposure != undefined)
            renderer.toneMappingExposure = opts.exposure;
        if (opts.outputEncoding != undefined)
            renderer.outputEncoding = opts.outputEncoding;
        return envMap;
    }
}
exports.default = SceneUtils;
