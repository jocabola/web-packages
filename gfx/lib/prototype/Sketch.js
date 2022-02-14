"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sketch {
    constructor() {
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
            requestAnimationFrame(animate);
            this.update();
            this.render();
        };
        if (customRaf == null)
            return animate();
        return customRaf();
    }
    update() { }
    render() { }
}
exports.default = Sketch;
