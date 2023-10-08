export class Name {
    constructor(
        private readonly value: string,
    ) { }

    get name(): string {
        return this.value;
    }

}