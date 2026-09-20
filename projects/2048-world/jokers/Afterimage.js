class Afterimage extends Joker {
    constructor() {
        super(
            'afterimage',
            'Afterimage',
            'Once per game, when a tile with an effect is created via merge, add a copy at half value to your deck.'
        );
        this.triggered = false;
    }

    onRunStart() {
        this.triggered = false;
    }

    // Called after a merge creates a tile with effects (duplex, wild, or bloom)
    onMergeResolution(mergedTile, context) {
        if (this.triggered) return;

        // Check if the merged tile has any special effect
        const hasEffect = mergedTile.isDuplex || mergedTile.isWild || mergedTile.isBloom;

        if (hasEffect) {
            this.triggered = true;

            // Calculate half value (minimum 2)
            const halfValue = Math.max(2, Math.floor(mergedTile.value / 2));

            // Add copy to deck
            context.deck.push({
                value: halfValue,
                isDuplex: mergedTile.isDuplex,
                isWild: mergedTile.isWild,
                isBloom: mergedTile.isBloom,
                bloomTimer: mergedTile.isBloom ? 3 : 0
            });

            return true; // Indicate that afterimage was triggered
        }

        return false;
    }
}
