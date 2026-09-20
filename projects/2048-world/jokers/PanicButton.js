class PanicButton extends Joker {
    constructor() {
        super(
            'panic_button',
            'Panic Button',
            'Once per game, if the board is full, delete the three lowest tiles and spawn a Duplex 64.'
        );
        this.triggered = false;
    }

    onRunStart() {
        this.triggered = false;
    }

    // Called from game logic when board is full before game over check
    onBoardFull(grid, addTileCallback, removeTilesCallback) {
        if (this.triggered) return false;

        this.triggered = true;

        // Find all tiles and sort by value
        const allTiles = [];
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (grid[r][c]) {
                    allTiles.push({ tile: grid[r][c], r, c });
                }
            }
        }

        if (allTiles.length < 3) return false;

        allTiles.sort((a, b) => a.tile.value - b.tile.value);

        // Get the 3 lowest tiles
        const tilesToRemove = allTiles.slice(0, 3);

        // Remove them
        removeTilesCallback(tilesToRemove);

        // Spawn Duplex 64 in one of the freed spots
        const spawnSpot = tilesToRemove[0];
        addTileCallback(spawnSpot.r, spawnSpot.c, { value: 64, isDuplex: true, isWild: false, isBloom: false, bloomTimer: 0 });

        return true; // Prevented game over
    }
}
