import { Pokemon } from "../entities";
import { Ability } from "../value-objects";

export interface DamageCalculator {
    calculate(attacker: Pokemon, defender: Pokemon, ability: Ability): number;
}