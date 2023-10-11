import { describe, it, expect } from "vitest";
import { DamageCalculatorFactory } from '../../../src/domain/services/DamageCalculatorFactory'

describe("DamageCalculatorFactory", () => {
    it("should be able to create a new DamageCalculator", () => {
        // Arrange
        const damageCalculator = DamageCalculatorFactory.create();

        // Assert
        expect(damageCalculator).toBeDefined();
        expect(damageCalculator).toHaveProperty('calculate');
    });
})