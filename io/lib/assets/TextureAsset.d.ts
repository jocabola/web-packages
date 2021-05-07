import { Texture } from 'three';
import { TextureOptions } from '../utils/TextureUtils';
import Asset from "./Asset";
export default class TextureAsset extends Asset {
    options: TextureOptions;
    content: Texture;
    constructor(url: string, opts?: TextureOptions);
    load(callback?: any): void;
    destroy(): void;
}
