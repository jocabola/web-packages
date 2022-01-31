import { MathUtils } from "@jocabola/math";
import { linear } from "../main";
const DEFAULT_EASING = linear;
export class Timeline {
    constructor(autoStart = false) {
        this.timeline = new Array();
        this.started = false;
        this.paused = false;
        if (autoStart) {
            this.start();
        }
    }
    clear() {
        this.timeline.splice(0, this.timeline.length);
    }
    start() {
        if (this.started)
            return;
        this.started = true;
        this.startTime = performance.now();
        this.time = 0;
    }
    restart() {
        this.started = false;
        this.start();
    }
    pause() {
        if (this.paused)
            return;
        this.paused = true;
    }
    resume() {
        if (!this.paused)
            return;
        this.startTime = performance.now() - this.time;
        this.paused = false;
    }
    get currentTime() {
        return this.time;
    }
    add(el) {
        this.timeline.push(el);
    }
    remove(el) {
        this.timeline.splice(this.timeline.indexOf(el), 1);
    }
    update() {
        if (!this.started || this.paused)
            return;
        this.time = performance.now() - this.startTime;
        const timeSec = this.time * .001;
        const len = this.timeline.length;
        for (let i = 0; i < len; i++) {
            const el = this.timeline[i];
            const opts = el.options;
            if (timeSec < opts.startTime || timeSec > opts.startTime + opts.duration)
                continue;
            const ease = opts.ease ? opts.ease : DEFAULT_EASING;
            const progress = ease(MathUtils.smoothstep(opts.startTime, opts.startTime + opts.duration, timeSec));
            el.onUpdate(progress);
        }
    }
}
export class PropertyAnimator {
    constructor(target, property, opts) {
        this.target = target;
        this.prop = property;
        this.options = opts;
    }
    onUpdate(progress) {
        const opts = this.options;
        this.target[this.prop] = opts.from + (opts.to - opts.from) * progress;
    }
}
