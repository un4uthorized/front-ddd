import { Turn } from "../services/Turn";
import { Pokemon } from "./Pokemon";

export class Battle {

    constructor(
        private readonly pokemon1: Pokemon,
        private readonly pokemon2: Pokemon,
        private readonly currentPokemon: Pokemon,
        private readonly turns: Turn[],
    ) { }

    get battlePokemon1(): Pokemon {
        return this.pokemon1;
    }

    get battlePokemon2(): Pokemon {
        return this.pokemon2;
    }

    get battleCurrentPokemon(): Pokemon {
        return this.currentPokemon;
    }

    get battleTurns(): Turn[] {
        return this.turns;
    }


    static create(pokemon1: Pokemon, pokemon2: Pokemon): Battle {
        return new Battle(pokemon1, pokemon2, pokemon1, []);
    }

    addTurn(turn: Turn): Battle {
        if (this.currentPokemon.pokemonId !== turn.attacker.pokemonId) {
            throw new Error('The attacker is not the current pokemon');
        }

        const { attacker, defender } = turn.execute();

        return new Battle(defender, attacker, defender, [...this.turns, turn]);
    }

    isBattleFinished(): boolean {
        return this.pokemon1.pokemonHp.healthPoints === 0 || this.pokemon2.pokemonHp.healthPoints === 0;
    }

    getWinner(): Pokemon | null {
        if (!this.isBattleFinished()) {
            return null;
        }

        return this.pokemon1.pokemonHp.healthPoints === 0 ? this.pokemon2 : this.pokemon1;
    }

    getLoser(): Pokemon | null {
        if (!this.isBattleFinished()) {
            return null;
        }

        return this.pokemon1.pokemonHp.healthPoints === 0 ? this.pokemon1 : this.pokemon2;
    }

}