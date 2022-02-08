import { ClampToEdgeWrapping, LinearFilter, LinearMipmapLinearFilter, RGBAFormat, Vector2 } from "three";
class TextureOptions {
}
class TextureUtils {
    static applyTextureOptions(tex, opts) {
        const d = TextureUtils.TextureDefaults;
        tex.format = opts.format ? opts.format : d.format;
        tex.wrapS = opts.wrapS ? opts.wrapS : d.wrapS;
        tex.wrapT = opts.wrapT ? opts.wrapT : d.wrapT;
        tex.repeat = opts.repeat ? opts.repeat : d.repeat;
        tex.magFilter = opts.magFilter ? opts.magFilter : d.magFilter;
        tex.minFilter = opts.minFilter ? opts.minFilter : d.minFilter;
        tex.flipY = opts.flipY != undefined ? opts.flipY : d.flipY;
    }
}
TextureUtils.TextureDefaults = {
    format: RGBAFormat,
    wrapS: ClampToEdgeWrapping,
    wrapT: ClampToEdgeWrapping,
    repeat: new Vector2(1, 1),
    magFilter: LinearFilter,
    minFilter: LinearMipmapLinearFilter,
    flipY: true
};
export { TextureOptions, TextureUtils };
