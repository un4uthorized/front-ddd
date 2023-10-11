import { describe, it, expect } from "vitest";
import { Types } from "../../../src/domain/value-objects";
import { Water } from "../../../src/domain/value-objects/Water";


describe("Water", () => {
    it("Should be able to create a new Water instance", () => {
        // Arrange
        const water = Types.WATER

        // Assert
        expect(water).toBeInstanceOf(Water);
        expect(water.typeName).toBe("water");
    });

    it("Should be strong against fire", () => {
        // Arrange
        const water = Types.WATER
        const fire = Types.FIRE

        // Assert
        expect(water.isStrongAgainst(fire)).toBe(true);
    });

    it("Should be weak against grass", () => {
        // Arrange
        const water = Types.WATER
        const grass = Types.GRASS

        // Assert
        expect(water.isWeakAgainst(grass)).toBe(true);
    });

    it("Should be resistant against water", () => {
        // Arrange
        const water = Types.WATER

        // Assert
        expect(water.isResistantAgainst(water)).toBe(true);
    })

    it("Should be vulnerable against grass", () => {
        // Arrange
        const water = Types.WATER
        const grass = Types.GRASS

        // Assert
        expect(water.isVulnerableAgainst(grass)).toBe(true);
    });


});