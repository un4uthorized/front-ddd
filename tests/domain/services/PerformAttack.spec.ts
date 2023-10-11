import { describe, it, expect } from "vitest";
import { PerformAttack } from "../../../src/domain/services";
import { Pokemon } from "../../../src/domain/entities";
import { Id, Name, Types, Level, HealthPoints, Attack, Defense, Abilities, Ability, Sprite } from "../../../src/domain/value-objects";
import { DamageCalculatorStub } from "../stubs/DamageCalculatorStub";

describe("PerformAttack", () => {
    it("Should create an attack turn", () => {
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

        const damageCalculatorStub = new DamageCalculatorStub(10);

        // Act
        const attack = PerformAttack.create(charmander, bulbasaur, charmander.pokemonAbilities.firstAbility, damageCalculatorStub);


        // Assert
        expect(attack).toBeInstanceOf(PerformAttack);
    });

    it("Should calculate damage correctly and reduce opponent's health points", () => {
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

        const damageCalculatorStub = new DamageCalculatorStub(10);
        const turn = PerformAttack.create(charmander, bulbasaur, charmander.pokemonAbilities.firstAbility, damageCalculatorStub);

        // Act
        const turnResult = turn.execute()

        // Assert
        expect(turnResult.pokemon2.pokemonHp.healthPoints).toBe(40);
    });

    it("Given that an attack is made with an invalid ability, it must return an error", () => {
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

        const damageCalculatorStub = new DamageCalculatorStub(10);

        // Assert
        expect(() => PerformAttack.create(charmander, bulbasaur, new Ability("Invalid", "Invalid", 0.3), damageCalculatorStub)).toThrowError("This pokemon does not have this ability");
    })
});