import { DamageCalculator } from "../../../src/domain/services";

export class DamageCalculatorStub implements DamageCalculator {
    constructor(
        readonly damage: number = 0
    ) { }

    calculate(): number {
        return this.damage;
    }
}