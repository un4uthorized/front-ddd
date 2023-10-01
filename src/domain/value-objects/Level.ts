export class Level {
    value: number;

    constructor(level: number) {
        this.validate(level);
        this.value = level;
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