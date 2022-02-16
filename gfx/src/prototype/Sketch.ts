/*
 * Base Class for Code Sketches
 */

export default class Sketch {
	protected _started:boolean;
	constructor () {
		this._started = false;
	}

	get started():boolean {
		return this._started;
	}

	start(customRaf:FrameRequestCallback=null) {
		if(this._started) return;
		this._started = true;
		const animate = () => {
			requestAnimationFrame(animate);
			this.update();
			this.render();
		}

		if (customRaf == null) {
			return requestAnimationFrame(animate);
		}

		return requestAnimationFrame(customRaf);
	}

	update() {}

	render() {}
}