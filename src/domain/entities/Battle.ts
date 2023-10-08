import { Turn } from "../value-objects/Turn";
import { Pokemon } from "./Pokemon";

export class Battle {

    constructor(
        readonly pokemon1: Pokemon,
        readonly pokemon2: Pokemon,
        readonly turns: Turn[],
    ) { }


    static create(pokemon1: Pokemon, pokemon2: Pokemon): Battle {
        return new Battle(pokemon1, pokemon2, []);
    }

    addTurn(turn: Turn): Battle {

        const { pokemon1, pokemon2 } = turn.execute();

        return new Battle(pokemon1, pokemon2, [...this.turns, turn]);
    }
}