class BinarySynthesis extends Joker {
    constructor() {
        super(
            'binary_synthesis',
            'Binary Synthesis',
            'Combining two Duplex tiles results in a Bloom tile.'
        );
    }

    onMergeCalculation(info, t1, t2) {
        if (t1.isDuplex && t2.isDuplex) {
            info.isBloom = true;
            info.bloomTimer = 3;
        }
    }
}
