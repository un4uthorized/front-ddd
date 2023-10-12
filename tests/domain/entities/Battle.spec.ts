import { describe, expect, it } from "vitest";
import { Pokemon, Battle } from '../../../src/domain/entities';
import { Id, Name, Level, Ability, HealthPoints, Types, Defense, Attack, Abilities, Sprite } from "../../../src/domain/value-objects";
import { PerformAttack } from "../../../src/domain/services";
import { DamageCalculatorStub } from "../stubs/DamageCalculatorStub";

describe("Battle", () => {
    it("should be able to create a new Battle", () => {
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

        const battle = Battle.create(charmander, bulbasaur);

        const damageCalculator = new DamageCalculatorStub();

        // Act
        const result = battle.addTurn(PerformAttack.create(charmander, bulbasaur, charmander.pokemonAbilities.firstAbility, damageCalculator));

        // Assert
        expect(() => result.addTurn(PerformAttack.create(charmander, bulbasaur, charmander.pokemonAbilities.firstAbility, damageCalculator))).toThrowError('The attacker is not the current pokemon');
    })


    it('Given that the first pokemon makes the first move, the next move must be from the second pokemon.', () => {
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

        const battle = Battle.create(charmander, bulbasaur);

        const damageCalculator = new DamageCalculatorStub();

        // Act
        const result = battle.addTurn(PerformAttack.create(charmander, bulbasaur, charmander.pokemonAbilities.firstAbility, damageCalculator));

        // Assert
        expect(result.battleCurrentPokemon).toStrictEqual(bulbasaur);
    })


    it('Given that the second pokemon makes the second move, the next move must be from the first pokemon.', () => {
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

        const battle = Battle.create(charmander, bulbasaur);

        const damageCalculator = new DamageCalculatorStub();

        // Act
        const turn1 = battle.addTurn(PerformAttack.create(charmander, bulbasaur, charmander.pokemonAbilities.firstAbility, damageCalculator));
        const result = turn1.addTurn(PerformAttack.create(bulbasaur, charmander, bulbasaur.pokemonAbilities.firstAbility, damageCalculator));


        // Assert
        expect(result.battleCurrentPokemon).toStrictEqual(charmander);
    })


    it(`Given that the attacking Pokemon infringes a die of 10 points based on its characteristics 
        on the defender who has 50 life points, the defender must have 40 life points.`, () => {
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

        const battle = Battle.create(charmander, bulbasaur);

        const damageCalculator = new DamageCalculatorStub(10);

        // Act
        const result = battle.addTurn(
            PerformAttack.create(charmander, bulbasaur, charmander.pokemonAbilities.firstAbility, damageCalculator)
        );


        // Assert
        expect(result).toBeInstanceOf(Battle);
        expect(result.battlePokemon2.pokemonHp.healthPoints).toBe(50);
    })

    it("Given the battle is not over yet, if you try to find out the winner, should return null", () => {
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
            Abilities.create([new Ability("Blaze", "Increases damage when HP is below 1/3rd.", 50)]),
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

        const battle = Battle.create(charmander, bulbasaur);

        // Act
        const result = battle.getWinner();

        // Assert
        expect(result).toBe(null);
    })

    it("Given the battle is over, if you try to find out the loser, should return the null", () => {
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
            Abilities.create([new Ability("Blaze", "Increases damage when HP is below 1/3rd.", 50)]),
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

        const battle = Battle.create(charmander, bulbasaur);

        // Act
        const result = battle.getLoser();

        // Assert
        expect(result).toBe(null);
    });

    it("Given that the second Pokémon drops to 0 health, the first Pokémon must be declared the winner.", () => {
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
            Abilities.create([new Ability("Blaze", "Increases damage when HP is below 1/3rd.", 50)]),
            Sprite.create("front_image.png", "back_image.png")
        );

        const bulbasaur = new Pokemon(
            Id.create(2),
            Name.create("Bulbasaur"),
            Types.GRASS,
            Level.create(10),
            HealthPoints.create(0),
            HealthPoints.create(50),
            Attack.create(10),
            Defense.create(10),
            Abilities.create([new Ability("Overgrow", "Increases damage when HP is below 1/3rd.", 0.3)]),
            Sprite.create("front_image.png", "back_image.png")
        );

        // Act
        const battle = Battle.create(charmander, bulbasaur);

        // Assert
        expect(battle.isBattleFinished()).toBe(true);
        expect(battle.getWinner()).toBe(charmander);
        expect(battle.getLoser()).toBe(bulbasaur);
    })


    it("Given that the first Pokémon drops to 0 health, the second Pokémon must be declared the winner.", () => {
        // Arrange
        const charmander = new Pokemon(
            Id.create(1),
            Name.create("Charmander"),
            Types.FIRE,
            Level.create(10),
            HealthPoints.create(0),
            HealthPoints.create(50),
            Attack.create(10),
            Defense.create(10),
            Abilities.create([new Ability("Blaze", "Increases damage when HP is below 1/3rd.", 50)]),
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
        const battle = Battle.create(charmander, bulbasaur);

        // Assert
        expect(battle.isBattleFinished()).toBe(true);
        expect(battle.getWinner()).toBe(bulbasaur);
        expect(battle.getLoser()).toBe(charmander);
    })
});