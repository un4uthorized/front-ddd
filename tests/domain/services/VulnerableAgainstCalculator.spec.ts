import { describe, it, expect, vi } from "vitest";
import { VulnerableAgainstCalculator } from "../../../src/domain/services";
import { Pokemon } from "../../../src/domain/entities";
import { Id, Name, Types, Level, HealthPoints, Attack, Defense, Abilities, Ability, Sprite } from "../../../src/domain/value-objects";
import { DamageCalculatorStub } from "../stubs/DamageCalculatorStub";

describe("VulnerableAgainstCalculator", () => {
    it("Given the defending Pokemon is vulnerable to attack, the damage must be very high.", () => {
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

        const squirtle = new Pokemon(
            Id.create(2),
            Name.create("Squirle"),
            Types.WATER,
            Level.create(10),
            HealthPoints.create(50),
            HealthPoints.create(50),
            Attack.create(10),
            Defense.create(10),
            Abilities.create([new Ability("Torrent", "Increases damage when HP is below 1/3rd.", 0.3)]),
            Sprite.create("front_image.png", "back_image.png")
        );

        const sut = new VulnerableAgainstCalculator();

        // Act
        const result = sut.calculate(squirtle, charmander, squirtle.pokemonAbilities.firstAbility);

        // Assert
        expect(result).toBe(1.5);
    });

    it("Given call the callback function if the damage caused is not assigned to the types and a callback function is passed", () => {
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

        const damageCalculatorStub = new DamageCalculatorStub();

        const calculateSpy = vi.spyOn(damageCalculatorStub, "calculate");

        const sut = new VulnerableAgainstCalculator(damageCalculatorStub);

        // Act
        sut.calculate(bulbasaur, charmander, bulbasaur.pokemonAbilities.firstAbility);

        // Assert
        expect(calculateSpy).toHaveBeenCalled();
    })

    it("Given that a callback function was not passed and the type-based damage pattern was not found, it should return the skill's base damage", () => {
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

        const sut = new VulnerableAgainstCalculator();

        // Act
        const damage = sut.calculate(bulbasaur, charmander, bulbasaur.pokemonAbilities.firstAbility);

        // Assert
        expect(damage).toBe(0.6);
    })

});