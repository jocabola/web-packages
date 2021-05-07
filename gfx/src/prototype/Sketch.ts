/*
 * Base Class for Code Sketches
 */

export default class Sketch {
	private started:boolean;
	constructor () {
		this.started = false;
	}

	start() {
		if(this.started) return;
		this.started = true;
		const animate = () => {
			requestAnimationFrame(animate);
			this.update();
			this.render();
		}

		animate();
	}

	update() {}

	render() {}
}