class Underdog extends Joker {
    constructor() {
        super(
            'underdog',
            'Underdog',
            'When fighting Uncommon enemies, all 2, 4, and 8 tiles become Duplex.'
        );
        this.isActive = false;
    }

    // Called when combat starts to check if this joker should activate
    onCombatStart(context) {
        this.isActive = (context.fightRarity === 'uncommon');
    }

    onCombatEnd() {
        this.isActive = false;
    }

    onTileCreate(tile) {
        if (this.isActive && [2, 4, 8].includes(tile.value)) {
            tile.isDuplex = true;
        }
    }

    onMergeCalculation(info, t1, t2) {
        if (this.isActive && [2, 4, 8].includes(info.newValue)) {
            info.resultDuplex = true;
        }
    }
}
