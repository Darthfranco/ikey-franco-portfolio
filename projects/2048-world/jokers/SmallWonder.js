class SmallWonder extends Joker {
    constructor() {
        super(
            'small_wonder',
            'Small Wonder',
            'Upon acquisition, double the value of all natural 2s, 4s, and 8s in your deck.'
        );
    }

    onAcquire(context) {
        context.deck.forEach(tile => {
            const isNatural = !tile.isDuplex && !tile.isWild && !tile.isBloom;
            if (isNatural && [2, 4, 8].includes(tile.value)) {
                tile.value *= 2;
            }
        });
    }
}
