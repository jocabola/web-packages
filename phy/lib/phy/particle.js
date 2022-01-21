"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spring = exports.Particle = void 0;
const math_1 = require("@jocabola/math");
class Particle {
    constructor(id = 0, drag = 0.03, lifetime = -1) {
        this.id = id;
        this.age = 0;
        this.lifetime = lifetime;
        this.drag = drag;
        this.state = 0;
        this.position = new math_1.Vec();
        this.prev = new math_1.Vec();
        this.force = new math_1.Vec();
        this.tmp = new math_1.Vec();
    }
    get locked() {
        return this.state === 1;
    }
    get dead() {
        return this.state === 3;
    }
    get idle() {
        return this.state === 2;
    }
    lock() {
        this.state = 1;
    }
    unlock() {
        this.state = 2;
    }
    die() {
        this.state = 3;
    }
    setPosition(x, y, z = 0) {
        this.position.set(x, y, z);
        this.prev.set(x, y, z);
    }
    copyPosition(v) {
        this.setPosition(v.x, v.y, v.z);
    }
    update() {
        if (this.lifetime > 0 && this.age === this.lifetime)
            this.state = 3;
        if (this.state > 0)
            return;
        this.age++;
        this.tmp.copy(this.position);
        this.position.x += ((this.position.x - this.prev.x) + this.force.x);
        this.position.y += ((this.position.y - this.prev.y) + this.force.y);
        this.position.z += ((this.position.z - this.prev.z) + this.force.z);
        this.force.set(0, 0, 0);
        this.prev.copy(this.tmp);
        this.prev.lerp(this.position, this.drag);
    }
}
exports.Particle = Particle;
class Spring {
    constructor(a, b, strength = 0.5) {
        this.restLength = 0;
        this.a = a;
        this.b = b;
        this.strength = strength;
        this.restLength = this.a.position.distanceTo(this.b.position);
    }
    update() {
        const delta = this.b.position.clone().sub(this.a.position);
        const dist = delta.length() + Number.MIN_VALUE;
        const normDistStrength = (dist - this.restLength) / dist * this.strength;
        if (normDistStrength === 0)
            return;
        delta.scale(normDistStrength);
        if (!this.a.locked) {
            this.a.position.add(delta);
        }
        if (!this.b.locked) {
            this.b.position.sub(delta);
        }
    }
}
exports.Spring = Spring;
