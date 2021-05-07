import { CanvasTexture, CubeTexture, PixelFormat, Texture, TextureFilter, Vector2, VideoTexture, Wrapping } from "three";
declare class TextureOptions {
    format?: PixelFormat;
    wrapS?: Wrapping;
    wrapT?: Wrapping;
    repeat?: Vector2;
    magFilter?: TextureFilter;
    minFilter?: TextureFilter;
    flipY?: boolean;
}
declare class TextureUtils {
    static TextureDefaults: TextureOptions;
    static applyTextureOptions(tex: Texture | VideoTexture | CanvasTexture | CubeTexture, opts: TextureOptions): void;
}
export { TextureOptions, TextureUtils };
