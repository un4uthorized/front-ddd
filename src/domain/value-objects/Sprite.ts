export class Sprite {
    constructor(
        private readonly front_default: string,
        private readonly back_default: string,
    ) { }

    static create(front_default: string, back_default: string): Sprite {
        return new Sprite(front_default, back_default);
    }

    get spriteFrontDefault() {
        return this.front_default;
    }

    get spriteBackDefault() {
        return this.back_default;
    }
}