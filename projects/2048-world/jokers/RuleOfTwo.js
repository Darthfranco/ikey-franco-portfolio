class RuleOfTwo extends Joker {
    constructor() {
        super(
            'rule_of_two',
            'Rule of Two',
            'While your deck has exactly two tiles, both are treated as Duplex.'
        );
        this.deck = null;
    }

    onCombatStart(context) {
        this.deck = context.deck;
    }

    onCombatEnd() {
        this.deck = null;
    }

    onTileCreate(tile) {
        if (this.deck?.length === 2) tile.isDuplex = true;
    }
}
