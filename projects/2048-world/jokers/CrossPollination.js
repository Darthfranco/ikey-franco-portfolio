class CrossPollination extends Joker {
    constructor() {
        super(
            'cross_pollination',
            'Cross-Pollination',
            'Combining two Wild tiles creates a Duplex tile.'
        );
    }

    onMergeCalculation(info, t1, t2) {
        if (t1.isWild && t2.isWild) {
            info.resultDuplex = true;
        }
    }
}
