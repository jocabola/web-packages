export default class Random {
    constructor(seed?: number);
    static seed(seed: number): void;
    static random(): number;
    static randi(min?: number, max?: number): number;
    static randf(min?: number, max?: number): number;
    static randc(): number;
}
