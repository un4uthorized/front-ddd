import { Pokemon } from "../entities";
import { Ability } from "../value-objects";

export class Damage {
    static calculate(attacker: Pokemon, defender: Pokemon, ability: Ability, multiplier: number): number {
        return (attacker.pokemonLevel.level / 5) * ((ability.abilityDamage * multiplier * attacker.pokemonAttack.attack) / defender.pokemonDefense.defense);
    }
}