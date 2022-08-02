export default class Sketch {
    protected _started: boolean;
    protected _paused: boolean;
    protected _raf: FrameRequestCallback;
    protected _rafId: number;
    private _startTime;
    constructor();
    get started(): boolean;
    start(customRaf?: FrameRequestCallback): number;
    addEventListeners(): void;
    pause(): void;
    resume(): void;
    update(): void;
    manualUpdate(time: number): void;
    render(): void;
}
