class Optimization extends Joker {
    constructor() {
        super(
            'optimization',
            'Optimization',
            '50% chance to double the value of a random tile in your deck after skipping a powerup.'
        );
    }

    onPowerupSkipped(context) {
        if (!context.deck.length || Math.random() >= 0.5) return false;
        const tile = context.deck[Math.floor(Math.random() * context.deck.length)];
        tile.value *= 2;
        return true;
    }
}
