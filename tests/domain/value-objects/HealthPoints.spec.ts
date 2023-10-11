import { describe, it, expect } from "vitest";
import { HealthPoints } from "../../../src/domain/value-objects";

describe("HealthPoints", () => {
    it("Should be able to create a new HealthPoints instance", () => {
        // Act 
        const healthPoints = HealthPoints.create(10);

        // Assert
        expect(healthPoints.healthPoints).toBe(10);
    });

    it("Should return an error when creating a new HealthPoints instance with a negative value", () => {
        // Arrange
        const healthPoints = () => HealthPoints.create(-10);

        // Assert
        expect(healthPoints).toThrowError("HealthPoints must be greater than 0");
    });

    it("Should that the total life points are 100 points, when it decreases by 20, the result should be 80", () => {
        // Arrange
        const healthPoints = HealthPoints.create(100);

        // Act
        const result = healthPoints.reduceHealthPoints(20);

        // Assert
        expect(result.healthPoints).toBe(80);
    })

    it("Should return 0 when the total life points are 100 and it decreases by 110", () => {
        // Arrange
        const healthPoints = HealthPoints.create(100);

        // Act
        const result = healthPoints.reduceHealthPoints(110);

        // Assert
        expect(result.healthPoints).toBe(0);
    });

    it("Should return an error when the damage is negative", () => {
        // Arrange
        const healthPoints = HealthPoints.create(100);

        // Act
        const result = () => healthPoints.reduceHealthPoints(-10);

        // Assert
        expect(result).toThrowError("Damage must be greater than 0");
    });
});