class SacrificialAltar extends Joker {
    constructor() {
        super(
            'sacrificial_altar',
            'Sacrificial Altar',
            'At the start of combat, remove an ability from a random tile in your deck and double its value.'
        );
    }

    onCombatStart(context) {
        const candidates = context.deck.filter(tile =>
            tile.isDuplex || tile.isWild || tile.isBloom
        );
        if (!candidates.length) return;

        const tile = candidates[Math.floor(Math.random() * candidates.length)];
        const abilities = [];
        if (tile.isDuplex) abilities.push('isDuplex');
        if (tile.isWild) abilities.push('isWild');
        if (tile.isBloom) abilities.push('isBloom');

        const removedAbility = abilities[Math.floor(Math.random() * abilities.length)];
        tile[removedAbility] = false;
        if (removedAbility === 'isBloom') tile.bloomTimer = 0;
        tile.value *= 2;
    }
}
