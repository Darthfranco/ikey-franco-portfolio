class Photosynthesis extends Joker {
    constructor() {
        super(
            'photosynthesis',
            'Photosynthesis',
            'Combining two Bloom tiles creates a Duplex tile.'
        );
    }

    onMergeCalculation(info, t1, t2) {
        if (t1.isBloom && t2.isBloom) {
            info.resultDuplex = true;
        }
    }
}
