import { Type } from "./Type";

export class Grass extends Type {
    constructor() {
        super("grass");
    }
    isStrongAgainst(type: Type) {
        return type.type === "water";
    }
    isWeakAgainst(type: Type) {
        return type.type === "fire";
    }
    isResistantAgainst(type: Type) {
        return type.type === "grass";
    }
    isVulnerableAgainst(type: Type) {
        return type.type === "fire";
    }
}