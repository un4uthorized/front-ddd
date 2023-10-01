import { Type } from "./Type";

export class Fire extends Type {
    constructor() {
        super("fire");
    }

    isStrongAgainst(type: Type): boolean {
        return type.type === "grass";
    }

    isWeakAgainst(type: Type): boolean {
        return type.type === "water";
    }

    isResistantAgainst(type: Type): boolean {
        return type.type === "fire";
    }

    isVulnerableAgainst(type: Type): boolean {
        return type.type === "water";
    }
}