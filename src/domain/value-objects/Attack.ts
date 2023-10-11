export class Attack {
    constructor(private readonly value: number) { }

    static create(value: number): Attack {
        if (value < 0) throw new Error('Attack must be a positive number');

        return new Attack(value);
    }

    get attack(): number {
        return this.value;
    }
}