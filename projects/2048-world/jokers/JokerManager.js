class JokerManager {
    constructor() {
        this.allJokers = {};
        this.activeJokers = [];
    }

    registerJoker(joker) {
        this.allJokers[joker.id] = joker;
    }

    setActiveJokers(jokerIds) {
        this.activeJokers = jokerIds.map(id => this.allJokers[id]).filter(j => j);
        this.activeJokers.forEach(j => {
            j.isBonusJoker = false;
            j.onRunStart();
        });
    }

    getAllJokers() {
        return Object.values(this.allJokers);
    }

    // Hooks
    onTileCreate(tile) {
        this.activeJokers.forEach(j => j.onTileCreate(tile));
    }

    modifyMergeInfo(info, t1, t2) {
        this.activeJokers.forEach(j => j.onMergeCalculation(info, t1, t2));
    }

    onMergeResolution(mergedTile, context) {
        return this.activeJokers.map(j => ({
            joker: j,
            result: j.onMergeResolution(mergedTile, context)
        }));
    }

    onAcquire(joker, context) {
        if (joker && joker.onAcquire) joker.onAcquire(context);
    }

    onCombatStart(context) {
        this.activeJokers.forEach(j => j.onCombatStart(context));
    }

    onCombatEnd(context = {}) {
        this.activeJokers.forEach(j => j.onCombatEnd(context));
    }

    onSuccessfulMove(context) {
        return this.activeJokers.map(j => ({
            joker: j,
            result: j.onSuccessfulMove(context)
        }));
    }

    onBloomActivate(context) {
        return this.activeJokers.map(j => ({
            joker: j,
            result: j.onBloomActivate(context)
        }));
    }

    onPowerupSkipped(context) {
        return this.activeJokers.map(j => ({
            joker: j,
            result: j.onPowerupSkipped(context)
        }));
    }

    tryPreventDeath(context) {
        for (const joker of this.activeJokers) {
            if (joker.onPreventDeath(context)) return joker;
        }
        return null;
    }

    resetJokerStates() {
        // Reset one-time triggers for jokers
        this.activeJokers.forEach(j => {
            if (j.triggered !== undefined) j.triggered = false;
            if (j.isActive !== undefined) j.isActive = false;
        });
    }
}

const jokerManager = new JokerManager();
