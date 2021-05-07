import { Vec } from "@jocabola/math";
declare const enum State {
    ALIVE = 0,
    LOCKED = 1,
    IDLE = 2,
    DEAD = 3
}
declare class Particle {
    id: number;
    age: number;
    lifetime: number;
    drag: number;
    state: State;
    position: Vec;
    prev: Vec;
    force: Vec;
    tmp: Vec;
    constructor(id?: number, drag?: number, lifetime?: number);
    get locked(): boolean;
    get dead(): boolean;
    get idle(): boolean;
    lock(): void;
    unlock(): void;
    die(): void;
    setPosition(x: number, y: number, z?: number): void;
    copyPosition(v: Vec): void;
    update(): void;
}
declare class Spring {
    a: Particle;
    b: Particle;
    strength: number;
    restLength: number;
    constructor(a: Particle, b: Particle, strength?: number);
    update(): void;
}
export { State, Particle, Spring };
