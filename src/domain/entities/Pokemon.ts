import { Id, Name, TypeStrategy, Level, Attack, Defense, Sprite } from "../value-objects";
import { Abilities } from "../value-objects/Abilities";
import { HealthPoints } from "../value-objects/HealthPoints";

export class Pokemon {
    constructor(
        private readonly id: Id,
        private readonly name: Name,
        private readonly type: TypeStrategy,
        private readonly level: Level,
        private readonly hp: HealthPoints,
        private readonly maxHp: HealthPoints,
        private readonly attack: Attack,
        private readonly defense: Defense,
        private readonly Abilities: Abilities,
        private readonly sprite: Sprite
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

    get pokemonAttack() {
        return this.attack;
    }

    get pokemonDefense() {
        return this.defense;
    }

    get pokemonAbilities() {
        return this.Abilities;
    }

    get pokemonSprite() {
        return this.sprite;
    }

}