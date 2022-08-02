/*
 * Base Class for Code Sketches
 */

export default class Sketch {
	protected _started:boolean;
	protected _paused:boolean = false;
	protected _raf:FrameRequestCallback = null;
	protected _rafId:number = -1;
	private _startTime:number = 0;
	constructor () {
		this._started = false;
	}

	get started():boolean {
		return this._started;
	}

	start(customRaf:FrameRequestCallback=null): number {
		if(this._started) return;
		this._started = true;
		const animate = () => {
			this.update();
			this.render();
			requestAnimationFrame(animate);
		}

		if (customRaf == null) {
			this._raf = animate;
		} else {
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
		if(!this._started) return;
		if(this._paused) return;
		this._paused = true;
		cancelAnimationFrame(this._rafId);
	}

	resume() {
		if(!this._started) return;
		if(!this._paused) return;
		this._paused = false;
		this._rafId = requestAnimationFrame(this._raf);
	}

	update() {
		const time = performance.now() - this._startTime;
		this.manualUpdate(time);
	}

	manualUpdate(time:number) {}

	render() {}
}