class Wildfire extends Joker {
    constructor() {
        super(
            'wildfire',
            'Wildfire',
            'Adds a Duplex Wild Bloom 4 to your deck at the start of every combat.'
        );
    }

    onRunStart() {
        // Add the special tile to the deck at combat start
        // This is handled in setupGame instead since onRunStart is only called once
    }
}
