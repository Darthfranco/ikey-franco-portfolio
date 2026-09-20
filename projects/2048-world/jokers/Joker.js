class Joker {
    constructor(id, name, description, rarity = 'common') {
        this.id = id;
        this.name = name;
        this.description = description;
        this.rarity = rarity;
    }

    /**
     * Called when the run starts with this joker active.
     */
    onRunStart() { }

    /**
     * Called when this Joker is added to the run.
     * @param {Object} context - Shared run data such as the deck.
     */
    onAcquire(context) { }

    /**
     * Called at the beginning of combat.
     * @param {Object} context - Combat data such as deck, fight, and Joker count.
     */
    onCombatStart(context) { }

    /**
     * Called when combat ends.
     */
    onCombatEnd() { }

    /**
     * Called when a new tile is created.
     * @param {Tile} tile - The newly created tile instance.
     */
    onTileCreate(tile) { }

    /**
     * Called before a merge happens to calculate the resulting properties.
     * @param {Object} info - The mutable merge info object { newValue, duplexLevel, isBloom, bloomTimer, resultDuplex, resultWild... }
     * @param {Tile} t1 - The first parent tile.
     * @param {Tile} t2 - The second parent tile.
     */
    onMergeCalculation(info, t1, t2) { }

    /**
     * Called after a merge is resolved.
     * @param {Tile} mergedTile - The resulting tile after merge.
     */
    onMergeResolution(mergedTile, context) { }

    /**
     * Called after a successful move.
     */
    onSuccessfulMove(context) { }

    /**
     * Called when a Bloom tile activates.
     */
    onBloomActivate(context) { }

    /**
     * Called after the player skips a powerup.
     */
    onPowerupSkipped(context) { }

    /**
     * Called immediately before a run-ending loss.
     */
    onPreventDeath(context) { }
}
