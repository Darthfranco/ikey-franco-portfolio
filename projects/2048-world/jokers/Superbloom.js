class Superbloom extends Joker {
    constructor() {
        super(
            'superbloom',
            'Superbloom',
            'After 5 Bloom tiles activate, double the value of every tile on the board.'
        );
        this.bloomActivations = 0;
    }

    onRunStart() {
        this.bloomActivations = 0;
    }

    onBloomActivate() {
        this.bloomActivations++;
        if (this.bloomActivations < 5) return false;
        this.bloomActivations = 0;
        return true;
    }
}
