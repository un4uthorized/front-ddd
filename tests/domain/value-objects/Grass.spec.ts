import { describe, it, expect } from "vitest";
import { Types } from "../../../src/domain/value-objects";
import { Grass } from "../../../src/domain/value-objects/Grass";


describe("Grass", () => {
    it("Should be able to create a new Grass instance", () => {
        // Arrange
        const grass = Types.GRASS

        // Assert
        expect(grass).toBeInstanceOf(Grass);
        expect(grass.typeName).toBe("grass");
    });

    it("Should be strong against water", () => {
        // Arrange
        const grass = Types.GRASS
        const water = Types.WATER

        // Assert
        expect(grass.isStrongAgainst(water)).toBe(true);
    });

    it("Should be weak against fire", () => {
        // Arrange
        const grass = Types.GRASS
        const fire = Types.FIRE

        // Assert
        expect(grass.isWeakAgainst(fire)).toBe(true);
    });

    it("Should be resistant against grass", () => {
        // Arrange
        const grass = Types.GRASS

        // Assert
        expect(grass.isResistantAgainst(grass)).toBe(true);
    })

    it("Should be vulnerable against fire", () => {
        // Arrange
        const grass = Types.GRASS
        const fire = Types.FIRE

        // Assert
        expect(grass.isVulnerableAgainst(fire)).toBe(true);
    });


});