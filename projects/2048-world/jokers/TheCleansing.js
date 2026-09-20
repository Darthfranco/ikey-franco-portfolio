class TheCleansing extends Joker {
    constructor() {
        super(
            'the_cleansing',
            'The Cleansing',
            'When you reach half of the goal value, instantly destroy all 2s and 4s on the board.'
        );
        this.triggeredThisCombat = false;
    }

    onCombatStart() {
        this.triggeredThisCombat = false;
    }

    shouldTrigger(grid, goal) {
        if (this.triggeredThisCombat) return false;
        const reachedHalf = grid.flat().some(tile => tile && tile.value >= goal / 2);
        if (reachedHalf) this.triggeredThisCombat = true;
        return reachedHalf;
    }
}
