export class Id {
    constructor(
        private readonly value: number,
    ) { }

    static create(id: number): Id {
        if (id < 0) {
            throw new Error('Id must be greater than 0');
        }

        return new Id(id);
    }

    get id(): number {
        return this.value;
    }

}