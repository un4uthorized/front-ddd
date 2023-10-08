import { Id, Name, TypeStrategy, Level } from "../value-objects";
import { Ability } from "../value-objects/Ability";
import { HealthPoints } from "../value-objects/HealthPoints";

export class Pokemon {
    constructor(
        private id: Id,
        private name: Name,
        private type: TypeStrategy,
        private level: Level,
        private hp: HealthPoints,
        private maxHp: HealthPoints,
        private Abilities: Ability[],
    ) { }

    get pokemonId() {
        return this.id;
    }

    get pokemonName() {
        return this.name;
    }

    get pokemonType() {
        return this.type;
    }

    get pokemonLevel() {
        return this.level;
    }

    get pokemonHp() {
        return this.hp;
    }

    get pokemonMaxHp() {
        return this.maxHp;
    }

    get pokemonAbilities(): Ability[] {
        return this.Abilities;
    }

    get firstAbility(): Ability {
        return this.Abilities[0];
    }

    get secondAbility(): Ability {
        return this.Abilities[1];
    }

    get thirdAbility(): Ability {
        return this.Abilities[2];
    }

    get fourthAbility(): Ability {
        return this.Abilities[3];
    }

}