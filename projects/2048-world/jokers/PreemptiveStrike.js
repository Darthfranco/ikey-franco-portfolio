class PreemptiveStrike extends Joker {
    constructor() {
        super(
            'preemptive_strike',
            'Pre-emptive Strike',
            'At the start of combat, temporarily double the value of a random tile in your deck.'
        );
        this.temporaryTile = null;
        this.originalValue = null;
    }

    onCombatStart(context) {
        this.restoreTemporaryUpgrade();
        if (!context.deck.length) return;
        this.temporaryTile = context.deck[Math.floor(Math.random() * context.deck.length)];
        this.originalValue = this.temporaryTile.value;
        this.temporaryTile.value *= 2;
    }

    onCombatEnd() {
        this.restoreTemporaryUpgrade();
    }

    restoreTemporaryUpgrade() {
        if (this.temporaryTile && this.originalValue !== null) {
            this.temporaryTile.value = this.originalValue;
        }
        this.temporaryTile = null;
        this.originalValue = null;
    }
}
