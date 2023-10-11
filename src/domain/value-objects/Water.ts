import { TypeStrategy } from "./TypeStrategy";

export class Water extends TypeStrategy {
    constructor() {
        super("water");
    }

    isStrongAgainst(type: TypeStrategy): boolean {
        return type.typeName === "fire";
    }

    isWeakAgainst(type: TypeStrategy): boolean {
        return type.typeName === "grass";
    }

    isResistantAgainst(type: TypeStrategy): boolean {
        return type.typeName === "water";
    }

    isVulnerableAgainst(type: TypeStrategy): boolean {
        return type.typeName === "grass";
    }
}