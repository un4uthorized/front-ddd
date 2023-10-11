export class Defense {
    constructor(private readonly value: number) { }

    static create(value: number): Defense {
        if (value < 0) throw new Error('Defense cannot be negative');

        return new Defense(value);
    }

    get defense(): number {
        return this.value;
    }
}