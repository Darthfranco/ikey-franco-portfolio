class NaturalGrowth extends Joker {
    constructor() {
        super(
            'natural_growth',
            'Natural Growth',
            'All 2s are naturally Bloom tiles.'
        );
    }

    onTileCreate(tile) {
        if (tile.value === 2) {
            tile.isBloom = true;
            tile.bloomTimer = 3;
        }
    }
}
