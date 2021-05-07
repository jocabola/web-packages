export default class Asset {
    url: string;
    protected _loaded: boolean;
    protected _failed: boolean;
    content: any;
    protected binary: boolean;
    constructor(url: string, binary?: boolean);
    get loaded(): boolean;
    get failed(): boolean;
    load(callback?: Function): void;
    destroy(): void;
}
