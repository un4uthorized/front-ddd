export class Level {

    constructor(private readonly value: number) {
        this.validate(value);
    }

    get level(): number {
        return this.value;
    }

    up(): Level {
        return new Level(this.value + 1);
    }

    validate(value: number): void {
        if (value < 1 || value > 100) {
            throw new Error('Level must be between 1 and 100');
        }
    }
}