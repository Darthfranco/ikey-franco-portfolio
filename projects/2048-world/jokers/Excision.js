class Excision extends Joker {
    constructor() {
        super(
            'excision',
            'Excision',
            'Upon acquisition, all 2s are deleted from your deck and will no longer appear in shops. Cannot be destroyed.'
        );
        this.protectedFromDestruction = true;
    }

    onAcquire(context) {
        for (let i = context.deck.length - 1; i >= 0; i--) {
            if (context.deck[i].value === 2) context.deck.splice(i, 1);
        }
    }
}
