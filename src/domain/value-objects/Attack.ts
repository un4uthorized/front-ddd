import { Ability } from ".";
import { Pokemon } from "../entities";
import { Turn } from "./Turn";



export class Attack implements Turn {
    constructor(
        readonly pokemon1: Pokemon,
        readonly pokemon2: Pokemon,
        readonly ability: Ability
    ) { }


    static create(pokemon1: Pokemon, pokemon2: Pokemon, ability: Ability): Attack {
        return new Attack(pokemon1, pokemon2, ability);
    }

    execute(): { pokemon1: Pokemon, pokemon2: Pokemon } {
        const damage = this.ability.abilityDamage;
        const newPokemon2 = this.pokemon2.reduceHealthPoints(damage);
        return {
            pokemon1: this.pokemon1,
            pokemon2: newPokemon2
        }
    }
}