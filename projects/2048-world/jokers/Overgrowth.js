class Overgrowth extends Joker {
    constructor() {
        super(
            'overgrowth',
            'Overgrowth',
            '25% chance for Bloom tiles to quadruple their value instead of doubling.'
        );
    }

    getBloomMultiplier() {
        return Math.random() < 0.25 ? 4 : 2;
    }
}
