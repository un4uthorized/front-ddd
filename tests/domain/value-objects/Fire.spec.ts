import { describe, it, expect } from "vitest";
import { Types } from "../../../src/domain/value-objects";
import { Fire } from "../../../src/domain/value-objects/Fire";


describe("Fire", () => {
    it("Should be able to create a new Fire instance", () => {
        // Arrange
        const fire = Types.FIRE

        // Assert
        expect(fire).toBeInstanceOf(Fire);
        expect(fire.typeName).toBe("fire");
    });

    it("Should be strong against grass", () => {
        // Arrange
        const fire = Types.FIRE
        const grass = Types.GRASS

        // Assert
        expect(fire.isStrongAgainst(grass)).toBe(true);
    });

    it("Should be weak against water", () => {
        // Arrange
        const fire = Types.FIRE
        const water = Types.WATER

        // Assert
        expect(fire.isWeakAgainst(water)).toBe(true);
    });

    it("Should be resistant against fire", () => {
        // Arrange
        const fire = Types.FIRE

        // Assert
        expect(fire.isResistantAgainst(fire)).toBe(true);
    });

    it("Should be vulnerable against water", () => {
        // Arrange
        const fire = Types.FIRE
        const water = Types.WATER

        // Assert
        expect(fire.isVulnerableAgainst(water)).toBe(true);
    });
});