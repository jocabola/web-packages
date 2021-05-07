"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spring = exports.Particle = void 0;
var math_1 = require("@jocabola/math");
var Particle = (function () {
    function Particle(id, drag, lifetime) {
        if (id === void 0) { id = 0; }
        if (drag === void 0) { drag = 0.03; }
        if (lifetime === void 0) { lifetime = -1; }
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
    Object.defineProperty(Particle.prototype, "locked", {
        get: function () {
            return this.state === 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Particle.prototype, "dead", {
        get: function () {
            return this.state === 3;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Particle.prototype, "idle", {
        get: function () {
            return this.state === 2;
        },
        enumerable: false,
        configurable: true
    });
    Particle.prototype.lock = function () {
        this.state = 1;
    };
    Particle.prototype.unlock = function () {
        this.state = 2;
    };
    Particle.prototype.die = function () {
        this.state = 3;
    };
    Particle.prototype.setPosition = function (x, y, z) {
        if (z === void 0) { z = 0; }
        this.position.set(x, y, z);
        this.prev.set(x, y, z);
    };
    Particle.prototype.copyPosition = function (v) {
        this.setPosition(v.x, v.y, v.z);
    };
    Particle.prototype.update = function () {
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
    };
    return Particle;
}());
exports.Particle = Particle;
var Spring = (function () {
    function Spring(a, b, strength) {
        if (strength === void 0) { strength = 0.5; }
        this.restLength = 0;
        this.a = a;
        this.b = b;
        this.strength = strength;
        this.restLength = this.a.position.distanceTo(this.b.position);
    }
    Spring.prototype.update = function () {
        var delta = this.b.position.clone().sub(this.a.position);
        var dist = delta.length() + Number.MIN_VALUE;
        var normDistStrength = (dist - this.restLength) / dist * this.strength;
        if (normDistStrength === 0)
            return;
        delta.scale(normDistStrength);
        if (!this.a.locked) {
            this.a.position.add(delta);
        }
        if (!this.b.locked) {
            this.b.position.sub(delta);
        }
    };
    return Spring;
}());
exports.Spring = Spring;
