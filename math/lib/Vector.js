"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MathUtils_1 = __importDefault(require("./MathUtils"));
var Vec = (function () {
    function Vec(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vec.prototype.copy = function (v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    };
    Vec.prototype.set = function (x, y, z) {
        if (z === void 0) { z = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    };
    Vec.prototype.clone = function () {
        return new Vec(this.x, this.y, this.z);
    };
    Vec.prototype.add = function (v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    };
    Vec.prototype.sub = function (v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    };
    Vec.prototype.mul = function (v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        return this;
    };
    Vec.prototype.div = function (v) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        return this;
    };
    Vec.prototype.scale = function (scl) {
        this.x *= scl;
        this.y *= scl;
        this.z *= scl;
        return this;
    };
    Vec.prototype.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };
    Vec.prototype.lerp = function (target, alpha) {
        this.x = MathUtils_1.default.lerp(this.x, target.x, alpha);
        this.y = MathUtils_1.default.lerp(this.y, target.y, alpha);
        this.z = MathUtils_1.default.lerp(this.z, target.z, alpha);
        return this;
    };
    Vec.prototype.equals = function (v) {
        return this.x === v.x && this.y === v.y && this.z === v.z;
    };
    Vec.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    };
    Vec.prototype.distanceTo = function (v) {
        return this.clone().sub(v).length();
    };
    Vec.prototype.normalize = function () {
        var L = this.length();
        if (L == 0)
            return this;
        this.x /= L;
        this.y /= L;
        this.z /= L;
        return this;
    };
    return Vec;
}());
exports.default = Vec;
