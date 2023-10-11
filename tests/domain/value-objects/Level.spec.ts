import { describe, it, expect } from "vitest";
import { Level } from "../../../src/domain/value-objects";

describe("Level", () => {
    it("Should be able to create a new Level instance", () => {
        // Arrange
        const level = Level.create(1);

        // Assert
        expect(level).toBeInstanceOf(Level);
        expect(level.level).toBe(1);
    });

    it("Should return an error when creating a new Level instance with a negative value", () => {
        // Arrange
        const level = () => Level.create(-1);

        // Assert
        expect(level).toThrowError("Level must be between 1 and 100");
    });

    it("Should return an error when creating a new Level instance with a value greater than 100", () => {
        // Arrange
        const level = () => Level.create(101);

        // Assert
        expect(level).toThrowError("Level must be between 1 and 100");
    });

    it("Should be able to increase the level", () => {
        // Arrange
        const level = Level.create(1);

        // Act
        const result = level.up();

        // Assert
        expect(result.level).toBe(2);
    });

});