import { Id, Name, Type, Level } from "../value-objects";

export class Pokemon {
    constructor(
        public id: Id,
        public name: Name,
        public type: Type,
        public level: Level,
    ) { }

    get pokemonId(): number {
        return this.id.value;
    }

    get pokemonName(): string {
        return this.name.name;
    }

    get pokemonType(): string {
        return this.type.type;
    }

    get pokemonLevel(): number {
        return this.level.level;
    }


}