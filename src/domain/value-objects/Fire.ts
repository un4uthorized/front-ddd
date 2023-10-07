import { TypeStrategy } from "./TypeStrategy";

export class Fire extends TypeStrategy {
    constructor() {
        super("fire");
    }

    isStrongAgainst(type: TypeStrategy): boolean {
        return type.typeName === "grass";
    }

    isWeakAgainst(type: TypeStrategy): boolean {
        return type.typeName === "water";
    }

    isResistantAgainst(type: TypeStrategy): boolean {
        return type.typeName === "fire";
    }

    isVulnerableAgainst(type: TypeStrategy): boolean {
        return type.typeName === "water";
    }
}