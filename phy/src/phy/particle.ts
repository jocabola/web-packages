/*
 * Verlet Physics package for web
 * Based in and ported from FieldKit
 * https://github.com/marcuswendt/FieldKit.js
 * Implementation in TypeScript
 * 
 */
import { Vec } from "@jocabola/math";

/*
 * Particle States
 */
export const enum State {
	ALIVE,
	LOCKED,
	IDLE,
	DEAD
}

/*
 * Verlet Particle Base Class
 * Ignore Z values (default 0) if 2D
 */

export class Particle {
	id:number
	age:number
	lifetime:number
	drag:number
	state:State
	position:Vec
	prev:Vec
	force:Vec
	tmp:Vec

	constructor (id:number=0, drag:number=0.03, lifetime:number=-1) {
		this.id = id;
		this.age = 0;
		this.lifetime = lifetime; // -1 > infinite by default
		this.drag = drag;
		this.state = State.ALIVE
		this.position = new Vec()
		this.prev = new Vec()
		this.force = new Vec()
		this.tmp = new Vec()
	}

	get locked():boolean {
		return this.state === State.LOCKED;
	}

	get dead():boolean {
		return this.state === State.DEAD;
	}

	get idle():boolean {
		return this.state === State.IDLE;
	}

	lock() {
		this.state = State.LOCKED;
	}

	unlock() {
		this.state = State.IDLE;
	}

	die() {
		this.state = State.DEAD;
	}

	setPosition(x:number, y:number, z:number=0) {
		this.position.set(x,y,z);
		this.prev.set(x,y,z);
	}

	copyPosition (v:Vec) {
		this.setPosition(v.x,v.y,v.z);
	}
	
	update () {
		if (this.lifetime > 0 && this.age === this.lifetime) this.state = State.DEAD;
		if (this.state > State.ALIVE ) return;

		this.age++

		this.tmp.copy(this.position);
		this.position.x += ((this.position.x - this.prev.x) + this.force.x);
		this.position.y += ((this.position.y - this.prev.y) + this.force.y);
		this.position.z += ((this.position.z - this.prev.z) + this.force.z);
		this.force.set(0,0,0);
		this.prev.copy(this.tmp);
		this.prev.lerp(this.position, this.drag);
	}
}

/*
 * Verlet Spring
 */
export class Spring {
	a:Particle
	b:Particle
	strength:number
	restLength:number=0

	constructor(a:Particle, b:Particle, strength:number=0.5) {
		this.a = a;
		this.b = b;
		this.strength = strength;
		this.restLength = this.a.position.distanceTo(this.b.position);
	}

	update() {
		const delta = this.b.position.clone().sub(this.a.position);
		const dist = delta.length() + Number.MIN_VALUE;
		const normDistStrength = (dist - this.restLength) / dist * this.strength

		if (normDistStrength === 0) return;

		delta.scale(normDistStrength);

		if (!this.a.locked) {
			this.a.position.add(delta);
		}
		if (!this.b.locked) {
			this.b.position.sub(delta);
		}
	}
}