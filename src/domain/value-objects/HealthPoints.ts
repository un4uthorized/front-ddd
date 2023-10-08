export class HealthPoints {
    constructor(private readonly value: number) {
        this.value = value;
    }

    get healthPoints(): number {
        return this.value;
    }

    reduceHealthPoints(damage: number): HealthPoints {
        if (damage < 0) {
            throw new Error('Damage must be greater than 0');
        }

        return HealthPoints.create(this.value - damage);
    }

    static create(hp: number): HealthPoints {
        if (hp < 0) {
            throw new Error('HealthPoints must be greater than 0');
        }

        return new HealthPoints(hp);
    }
}