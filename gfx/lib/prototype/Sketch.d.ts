export default class Sketch {
    protected _started: boolean;
    protected _paused: boolean;
    protected _raf: FrameRequestCallback;
    protected _rafId: number;
    constructor();
    get started(): boolean;
    start(customRaf?: FrameRequestCallback): number;
    pause(): void;
    resume(): void;
    update(): void;
    render(): void;
}
