class PhaseShift extends Joker {
    constructor() {
        super(
            'phase_shift',
            'Phase Shift',
            'You may ignore path requirements on the map (still must go forward).'
        );
    }

    // This joker's effect is checked in getAvailableNodes()
    // When active, all nodes on the next floor are available, not just connected ones
}
