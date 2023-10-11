import { describe, it, expect } from "vitest";
import { Ability } from "../../../src/domain/value-objects";

describe("Ability", () => {
    it("Should be able to create a new Ability instance", () => {
        // Arrange
        const ability = new Ability("Overgrow", "When HP is below 1/3rd, Grass's power increases to 1.5 times.", 20);

        // Assert
        expect(ability.abilityName).toBe("Overgrow");
        expect(ability.abilityDescription).toBe("When HP is below 1/3rd, Grass's power increases to 1.5 times.");
        expect(ability.abilityDamage).toBe(20);
    });
})