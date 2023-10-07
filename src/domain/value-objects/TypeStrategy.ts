export abstract class TypeStrategy {
    constructor(
        private readonly name: string,
    ) { }

    get typeName(): string {
        return this.name;
    }

    abstract isStrongAgainst(type: TypeStrategy): boolean;
    abstract isWeakAgainst(type: TypeStrategy): boolean;
    abstract isResistantAgainst(type: TypeStrategy): boolean;
    abstract isVulnerableAgainst(type: TypeStrategy): boolean;
}