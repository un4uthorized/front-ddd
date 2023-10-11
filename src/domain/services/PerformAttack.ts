import { Pokemon } from "../entities";
import { Ability, HealthPoints } from "../value-objects";
import { DamageCalculator, Turn } from '.'

export class PerformAttack implements Turn {
    constructor(
        readonly attacker: Pokemon,
        readonly defender: Pokemon,
        readonly ability: Ability,
        readonly damageCalculator: DamageCalculator
    ) { }


    static create(attacker: Pokemon, defender: Pokemon, ability: Ability, damageCalculator: DamageCalculator): PerformAttack {
        if (!attacker.pokemonAbilities.abilities.includes(ability)) {
            throw new Error('This pokemon does not have this ability');
        }

        return new PerformAttack(attacker, defender, ability, damageCalculator);
    }

    execute(): { pokemon1: Pokemon, pokemon2: Pokemon } {
        const calculateDamage = this.damageCalculator.calculate(this.attacker, this.defender, this.ability);
        const newHealthPointsAfterAttack = HealthPoints.create(this.defender.pokemonHp.healthPoints - calculateDamage)

        const pokemonAfterAttack = new Pokemon(
            this.defender.pokemonId,
            this.defender.pokemonName,
            this.defender.pokemonType,
            this.defender.pokemonLevel,
            newHealthPointsAfterAttack,
            this.defender.pokemonMaxHp,
            this.defender.pokemonAttack,
            this.defender.pokemonDefense,
            this.defender.pokemonAbilities,
            this.defender.pokemonSprite
        );

        return {
            pokemon1: this.attacker,
            pokemon2: pokemonAfterAttack
        }
    }
}