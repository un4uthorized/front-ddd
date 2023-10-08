import { Ability, HealthPoints } from ".";
import { Pokemon } from "../entities";
import { Turn } from "./Turn";

export class Attack implements Turn {
    constructor(
        readonly attacker: Pokemon,
        readonly defender: Pokemon,
        readonly ability: Ability
    ) {
        if (!attacker.pokemonAbilities.includes(ability)) {
            throw new Error('This pokemon does not have this ability');
        }
    }


    static create(pokemon1: Pokemon, pokemon2: Pokemon, ability: Ability): Attack {
        return new Attack(pokemon1, pokemon2, ability);
    }

    execute(): { pokemon1: Pokemon, pokemon2: Pokemon } {
        const damage = this.ability.abilityDamage;

        const newHealthPointsAfterAttack = HealthPoints.create(this.defender.pokemonHp.healthPoints - damage)

        const pokemonAfterAttack = new Pokemon(
            this.defender.pokemonId,
            this.defender.pokemonName,
            this.defender.pokemonType,
            this.defender.pokemonLevel,
            newHealthPointsAfterAttack,
            this.defender.pokemonMaxHp,
            this.defender.pokemonAbilities
        );

        return {
            pokemon1: this.attacker,
            pokemon2: pokemonAfterAttack
        }
    }
}