export class Ability {
    constructor(private ability: string, private description: string, private damage: number) { }

    get abilityName(): string {
        return this.ability;
    }

    get abilityDescription(): string {
        return this.description;
    }

    get abilityDamage(): number {
        return this.damage;
    }
}