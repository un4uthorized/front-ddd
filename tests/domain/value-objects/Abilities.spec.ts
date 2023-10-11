import { describe, it, expect } from "vitest";
import { Abilities, Ability } from "../../../src/domain/value-objects";

describe("Abilities", () => {
    it("Should be able to create a new Abilities instance", () => {
        // Arrange
        const abilities = Abilities.create([
            new Ability("Overgrow", "When HP is below 1/3rd, Grass's power increases to 1.5 times.", 20),
        ])


        // Assert
        expect(abilities.firstAbility.abilityName).toBe("Overgrow");
        expect(abilities.firstAbility.abilityDescription).toBe("When HP is below 1/3rd, Grass's power increases to 1.5 times.");
        expect(abilities.firstAbility.abilityDamage).toBe(20);
    });

    it("Should be able to create a new empty Abilities instance", () => {
        // Arrange
        const abilities = Abilities.createEmpty();

        // Assert
        expect(abilities.abilities).toEqual([]);
    });

    it("Should be able to get the first ability", () => {
        // Arrange
        const abilities = Abilities.create([
            new Ability("Overgrow", "When HP is below 1/3rd, Grass's power increases to 1.5 times.", 20),
        ])

        // Assert
        expect(abilities.firstAbility).toBeInstanceOf(Ability);
    });

    it("Should be able to get the second ability", () => {
        // Arrange
        const abilities = Abilities.create([
            new Ability("Overgrow", "When HP is below 1/3rd, Grass's power increases to 1.5 times.", 20),
            new Ability("Chlorophyll", "When sunny, the Pokémon's Speed doubles.", 20),
        ])

        // Assert
        expect(abilities.secondAbility).toBeInstanceOf(Ability);
    });

    it("Should be able to get the third ability", () => {
        // Arrange
        const abilities = Abilities.create([
            new Ability("Overgrow", "When HP is below 1/3rd, Grass's power increases to 1.5 times.", 20),
            new Ability("Chlorophyll", "When sunny, the Pokémon's Speed doubles.", 20),
            new Ability("Leaf Guard", "Prevents status conditions in sunny weather.", 20),
        ])

        // Assert
        expect(abilities.thirdAbility).toBeInstanceOf(Ability);
    });

    it("Should be able to get the fourth ability", () => {
        // Arrange
        const abilities = Abilities.create([
            new Ability("Overgrow", "When HP is below 1/3rd, Grass's power increases to 1.5 times.", 20),
            new Ability("Chlorophyll", "When sunny, the Pokémon's Speed doubles.", 20),
            new Ability("Leaf Guard", "Prevents status conditions in sunny weather.", 20),
            new Ability("Leaf Guard", "Prevents status conditions in sunny weather.", 20),
        ])

        // Assert
        expect(abilities.fourthAbility).toBeInstanceOf(Ability);
    });

    it("Should throw an error if the abilities array is bigger than 4", () => {
        // Assert
        expect(() => {
            Abilities.create([
                new Ability("Overgrow", "When HP is below 1/3rd, Grass's power increases to 1.5 times.", 20),
                new Ability("Chlorophyll", "When sunny, the Pokémon's Speed doubles.", 20),
                new Ability("Leaf Guard", "Prevents status conditions in sunny weather.", 20),
                new Ability("Leaf Guard", "Prevents status conditions in sunny weather.", 20),
                new Ability("Leaf Guard", "Prevents status conditions in sunny weather.", 20),
            ])
        }).toThrowError("A pokemon can only have 4 abilities")
    });


});