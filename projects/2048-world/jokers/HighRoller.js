class HighRoller extends Joker {
    constructor() {
        super(
            'high_roller',
            'High Roller',
            '25% chance that combining two 8s creates a 128 tile.'
        );
    }

    onMergeCalculation(info, t1, t2) {
        if (t1.value === 8 && t2.value === 8 && Math.random() < 0.25) {
            info.newValue = 128;
        }
    }
}
