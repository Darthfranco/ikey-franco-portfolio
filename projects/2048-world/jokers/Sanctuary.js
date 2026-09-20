class Sanctuary extends Joker {
    constructor() {
        super(
            'sanctuary',
            'Sanctuary',
            'Mystery Rooms are guaranteed to be free of enemy encounters.'
        );
    }

    // This joker's effect is checked in rollMysteryEvent()
    // When active, fight events are replaced with other event types
}
