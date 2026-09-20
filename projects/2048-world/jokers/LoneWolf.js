class LoneWolf extends Joker {
    constructor() {
        super(
            'lone_wolf',
            'Lone Wolf',
            'If this is the only Joker you possess, double the value of every tile in your deck.'
        );
        this.isActive = false;
    }

    onCombatStart(context) {
        this.isActive = context.activeJokerCount === 1;
    }

    onCombatEnd() {
        this.isActive = false;
    }

    onTileCreate(tile) {
        if (this.isActive) tile.value *= 2;
    }
}
