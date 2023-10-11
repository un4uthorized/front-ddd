export class Level {

    constructor(private readonly value: number) {
    }

    static create(level: number): Level {
        if (level < 1 || level > 100) {
            throw new Error('Level must be between 1 and 100');
        }

        return new Level(level);
    }

    get level(): number {
        return this.value;
    }

    up(): Level {
        return new Level(this.value + 1);
    }
}