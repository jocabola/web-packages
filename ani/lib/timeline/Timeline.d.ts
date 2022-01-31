export declare type TimelineOptions = {
    startTime: number;
    duration: number;
    ease?: Function;
};
export interface TimelineObject {
    options: TimelineOptions;
    onUpdate(progress: number): void;
}
export declare class Timeline {
    private timeline;
    private started;
    private paused;
    private startTime;
    private time;
    constructor(autoStart?: boolean);
    clear(): void;
    start(): void;
    restart(): void;
    pause(): void;
    resume(): void;
    get currentTime(): number;
    add(el: TimelineObject): void;
    remove(el: TimelineObject): void;
    update(): void;
}
export interface PropertyOptions extends TimelineOptions {
    from: number;
    to: number;
}
export declare class PropertyAnimator implements TimelineObject {
    target: Object;
    prop: string;
    options: PropertyOptions;
    constructor(target: Object, property: string, opts: PropertyOptions);
    onUpdate(progress: number): void;
}
