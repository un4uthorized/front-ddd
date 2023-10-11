import { describe, it } from "vitest";
import { Damage } from "../../../src/domain/services/Damage";
import { Pokemon } from "../../../src/domain/entities";
import { Id, Name, Types, Level, HealthPoints, Attack, Defense, Abilities, Ability, Sprite } from "../../../src/domain/value-objects";
import { expect } from "vitest";

describe("Damage", () => {
    it("Given a pokemon with level 10, attack of 10 points, it should return damage of 0.6 based on the multiplier", () => {
        // Arrange
        const charmander = new Pokemon(
            Id.create(1),
            Name.create("Charmander"),
            Types.FIRE,
            Level.create(10),
            HealthPoints.create(50),
            HealthPoints.create(50),
            Attack.create(10),
            Defense.create(10),
            Abilities.create([new Ability("Blaze", "Increases damage when HP is below 1/3rd.", 0.3)]),
            Sprite.create("front_image.png", "back_image.png")
        );

        const bulbasaur = new Pokemon(
            Id.create(2),
            Name.create("Bulbasaur"),
            Types.GRASS,
            Level.create(10),
            HealthPoints.create(50),
            HealthPoints.create(50),
            Attack.create(10),
            Defense.create(10),
            Abilities.create([new Ability("Overgrow", "Increases damage when HP is below 1/3rd.", 0.3)]),
            Sprite.create("front_image.png", "back_image.png")
        );

        // Act
        const damage = Damage.calculate(charmander, bulbasaur, charmander.pokemonAbilities.firstAbility, 1);

        // Assert
        expect(damage).toBe(0.6);
    });
});