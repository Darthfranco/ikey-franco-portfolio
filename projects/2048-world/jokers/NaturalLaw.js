class NaturalLaw extends Joker {
    constructor() {
        super(
            'natural_law',
            'Natural Law',
            'All 2s are naturally Duplex tiles.'
        );
    }

    // Called on tile spawn
    onTileCreate(tile) {
        if (tile.value === 2) {
            tile.isDuplex = true;
        }
    }
}
