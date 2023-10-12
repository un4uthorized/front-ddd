import { Pokemon } from "../entities/Pokemon";

export interface Turn {
    attacker: Pokemon;
    defender: Pokemon;
    execute(): { attacker: Pokemon, defender: Pokemon };
}
