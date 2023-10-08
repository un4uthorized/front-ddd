import { Pokemon } from "../entities/Pokemon";
import { Ability } from "./Ability";

export abstract class Turn {
    constructor(
        readonly attacker: Pokemon,
        readonly defender: Pokemon,
        readonly ability: Ability,
    ) { }

    abstract execute(): { pokemon1: Pokemon, pokemon2: Pokemon };
}