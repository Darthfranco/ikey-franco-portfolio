class Eternity extends Joker {
    constructor() {
        super(
            'eternity',
            'Eternity',
            'Prevents death once per run, then becomes dormant. Cannot be destroyed.'
        );
        this.protectedFromDestruction = true;
        this.dormant = false;
    }

    onRunStart() {
        this.dormant = false;
    }

    onPreventDeath() {
        if (this.dormant) return false;
        this.dormant = true;
        return true;
    }
}
