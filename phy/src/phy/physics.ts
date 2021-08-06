/*
 * Verlet Physics package for web
 * Based in and ported from FieldKit
 * https://github.com/marcuswendt/FieldKit.js
 * Implementation in TypeScript
 * 
 */

import { Particle, Spring, State } from "./particle";

/*
 * Base Behaviour Class
 */

class Behaviour {
	constructor(){}
	
	// called once per frame
	prepare(){}
	
	// called per particle on each frame
	apply(p:Particle){}
}

/*
 * Base Constraint Class
 */

class Constraint {
	constructor(){}
	
	// called once per frame
	prepare(){}
	
	// called per particle on each frame
	apply(p:Particle){}
}

/*
 * Emitter Class
 */

type EmitterOptions = {
	rate?:number
	interval?:number
	max?:number
}

class Emitter {
	physics:Physics
	rate:number
	interval:number
	max:number
	timer:number
	id:number = 0

	constructor(physics:Physics, options:EmitterOptions={}) {
		this.physics = physics;
		this.rate = options.rate != undefined ? options.rate : 1;
		this.interval = options.interval != undefined ? options.interval : 1;
		this.max = options.max != undefined ? options.max : 1;
		this.timer = -1;
	}

	update() {
		if(this.timer === -1 || this.timer === this.interval) {
			// add particles
			this.timer = 0;

			for(let i=0;i<this.rate;i++) {
				if (this.physics.size() >= this.max) return;
				let p = this.create();
				this.init(p);
				this.physics.addParticle(p);
			}
		}
		this.timer++;
	}
	
	// extend this if required
	create():Particle {
		return new Particle(this.id++);
	}
	
	// you shall override this
	init(p:Particle) {
		// init your particle
	}
}

/*
 * To-Do: Space optimization 
*/

/*
 * Physics Class
 */

type Iterations = 1|2|3|4|5|6|7|8|9|10;

type PhysicsOptions = {
	constraintIterations?:Iterations
	springIterations?:Iterations
}

class Physics {
	particles:Array<Particle>
	springs:Array<Spring>
	behaviours:Array<Behaviour>
	constraints:Array<Constraint>
	emitter:Emitter|null
	constraintIterations:Iterations
	springIterations:Iterations

	constructor(emitter:Emitter|null=null, options:PhysicsOptions={}) {
		// list of particles in simulation
		this.particles = [];

		// list of springs in simulation
		this.springs = [];

		// list of behaviours & constraints
		this.behaviours = [];
		this.constraints = [];

		// Particle emitter
		this.emitter = emitter;

		// Settings
		this.constraintIterations = options.constraintIterations != undefined ? options.constraintIterations : 1;
		this.springIterations = options.springIterations != undefined ? options.springIterations : 1;
	}

	addParticle(particle:Particle) {
		this.particles.push(particle);
	}

	addSpring(spring:Spring) {
		this.springs.push(spring);
	}

	addBehaviour(behaviour:Behaviour) {
		this.behaviours.push(behaviour);
	}

	addConstraint(constraint:Constraint) {
		this.constraints.push(constraint);
	}

	update() {
		// shoot new particles?
		if (this.emitter !== null) this.emitter.update();

		// To-Do : Spaces optimisation

		this.applyEffectors(this.behaviours, this.particles);

		let sl = this.springs.length;

		for(let i=0; i<this.constraintIterations; i++) {
			this.applyEffectors(this.constraints, this.particles);
			for (let j=0; j<this.springIterations; j++) {
				for(let k=0; k<sl; k++) {
					this.springs[k].update();
				}
			}
		}

		// update all particles
		let dead = [];
		let pl = this.particles.length;
		for(let pi=0; pi<pl; pi++) {
			let p = this.particles[pi];
			p.update();
			if(p.dead) dead.push(p);
		}

		// remove dead particles
		let dl = dead.length;
		for(let di=0; di<dl; di++) {
			this.particles.splice(this.particles.indexOf(dead[di]), 1);
		}
	}

	applyEffectors(effectors:Array<Behaviour|Constraint>, particles:Array<Particle>) {
		let el = effectors.length;
		let pl = particles.length;
		for(let i=0;i<el;i++) {
			effectors[i].prepare();
			for(let k=0;k<pl;k++) {
				if(particles[k].state === State.ALIVE) {
					effectors[i].apply(particles[k]);
				}
			}
		}
	}

	size():number {
		return this.particles.length;
	}
}

export {
	Behaviour,
	Constraint,
	EmitterOptions,
	Emitter,
	PhysicsOptions,
	Physics
}