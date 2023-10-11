import { describe, it, expect, vi } from "vitest";
import { WeakAgainstCalculator } from "../../../src/domain/services";
import { Pokemon } from "../../../src/domain/entities";
import { Id, Name, Types, Level, HealthPoints, Attack, Defense, Abilities, Ability, Sprite } from "../../../src/domain/value-objects";
import { DamageCalculatorStub } from "../stubs/DamageCalculatorStub";

describe("WeakAgainstCalculator", () => {
    it("Given the enemy Pokémon is a higher type, the attacker's damage should be halved.", () => {
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

        const sut = new WeakAgainstCalculator();

        // Act
        const result = sut.calculate(charmander, squirtle, charmander.pokemonAbilities.firstAbility);

        // Assert
        expect(result).toBe(0.3);
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

        const charizard = new Pokemon(
            Id.create(2),
            Name.create("Charizard"),
            Types.FIRE,
            Level.create(10),
            HealthPoints.create(50),
            HealthPoints.create(50),
            Attack.create(10),
            Defense.create(10),
            Abilities.create([new Ability("Blaze", "Increases damage when HP is below 1/3rd.", 0.3)]),
            Sprite.create("front_image.png", "back_image.png")
        );

        const damageCalculatorStub = new DamageCalculatorStub();

        const calculateSpy = vi.spyOn(damageCalculatorStub, "calculate");

        const sut = new WeakAgainstCalculator(damageCalculatorStub);

        // Act
        sut.calculate(charizard, charmander, charizard.pokemonAbilities.firstAbility);

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

        const charizard = new Pokemon(
            Id.create(2),
            Name.create("Charizard"),
            Types.FIRE,
            Level.create(10),
            HealthPoints.create(50),
            HealthPoints.create(50),
            Attack.create(10),
            Defense.create(10),
            Abilities.create([new Ability("Blaze", "Increases damage when HP is below 1/3rd.", 0.3)]),
            Sprite.create("front_image.png", "back_image.png")
        );

        const sut = new WeakAgainstCalculator();

        // Act
        const damage = sut.calculate(charizard, charmander, charizard.pokemonAbilities.firstAbility);

        // Assert
        expect(damage).toBe(0.6);
    })

});