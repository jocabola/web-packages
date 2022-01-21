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

	start(customRaf:Function=null) {
		if(this._started) return;
		this._started = true;
		const animate = () => {
			requestAnimationFrame(animate);
			this.update();
			this.render();
		}

		if (customRaf == null) return animate();

		return customRaf();
	}

	update() {}

	render() {}
}