export default class Sketch {
    constructor() {
        this.started = false;
    }
    start() {
        if (this.started)
            return;
        this.started = true;
        const animate = () => {
            requestAnimationFrame(animate);
            this.update();
            this.render();
        };
        animate();
    }
    update() { }
    render() { }
}
