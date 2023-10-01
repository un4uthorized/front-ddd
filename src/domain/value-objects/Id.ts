export class Id {
    constructor(
        public readonly value: number,
    ) { }

    get id(): number {
        return this.value;
    }

}