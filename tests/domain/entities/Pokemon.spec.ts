import { it, describe, expect } from "vitest";

import { Pokemon } from "../../../src/domain/entities/Pokemon";
import { Grass, Id, Level, Name } from "../../../src/domain/value-objects";


describe("Pokemon", () => {
    it("should be able to create a new Pokemon", () => {
        // Arrange
        const id = new Id(1);
        const name = new Name("Bulbasaur");
        const type = new Grass();
        const level = new Level(1);

        // Act
        const pokemon = new Pokemon(id, name, type, level);

        // Assert
        expect(pokemon.pokemonId).toBe(id.value);
        expect(pokemon.pokemonName).toBe(name.value);
        expect(pokemon.pokemonType).toBe(type.value);
        expect(pokemon.pokemonLevel).toBe(level.value);
    });

});