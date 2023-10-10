import {
    WeakAgainstCalculator,
    ResistantAgainstCalculator,
    VulnerableAgainstCalculator,
    StrongAgainstCalculator
} from ".";

export class DamageCalculatorFactory {
    static create() {
        const resistantAgainstCalculator = new ResistantAgainstCalculator();
        const weakAgainstCalculator = new WeakAgainstCalculator(resistantAgainstCalculator);
        const vulnerableAgainstCalculator = new VulnerableAgainstCalculator(weakAgainstCalculator);
        const strongAgainstCalculator = new StrongAgainstCalculator(vulnerableAgainstCalculator);

        return strongAgainstCalculator;
    }
}