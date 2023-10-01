export class Name {
    constructor(
        public readonly value: string,
    ) { }

    get name(): string {
        return this.value;
    }

}