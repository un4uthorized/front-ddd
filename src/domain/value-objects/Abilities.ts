import { Ability } from ".";

export class Abilities {
    constructor(private readonly value: Ability[]) { }

    get abilities(): Ability[] {
        return this.value;
    }

    static create(value: Ability[]): Abilities {
        if (value.length > 4) throw new Error('A pokemon can only have 4 abilities');

        return new Abilities(value);
    }

    static createEmpty(): Abilities {
        return new Abilities([]);
    }

    get firstAbility(): Ability {
        return this.value[0];
    }

    get secondAbility(): Ability {
        return this.value[1];
    }

    get thirdAbility(): Ability {
        return this.value[2];
    }

    get fourthAbility(): Ability {
        return this.value[3];
    }
}