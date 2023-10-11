import { it, describe, expect } from "vitest";

import { Pokemon } from "../../../src/domain/entities/Pokemon";
import { Types, Id, Level, Name, Attack, Defense, Ability, Abilities, Sprite } from "../../../src/domain/value-objects";
import { HealthPoints } from "../../../src/domain/value-objects/HealthPoints";


describe("Pokemon", () => {
    it("should be able to create a new Pokemon", () => {
        // Arrange
        const id = new Id(1);
        const name = new Name("Bulbasaur");
        const type = Types.GRASS
        const level = new Level(1);
        const hp = new HealthPoints(300)
        const maxHp = new HealthPoints(300)
        const attack = new Attack(49)
        const defense = new Defense(49)
        const abilities = new Abilities([
            new Ability("Overgrow", "When HP is below 1/3rd, Grass's power increases to 1.5 times.", 20),
            new Ability("Chlorophyll", "When sunny, the Pokémon's Speed doubles.", 20),
            new Ability("Leaf Guard", "Prevents status conditions in sunny weather.", 20),
        ])
        const sprite = Sprite.create("front_image.png", "back_image.png")

        // Act
        const pokemon = new Pokemon(id, name, type, level, hp, maxHp, attack, defense, abilities, sprite);

        // Assert
        expect(pokemon.pokemonId.id).toBe(id.id);
        expect(pokemon.pokemonName.name).toBe(name.name);
        expect(pokemon.pokemonType.typeName).toBe(type.typeName);
        expect(pokemon.pokemonLevel.level).toBe(level.level);
        expect(pokemon.pokemonHp.healthPoints).toBe(hp.healthPoints);
        expect(pokemon.pokemonAbilities).toBe(abilities);
        expect(pokemon.pokemonSprite).toBe(sprite);
    });

});