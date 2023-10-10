import { describe, it, expect } from "vitest";
import { DamageCalculator, ResistantAgainstCalculator } from "../../../src/domain/services";
import { Pokemon } from "../../../src/domain/entities";
import { Id, Name, Types, Level, HealthPoints, Attack, Defense, Abilities, Ability } from "../../../src/domain/value-objects";
import { vi } from "vitest";
import { DamageCalculatorStub } from "../stubs/DamageCalculatorStub";

describe("ResistantAgainstCalculator", () => {
    it("Should return 0.6 when the attacking pokemon is resistant against the defending pokemon", () => {
        // Arrange
        const ivysaur = new Pokemon(
            Id.create(1),
            Name.create("Ivysaur"),
            Types.GRASS,
            Level.create(10),
            HealthPoints.create(50),
            HealthPoints.create(50),
            Attack.create(10),
            Defense.create(10),
            Abilities.create([new Ability("Overgrow", "Increases damage when HP is below 1/3rd.", 0.3)]),
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
        );

        const sut = new ResistantAgainstCalculator();

        // Act
        const result = sut.calculate(ivysaur, bulbasaur, ivysaur.pokemonAbilities.firstAbility);

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
            Abilities.create([new Ability("Blaze", "Increases damage when HP is below 1/3rd.", 0.3)])
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
        );

        const damageCalculatorStub = new DamageCalculatorStub();

        const calculateSpy = vi.spyOn(damageCalculatorStub, "calculate");

        const sut = new ResistantAgainstCalculator(damageCalculatorStub);

        // Act
        sut.calculate(charmander, bulbasaur, charmander.pokemonAbilities.firstAbility);

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
            Abilities.create([new Ability("Blaze", "Increases damage when HP is below 1/3rd.", 0.3)])
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
        );

        const sut = new ResistantAgainstCalculator();

        // Act
        const damage = sut.calculate(charmander, bulbasaur, charmander.pokemonAbilities.firstAbility);

        // Assert
        expect(damage).toBe(0.6);
    })

});