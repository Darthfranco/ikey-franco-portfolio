class PopulationBoom extends Joker {
    constructor() {
        super(
            'population_boom',
            'Population Boom',
            'Every other successful move adds 2 new pieces to the board instead of 1.'
        );
        this.successfulMoves = 0;
    }

    onCombatStart() {
        this.successfulMoves = 0;
    }

    getSpawnCountAfterMove() {
        this.successfulMoves++;
        return this.successfulMoves % 2 === 0 ? 2 : 1;
    }
}
