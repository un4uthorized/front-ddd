import { Pokemon } from "../entities";
import { Ability } from "../value-objects";
import { Damage } from "./Damage";
import { DamageCalculator } from "./DamageCalculator";

export class StrongAgainstCalculator implements DamageCalculator {
    MULTIPLIER = 2;

    constructor(
        readonly next?: DamageCalculator
    ) { }

    calculate(attacker: Pokemon, defender: Pokemon, ability: Ability): number {
        if (attacker.pokemonType.isStrongAgainst(defender.pokemonType)) {
            return Damage.calculate(attacker, defender, ability, this.MULTIPLIER);
        }

        if (this.next) {
            return this.next.calculate(attacker, defender, ability);
        }

        return Damage.calculate(attacker, defender, ability, 1);
    }
}