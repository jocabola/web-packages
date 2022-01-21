"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Physics = exports.Emitter = exports.Constraint = exports.Behaviour = void 0;
const particle_1 = require("./particle");
class Behaviour {
    constructor() { }
    prepare() { }
    apply(p) { }
}
exports.Behaviour = Behaviour;
class Constraint {
    constructor() { }
    prepare() { }
    apply(p) { }
}
exports.Constraint = Constraint;
class Emitter {
    constructor(physics, options = {}) {
        this.id = 0;
        this.physics = physics;
        this.rate = options.rate != undefined ? options.rate : 1;
        this.interval = options.interval != undefined ? options.interval : 1;
        this.max = options.max != undefined ? options.max : 1;
        this.timer = -1;
    }
    update() {
        if (this.timer === -1 || this.timer === this.interval) {
            this.timer = 0;
            for (let i = 0; i < this.rate; i++) {
                if (this.physics.size() >= this.max)
                    return;
                let p = this.create();
                this.init(p);
                this.physics.addParticle(p);
            }
        }
        this.timer++;
    }
    create() {
        return new particle_1.Particle(this.id++);
    }
    init(p) {
    }
}
exports.Emitter = Emitter;
class Physics {
    constructor(emitter = null, options = {}) {
        this.particles = [];
        this.springs = [];
        this.behaviours = [];
        this.constraints = [];
        this.emitter = emitter;
        this.constraintIterations = options.constraintIterations != undefined ? options.constraintIterations : 1;
        this.springIterations = options.springIterations != undefined ? options.springIterations : 1;
    }
    addParticle(particle) {
        this.particles.push(particle);
    }
    addSpring(spring) {
        this.springs.push(spring);
    }
    addBehaviour(behaviour) {
        this.behaviours.push(behaviour);
    }
    addConstraint(constraint) {
        this.constraints.push(constraint);
    }
    update() {
        if (this.emitter !== null)
            this.emitter.update();
        this.applyEffectors(this.behaviours, this.particles);
        let sl = this.springs.length;
        for (let i = 0; i < this.constraintIterations; i++) {
            this.applyEffectors(this.constraints, this.particles);
            for (let j = 0; j < this.springIterations; j++) {
                for (let k = 0; k < sl; k++) {
                    this.springs[k].update();
                }
            }
        }
        let dead = [];
        let pl = this.particles.length;
        for (let pi = 0; pi < pl; pi++) {
            let p = this.particles[pi];
            p.update();
            if (p.dead)
                dead.push(p);
        }
        let dl = dead.length;
        for (let di = 0; di < dl; di++) {
            this.particles.splice(this.particles.indexOf(dead[di]), 1);
        }
    }
    applyEffectors(effectors, particles) {
        let el = effectors.length;
        let pl = particles.length;
        for (let i = 0; i < el; i++) {
            effectors[i].prepare();
            for (let k = 0; k < pl; k++) {
                if (particles[k].state === 0) {
                    effectors[i].apply(particles[k]);
                }
            }
        }
    }
    size() {
        return this.particles.length;
    }
}
exports.Physics = Physics;
