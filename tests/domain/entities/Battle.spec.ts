import { describe, expect, it } from "vitest";
import { Pokemon, Battle } from '../../../src/domain/entities';
import { Id, Name, Level, Ability, HealthPoints, Turn, Type, Attack } from "../../../src/domain/value-objects";

describe("Battle", () => {
    it("should be able to create a new Battle", () => {
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

        // Act
        const battle = Battle.create(charmander, bulbasaur);

        // Assert
        expect(battle).toBeInstanceOf(Battle);
        expect(battle.battlePokemon1).toBe(charmander);
        expect(battle.battlePokemon2).toBe(bulbasaur);
        expect(battle.battleCurrentPokemon).toBe(charmander);
        expect(battle.battleTurns).toEqual([]);
    });

    it('Given that the first pokemon makes the first move, an error must be returned if the first pokemon makes a new move next.', () => {
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
        expect(() => result.addTurn(Attack.create(charmander, bulbasaur, charmander.firstAbility))).toThrowError('The attacker is not the current pokemon');
    })


    it('Given that the first pokemon makes the first move, the next move must be from the second pokemon.', () => {
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
        expect(result.battleCurrentPokemon).toBe(bulbasaur);
    })


    it('Given that the second pokemon makes the second move, the next move must be from the first pokemon.', () => {
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
        const turn1 = battle.addTurn(Attack.create(charmander, bulbasaur, charmander.firstAbility));
        const result = turn1.addTurn(Attack.create(bulbasaur, charmander, bulbasaur.firstAbility));


        // Assert
        expect(result.battleCurrentPokemon).toBe(charmander);
    })


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
        expect(result.battlePokemon2.pokemonHp.healthPoints).toBe(49.7);
    })

    it("Given the battle is not over yet, if you try to find out the winner, should return null", () => {
        // Arrange
        const charmander = new Pokemon(
            new Id(1),
            new Name("Charmander"),
            Type.FIRE,
            new Level(10),
            new HealthPoints(50),
            new HealthPoints(50),
            [new Ability("Blaze", "Increases damage when HP is below 1/3rd.", 50)],
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
        const result = battle.getWinner();

        // Assert
        expect(result).toBe(null);
    })

    it("Given the battle is over, if you try to find out the loser, should return the null", () => {
        // Arrange
        const charmander = new Pokemon(
            new Id(1),
            new Name("Charmander"),
            Type.FIRE,
            new Level(10),
            new HealthPoints(50),
            new HealthPoints(50),
            [new Ability("Blaze", "Increases damage when HP is below 1/3rd.", 50)],
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
        const result = battle.getLoser();

        // Assert
        expect(result).toBe(null);
    });

    it("Given a pokemon drops to 0 health, the enemy pokemon must be declared the winner.", () => {
        // Arrange
        const charmander = new Pokemon(
            new Id(1),
            new Name("Charmander"),
            Type.FIRE,
            new Level(10),
            new HealthPoints(50),
            new HealthPoints(50),
            [new Ability("Blaze", "Increases damage when HP is below 1/3rd.", 50)],
        );

        const bulbasaur = new Pokemon(
            new Id(2),
            new Name("Bulbasaur"),
            Type.GRASS,
            new Level(10),
            new HealthPoints(0),
            new HealthPoints(50),
            [new Ability("Overgrow", "Increases damage when HP is below 1/3rd.", 0.3)],
        );

        // Act
        const battle = Battle.create(charmander, bulbasaur);

        // Assert
        expect(battle.isBattleFinished()).toBe(true);
        expect(battle.getWinner()).toBe(charmander);
        expect(battle.getLoser()).toBe(bulbasaur);
    })

    it("Given a pokemon drops to 0 health, the enemy pokemon must be declared the winner.", () => {
        // Arrange
        const charmander = new Pokemon(
            new Id(1),
            new Name("Charmander"),
            Type.FIRE,
            new Level(10),
            new HealthPoints(0),
            new HealthPoints(50),
            [new Ability("Blaze", "Increases damage when HP is below 1/3rd.", 50)],
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

        // Act
        const battle = Battle.create(charmander, bulbasaur);

        // Assert
        expect(battle.isBattleFinished()).toBe(true);
        expect(battle.getWinner()).toBe(bulbasaur);
        expect(battle.getLoser()).toBe(charmander);
    })
});