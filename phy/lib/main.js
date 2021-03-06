"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Physics = exports.Emitter = exports.Constraint = exports.Behaviour = exports.Spring = exports.Particle = void 0;
const particle_1 = require("./phy/particle");
Object.defineProperty(exports, "Particle", { enumerable: true, get: function () { return particle_1.Particle; } });
Object.defineProperty(exports, "Spring", { enumerable: true, get: function () { return particle_1.Spring; } });
const physics_1 = require("./phy/physics");
Object.defineProperty(exports, "Behaviour", { enumerable: true, get: function () { return physics_1.Behaviour; } });
Object.defineProperty(exports, "Constraint", { enumerable: true, get: function () { return physics_1.Constraint; } });
Object.defineProperty(exports, "Emitter", { enumerable: true, get: function () { return physics_1.Emitter; } });
Object.defineProperty(exports, "Physics", { enumerable: true, get: function () { return physics_1.Physics; } });
