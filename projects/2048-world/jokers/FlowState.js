class FlowState extends Joker {
    constructor() {
        super(
            'flow_state',
            'Flow State',
            'Creating a tile of 64 or higher grants +5 seconds to the timer.'
        );
    }

    onMergeResolution(mergedTile, context) {
        if (mergedTile.value < 64 || !context.addTime) return false;
        return context.addTime(5) !== false;
    }
}
