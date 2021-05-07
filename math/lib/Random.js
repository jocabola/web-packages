"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mersenne_1 = __importDefault(require("mersenne"));
var Random = (function () {
    function Random(seed) {
        if (seed === void 0) { seed = 0; }
        mersenne_1.default.seed(seed);
    }
    Random.seed = function (seed) {
        mersenne_1.default.seed(seed);
    };
    Random.random = function () {
        var N = 1000;
        return mersenne_1.default.rand(N) / (N - 1);
    };
    Random.randi = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        return Math.round(Random.randf(min, max));
    };
    Random.randf = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        return min + (max - min) * Random.random();
    };
    Random.randc = function () {
        return Random.random() * 0xFFFFFF << 0;
    };
    return Random;
}());
exports.default = Random;
