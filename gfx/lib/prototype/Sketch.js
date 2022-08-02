export default class Sketch {
    constructor() {
        this._paused = false;
        this._raf = null;
        this._rafId = -1;
        this._startTime = 0;
        this._started = false;
    }
    get started() {
        return this._started;
    }
    start(customRaf = null) {
        if (this._started)
            return;
        this._started = true;
        const animate = () => {
            this.update();
            this.render();
            requestAnimationFrame(animate);
        };
        if (customRaf == null) {
            this._raf = animate;
        }
        else {
            this._raf = customRaf;
        }
        this.addEventListeners();
        this._startTime = performance.now();
        this._rafId = requestAnimationFrame(this._raf);
        return this._rafId;
    }
    addEventListeners() {
    }
    pause() {
        if (!this._started)
            return;
        if (this._paused)
            return;
        this._paused = true;
        cancelAnimationFrame(this._rafId);
    }
    resume() {
        if (!this._started)
            return;
        if (!this._paused)
            return;
        this._paused = false;
        this._rafId = requestAnimationFrame(this._raf);
    }
    update() {
        const time = performance.now() - this._startTime;
        this.manualUpdate(time);
    }
    manualUpdate(time) { }
    render() { }
}
