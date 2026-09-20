class TheVanguard extends Joker {
    constructor() {
        super(
            'the_vanguard',
            'The Vanguard',
            'The first piece spawned in combat has its value doubled.'
        );
        this.hasTriggered = false;
    }

    onCombatStart() {
        this.hasTriggered = false;
    }

    onTileCreate(tile) {
        if (this.hasTriggered) return;
        this.hasTriggered = true;
        tile.value *= 2;
    }
}
