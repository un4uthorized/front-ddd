import { Id, Name, TypeStrategy, Level } from "../value-objects";
import { Ability } from "../value-objects/Ability";
import { HealthPoints } from "../value-objects/HealthPoints";

export class Pokemon {
    constructor(
        public id: Id,
        public name: Name,
        public type: TypeStrategy,
        public level: Level,
        public hp: HealthPoints,
        public maxHp: HealthPoints,
        public Abilities: Ability[],
    ) {
        if (Abilities.length === 0) {
            throw new Error("Pokemon must have at least one ability");
        }

        if (Abilities.length > 3) {
            throw new Error("Pokemon can't have more than four abilities");
        }
    }

    get pokemonId(): number {
        return this.id.value;
    }

    get pokemonName(): string {
        return this.name.name;
    }

    get pokemonType(): string {
        return this.type.typeName;
    }

    get pokemonLevel(): number {
        return this.level.level;
    }

    get pokemonHp(): number {
        return this.hp.healthPoints;
    }

    get pokemonMaxHp(): number {
        return this.maxHp.healthPoints;
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

    reduceHealthPoints(damage: number): Pokemon {
        const newHp = this.hp.reduceHealthPoints(damage);

        return new Pokemon(this.id, this.name, this.type, this.level, newHp, this.maxHp, this.Abilities);
    }

}