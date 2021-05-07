import { Particle, Spring } from "./particle";
declare class Behaviour {
    constructor();
    prepare(): void;
    apply(p: Particle): void;
}
declare class Constraint {
    constructor();
    prepare(): void;
    apply(p: Particle): void;
}
declare type EmitterOptions = {
    rate?: number;
    interval?: number;
    max?: number;
};
declare class Emitter {
    physics: Physics;
    rate: number;
    interval: number;
    max: number;
    timer: number;
    id: number;
    constructor(physics: Physics, options?: EmitterOptions);
    update(): void;
    create(): Particle;
    init(p: Particle): void;
}
declare type Iterations = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
declare type PhysicsOptions = {
    constraintIterations?: Iterations;
    springIterations?: Iterations;
};
declare class Physics {
    particles: Array<Particle>;
    springs: Array<Spring>;
    behaviours: Array<Behaviour>;
    constraints: Array<Constraint>;
    emitter: Emitter | null;
    constraintIterations: Iterations;
    springIterations: Iterations;
    constructor(emitter?: Emitter | null, options?: PhysicsOptions);
    addParticle(particle: Particle): void;
    addSpring(spring: Spring): void;
    addBehaviour(behaviour: Behaviour): void;
    addConstraint(constraint: Constraint): void;
    update(): void;
    applyEffectors(effectors: Array<Behaviour | Constraint>, particles: Array<Particle>): void;
    size(): number;
}
export { Behaviour, Constraint, EmitterOptions, Emitter, PhysicsOptions, Physics };
