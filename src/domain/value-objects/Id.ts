export class Id {
    constructor(
        private readonly value: number,
    ) { }

    get id(): number {
        return this.value;
    }

}