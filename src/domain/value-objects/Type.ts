export abstract class Type {
    constructor(
        public readonly value: string,
    ) { }

    get type(): string {
        return this.value;
    }

    abstract isStrongAgainst(type: Type): boolean;
    abstract isWeakAgainst(type: Type): boolean;
    abstract isResistantAgainst(type: Type): boolean;
    abstract isVulnerableAgainst(type: Type): boolean;
}