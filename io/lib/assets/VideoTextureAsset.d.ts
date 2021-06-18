import { VideoTexture } from 'three';
import { TextureOptions } from '../utils/TextureUtils';
import Asset from "./Asset";
export default class VideoTextureAsset extends Asset {
    loop: boolean;
    content: VideoTexture;
    options: TextureOptions;
    constructor(url: string, loop?: boolean, options?: TextureOptions);
    load(callback?: Function): void;
    destroy(): void;
    update(): void;
}
