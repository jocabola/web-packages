/*
 * Abstract Vec2 & Vec3 Classes for phy package
 * To remove THREE core dependency
 */

import MathUtils from './MathUtils'

export default class Vec {
	x:number
	y:number
	z:number
	
	constructor(x:number=0, y:number=0, z:number=0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	copy(v:Vec):Vec {
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		return this;
	}

	set(x:number, y:number, z:number=0):Vec {
		this.x = x;
		this.y = y;
		this.z = z;

		return this;
	}

	clone():Vec {
		return new Vec(this.x, this.y, this.z);
	}

	add(v:Vec):Vec {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;
	}

	sub(v:Vec):Vec {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		
		return this;
	}

	mul(v:Vec):Vec {
		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;

		return this;
	}

	div(v:Vec):Vec {
		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;

		return this;
	}

	scale(scl:number):Vec {
		this.x *= scl;
		this.y *= scl;
		this.z *= scl;

		return this;
	}

	length():number {
		return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
	}

	lerp(target:Vec, alpha:number):Vec {
		this.x = MathUtils.lerp(this.x, target.x, alpha);
		this.y = MathUtils.lerp(this.y, target.y, alpha);
		this.z = MathUtils.lerp(this.y, target.z, alpha);

		return this;
	}

	equals(v:Vec):boolean {
		return this.x === v.x && this.y === v.y && this.z === v.z;
	}

	dot(v:Vec):number {
		return this.x*v.x + this.y*v.y + this.z*v.z;
	}

	distanceTo(v:Vec):number {
		return this.clone().sub(v).length();
	}
}