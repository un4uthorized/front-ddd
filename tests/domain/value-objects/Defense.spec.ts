import { describe, it, expect } from "vitest";
import { Defense } from "../../../src/domain/value-objects";

describe("Defense", () => {
    it("Should be able to create a new Defense instance", () => {
        // Arrange
        const { defense } = Defense.create(10);

        // Assert
        expect(defense).toBe(10);
    });

    it("Should return an error when creating a new Defense instance with a negative value", () => {
        // Arrange
        const defense = () => Defense.create(-10);

        // Assert
        expect(defense).toThrowError("Defense cannot be negative");
    });
});