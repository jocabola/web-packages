import Asset from './Asset';
export default class GLTFAsset extends Asset {
    constructor(url: string);
    load(callback?: Function): void;
    destroy(): void;
}
