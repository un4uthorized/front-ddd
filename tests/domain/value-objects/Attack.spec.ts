import { describe, it, expect } from "vitest";
import { Attack } from "../../../src/domain/value-objects";

describe("Attack", () => {
    it("Should be able to create a new Attack instance", () => {
        // Arrange
        const attack = new Attack(10);

        // Assert
        expect(attack.attack).toBe(10);
    });

    it("Should return an error when creating a new Attack instance with a negative value", () => {
        // Arrange
        const attack = () => Attack.create(-10);

        // Assert
        expect(attack).toThrowError("Attack must be a positive number");
    });
});