import MathUtils from './MathUtils';
export default class Vec {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    }
    set(x, y, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    clone() {
        return new Vec(this.x, this.y, this.z);
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }
    mul(v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        return this;
    }
    div(v) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        return this;
    }
    scale(scl) {
        this.x *= scl;
        this.y *= scl;
        this.z *= scl;
        return this;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    lerp(target, alpha) {
        this.x = MathUtils.lerp(this.x, target.x, alpha);
        this.y = MathUtils.lerp(this.y, target.y, alpha);
        this.z = MathUtils.lerp(this.z, target.z, alpha);
        return this;
    }
    equals(v) {
        return this.x === v.x && this.y === v.y && this.z === v.z;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    distanceTo(v) {
        return this.clone().sub(v).length();
    }
    normalize() {
        const L = this.length();
        if (L == 0)
            return this;
        this.x /= L;
        this.y /= L;
        this.z /= L;
        return this;
    }
}
