import { TypeStrategy } from "./TypeStrategy";

export class Grass extends TypeStrategy {
    constructor() {
        super("grass");
    }
    isStrongAgainst(type: TypeStrategy) {
        return type.typeName === "water";
    }
    isWeakAgainst(type: TypeStrategy) {
        return type.typeName === "fire";
    }
    isResistantAgainst(type: TypeStrategy) {
        return type.typeName === "grass";
    }
    isVulnerableAgainst(type: TypeStrategy) {
        return type.typeName === "fire";
    }
}