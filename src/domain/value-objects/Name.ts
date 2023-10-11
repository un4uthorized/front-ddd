export class Name {
    constructor(
        private readonly value: string,
    ) { }

    static create(name: string): Name {
        return new Name(name);
    }

    get name(): string {
        return this.value;
    }

}