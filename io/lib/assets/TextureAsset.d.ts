import { Texture } from 'three';
import { TextureOptions } from '../utils/TextureUtils';
import Asset from "./Asset";
export default class TextureAsset extends Asset {
    options: TextureOptions;
    content: Texture;
    isCompressed: boolean;
    constructor(url: string, opts?: TextureOptions, compressed?: boolean);
    load(callback?: any): void;
    destroy(): void;
}
