class CompoundInterest extends Joker {
    constructor() {
        super(
            'compound_interest',
            'Compound Interest',
            'Every 5 moves, double the value of all lowest-value tiles on the board.'
        );
        this.moveCount = 0;
    }

    onCombatStart() {
        this.moveCount = 0;
    }

    onSuccessfulMove() {
        this.moveCount++;
        return this.moveCount % 5 === 0;
    }
}
