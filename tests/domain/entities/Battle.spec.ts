import { describe, expect, it } from "vitest";
import { Pokemon, Battle } from '../../../src/domain/entities';
import { Id, Name, Level, Ability, HealthPoints, Turn, Type, Attack } from "../../../src/domain/value-objects";

describe("Battle", () => {
    it(`Given that the attacking Pokemon attacks the defender with a 0.3 point ability, 
        the defender must have 49.7 life points.`, () => {
        // Arrange
        const charmander = new Pokemon(
            new Id(1),
            new Name("Charmander"),
            Type.FIRE,
            new Level(10),
            new HealthPoints(50),
            new HealthPoints(50),
            [new Ability("Blaze", "Increases damage when HP is below 1/3rd.", 0.3)],
        );

        const bulbasaur = new Pokemon(
            new Id(2),
            new Name("Bulbasaur"),
            Type.GRASS,
            new Level(10),
            new HealthPoints(50),
            new HealthPoints(50),
            [new Ability("Overgrow", "Increases damage when HP is below 1/3rd.", 0.3)],
        );

        const battle = Battle.create(charmander, bulbasaur);

        // Act
        const result = battle.addTurn(Attack.create(charmander, bulbasaur, charmander.firstAbility));

        // Assert
        expect(result).toBeInstanceOf(Battle);
        expect(result.pokemon2.hp.value).toBe(49.7);

    })
});