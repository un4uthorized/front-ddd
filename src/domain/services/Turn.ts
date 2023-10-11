import { Pokemon } from "../entities/Pokemon";

export interface Turn {
    attacker: Pokemon;
    defender: Pokemon;
    execute(): { pokemon1: Pokemon, pokemon2: Pokemon };
}
