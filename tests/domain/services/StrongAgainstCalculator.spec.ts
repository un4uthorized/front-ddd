import { describe, it, expect } from "vitest";
import { StrongAgainstCalculator } from "../../../src/domain/services";
import { Pokemon } from "../../../src/domain/entities";
import { Id, Name, Types, Level, HealthPoints, Attack, Defense, Abilities, Ability } from "../../../src/domain/value-objects";
import { vi } from "vitest";
import { DamageCalculatorStub } from "../stubs/DamageCalculatorStub";

describe("StrongAgainstCalculator", () => {
    it("Given that the pokemon has a type that overlaps with the enemy, the damage caused must be high", () => {
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

        const sut = new StrongAgainstCalculator();

        // Act
        const result = sut.calculate(charmander, bulbasaur, charmander.pokemonAbilities.firstAbility);

        // Assert
        expect(result).toBe(1.2);
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

        const sut = new StrongAgainstCalculator(damageCalculatorStub);

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

        const sut = new StrongAgainstCalculator();

        // Act
        const damage = sut.calculate(bulbasaur, charmander, bulbasaur.pokemonAbilities.firstAbility);

        // Assert
        expect(damage).toBe(0.6);
    })

});