export default class Sketch {
    protected _started: boolean;
    constructor();
    get started(): boolean;
    start(customRaf?: Function): any;
    update(): void;
    render(): void;
}
