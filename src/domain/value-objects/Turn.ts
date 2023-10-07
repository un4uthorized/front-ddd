import { Pokemon } from "../entities/Pokemon";
import { Ability } from "./Ability";

export abstract class Turn {
    constructor(
        readonly pokemon1: Pokemon,
        readonly pokemon2: Pokemon,
        readonly ability: Ability,
    ) { }

    abstract execute(): { pokemon1: Pokemon, pokemon2: Pokemon };
}