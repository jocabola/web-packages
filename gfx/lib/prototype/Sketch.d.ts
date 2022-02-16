export default class Sketch {
    protected _started: boolean;
    constructor();
    get started(): boolean;
    start(customRaf?: FrameRequestCallback): number;
    update(): void;
    render(): void;
}
