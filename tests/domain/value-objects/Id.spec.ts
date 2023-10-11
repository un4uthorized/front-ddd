import { describe, it, expect } from "vitest";
import { Id } from "../../../src/domain/value-objects";

describe("Id", () => {
    it("Should be able to create a new Id instance", () => {
        // Arrange
        const id = Id.create(1);

        // Assert
        expect(id).toBeInstanceOf(Id);
        expect(id.id).toBe(1);
    });

    it("Should return an error when creating a new Id instance with a negative value", () => {
        // Arrange
        const id = () => Id.create(-1);

        // Assert
        expect(id).toThrowError("Id must be greater than 0");
    });
});