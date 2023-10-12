import { expect } from "vitest";
import { it } from "vitest";
import { describe } from "vitest";
import { Sprite } from "../../../src/domain/value-objects";

describe("Sprite", () => {
    it("Should create a sprite", () => {
        // Arrange
        const front_default = "front_default.png";
        const back_default = "back_default.png";

        // Act
        const sprite = Sprite.create(front_default, back_default);

        // Assert
        expect(sprite).toBeInstanceOf(Sprite);
    });

    it("Should return the front default sprite", () => {
        // Arrange
        const front_default = "front_default.png";
        const back_default = "back_default.png";

        // Act
        const sprite = Sprite.create(front_default, back_default);

        // Assert
        expect(sprite.spriteFrontDefault).toBe(front_default);
    });

    it("Should return the back default sprite", () => {
        // Arrange
        const front_default = "front_default.png";
        const back_default = "back_default.png";

        // Act
        const sprite = Sprite.create(front_default, back_default);

        // Assert
        expect(sprite.spriteBackDefault).toBe(back_default);
    });
});