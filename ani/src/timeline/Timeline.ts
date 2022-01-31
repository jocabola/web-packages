import { MathUtils } from "@jocabola/math";
import { linear } from "../main";

/**
 * Timeline class and tools for
 * timeline animations
 */

const DEFAULT_EASING = linear;

/**
 * Abstract Timeline Object
 */

export type TimelineOptions = {
    startTime:number,
    duration:number,
    ease?:Function
}

export interface TimelineObject {
    options:TimelineOptions,
    onUpdate(progress:number):void
}

export class Timeline {
    private timeline = new Array<TimelineObject>();
    private started:boolean = false;
    private paused:boolean = false;
    private startTime:number;
    private time:number;
    constructor(autoStart:boolean=false) {
        if(autoStart) {
            this.start();    
        }
    }

    clear() {
        this.timeline.splice(0, this.timeline.length);
    } 

    start() {
        if(this.started) return;
        this.started = true;
        this.startTime = performance.now();
        this.time = 0;
    }

    restart() {
        this.started = false;
        this.start();
    }

    pause() {
        if(this.paused) return;
        this.paused = true;
    }

    resume() {
        if(!this.paused) return;
        this.startTime = performance.now() - this.time;
        this.paused = false;
    }

    get currentTime():number{
        return this.time;
    }

    add(el:TimelineObject) {
        this.timeline.push(el);
    }

    remove(el:TimelineObject) {
        this.timeline.splice(
            this.timeline.indexOf(el),
            1
        );
    }

    update() {
        if(!this.started || this.paused) return;
        this.time = performance.now() - this.startTime;
        const timeSec = this.time * .001;
        const len = this.timeline.length;
        for(let i=0; i<len; i++) {
            const el = this.timeline[i];
            const opts = el.options;
            if(timeSec<opts.startTime||timeSec>opts.startTime+opts.duration) continue;
            
            const ease = opts.ease ? opts.ease : DEFAULT_EASING;
            const progress = ease(MathUtils.smoothstep(
                opts.startTime,
                opts.startTime+opts.duration,
                timeSec
            ));
            el.onUpdate(progress);
        }
    }
}

export interface PropertyOptions extends TimelineOptions {
    from:number;
    to:number;
}

export class PropertyAnimator implements TimelineObject {
    target:Object;
    prop:string;
    options:PropertyOptions;

    constructor(target:Object, property:string, opts:PropertyOptions) {
        this.target = target;
        this.prop = property;
        this.options = opts;
    }

    onUpdate(progress: number): void {
        const opts = this.options;
        this.target[this.prop] = opts.from + (opts.to-opts.from) * progress;
    }
}