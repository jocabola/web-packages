import mersenne from 'mersenne';
export default class Random {
    constructor(seed = 0) {
        mersenne.seed(seed);
    }
    static seed(seed) {
        mersenne.seed(seed);
    }
    static random() {
        let N = 1000;
        return mersenne.rand(N) / (N - 1);
    }
    static randi(min = 0, max = 1) {
        return Math.round(Random.randf(min, max));
    }
    static randf(min = 0, max = 1) {
        return min + (max - min) * Random.random();
    }
    static randc() {
        return Random.random() * 0xFFFFFF << 0;
    }
    static randarrind(arr) {
        const n = arr.length;
        const seq = Array.from(new Array(n), (val, index) => index);
        return Random.randarr(seq);
    }
    static randarr(arr) {
        const n = arr.length;
        for (let i = n - 1; i > 0; i--) {
            const j = Random.randi(0, i);
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
}
