
document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth <= 768;
    const SCREENS = {
        start: document.getElementById('start-screen'),
        world: document.getElementById('world-screen'),
        game: document.getElementById('game-screen'),
        result: document.getElementById('result-screen'),
        shop: document.getElementById('shop-screen'),
        story: document.getElementById('story-screen'),
        world_select: document.getElementById('world-select-screen'),
        tutorial: document.getElementById('tutorial-screen'),
        mystery: document.getElementById('mystery-screen'),
        mystery_event: document.getElementById('mystery-event-screen'),
        joker_reward: document.getElementById('joker-reward-screen'),
        joker_select: document.getElementById('joker-select-screen')
    };

    // Initialize Jokers
    jokerManager.registerJoker(new NaturalLaw());
    jokerManager.registerJoker(new NaturalGrowth());
    jokerManager.registerJoker(new RuleOfTwo());
    jokerManager.registerJoker(new BinarySynthesis());
    jokerManager.registerJoker(new Photosynthesis());
    jokerManager.registerJoker(new CrossPollination());
    jokerManager.registerJoker(new Wildfire());
    jokerManager.registerJoker(new PanicButton());
    jokerManager.registerJoker(new Afterimage());
    jokerManager.registerJoker(new PhaseShift());
    jokerManager.registerJoker(new Sanctuary());
    jokerManager.registerJoker(new Underdog());
    jokerManager.registerJoker(new Superbloom());
    jokerManager.registerJoker(new Overgrowth());
    jokerManager.registerJoker(new SmallWonder());
    jokerManager.registerJoker(new TheCleansing());
    jokerManager.registerJoker(new HighRoller());
    jokerManager.registerJoker(new CompoundInterest());
    jokerManager.registerJoker(new SacrificialAltar());
    jokerManager.registerJoker(new PreemptiveStrike());
    jokerManager.registerJoker(new TheVanguard());
    jokerManager.registerJoker(new Optimization());
    jokerManager.registerJoker(new Excision());
    jokerManager.registerJoker(new Eternity());
    jokerManager.registerJoker(new LoneWolf());
    jokerManager.registerJoker(new FlowState());
    jokerManager.registerJoker(new PopulationBoom());

    // Map floor configuration per world (0=Classic, 1=World2, 2=World3)
    const MAP_FLOOR_CONFIG = {
        0: { goalPool: [128, 128, 256], timeRange: [60, 80], bossGoal: 512, bossTime: 105 },
        1: { goalPool: [256, 256, 512], timeRange: [65, 85], bossGoal: 1024, bossTime: 110 },
        2: { goalPool: [512, 512, 1024], timeRange: [70, 90], bossGoal: 2048, bossTime: 120 }
    };

    const SHOP_POOL = [
        { id: 'add_8', type: 'tile', tileData: { value: 8, isDuplex: false, isWild: false, isBloom: false, bloomTimer: 0 }, rarity: 'common', name: 'Add an 8 Tile', desc: 'Adds an "8" tile to your deck.' },
        { id: 'duplex_2', type: 'tile', tileData: { value: 2, isDuplex: true, isWild: false, isBloom: false, bloomTimer: 0 }, rarity: 'common', name: 'Duplex 2 Tile', desc: 'Doubles its merge value.' },
        { id: 'duplex_4', type: 'tile', tileData: { value: 4, isDuplex: true, isWild: false, isBloom: false, bloomTimer: 0 }, rarity: 'common', name: 'Duplex 4 Tile', desc: 'Doubles its merge value.' },
        { id: 'duplex_4_extra', type: 'tile', tileData: { value: 4, isDuplex: true, isWild: false, isBloom: false, bloomTimer: 0 }, rarity: 'common', name: 'Duplex 4 Tile', desc: 'Doubles its merge value.' },
        { id: 'upgrade_tile_1', type: 'action', rarity: 'common', name: 'Tile Upgrade', desc: 'Double the value of one tile in your deck.', meta: 1 },
        { id: 'wild_16', type: 'tile', tileData: { value: 16, isDuplex: false, isWild: true, isBloom: false, bloomTimer: 0 }, rarity: 'common', name: 'Wild 16', desc: 'Merges with 16s or lower.' },
        { id: 'duplex_8', type: 'tile', tileData: { value: 8, isDuplex: true, isWild: false, isBloom: false, bloomTimer: 0 }, rarity: 'common', name: 'Duplex 8 Tile', desc: 'Doubles its merge value.' },
        { id: 'bloom_4', type: 'tile', tileData: { value: 4, isDuplex: false, isWild: false, isBloom: true, bloomTimer: 3 }, rarity: 'common', name: 'Bloom 4', desc: 'Doubles its value after 3 turns.' },
        { id: 'bloom_8', type: 'tile', tileData: { value: 8, isDuplex: false, isWild: false, isBloom: true, bloomTimer: 3 }, rarity: 'common', name: 'Bloom 8', desc: 'Doubles its value after 3 turns.' },
        { id: 'add_16', type: 'tile', tileData: { value: 16, isDuplex: false, isWild: false, isBloom: false, bloomTimer: 0 }, rarity: 'uncommon', name: 'Add a 16 Tile', desc: 'Adds a "16" tile to your deck.' },
        { id: 'delete_tile', type: 'action', rarity: 'uncommon', name: 'Delete a Tile', desc: 'Permanently remove a tile from your deck.' },
        { id: 'add_10_time', type: 'upgrade', rarity: 'uncommon', name: '+10 Seconds', desc: 'Permanently add 10s to the timer.' },
        { id: 'wild_32', type: 'tile', tileData: { value: 32, isDuplex: false, isWild: true, isBloom: false, bloomTimer: 0 }, rarity: 'uncommon', name: 'Wild 32', desc: 'Merges with 32s or lower.' },
        { id: 'bloom_16', type: 'tile', tileData: { value: 16, isDuplex: false, isWild: false, isBloom: true, bloomTimer: 3 }, rarity: 'uncommon', name: 'Bloom 16', desc: 'Doubles its value after 3 turns.' },
        { id: 'wild_tile_upgrade', type: 'action', rarity: 'uncommon', name: 'Wild Tile Upgrade', desc: 'Add the wild property to one tile in your deck.', actionType: 'wild_upgrade' },
        { id: 'duplex_tile_upgrade', type: 'action', rarity: 'uncommon', name: 'Duplex Tile Upgrade', desc: 'Add the duplex property to one tile in your deck.', actionType: 'duplex_upgrade' },
        { id: 'upgrade_tile_2', type: 'action', rarity: 'rare', name: 'Double Upgrade', desc: 'Double the value of two tiles in your deck.', meta: 2 },
        { id: 'duplex_16', type: 'tile', tileData: { value: 16, isDuplex: true, isWild: false, isBloom: false, bloomTimer: 0 }, rarity: 'rare', name: 'Duplex 16 Tile', desc: 'Doubles its merge value.' },
        { id: 'bloom_32', type: 'tile', tileData: { value: 32, isDuplex: false, isWild: false, isBloom: true, bloomTimer: 3 }, rarity: 'rare', name: 'Bloom 32', desc: 'Doubles its value after 3 turns.' },
        { id: 'super_duplex_upgrade', type: 'action', rarity: 'rare', name: 'Super Duplex Upgrade', desc: 'Add duplex and double the value of one tile.', actionType: 'super_duplex' },
        { id: 'crazy_8s', type: 'action', rarity: 'epic', name: 'Crazy Eights', desc: 'Add three regular 8 tiles to your deck.' },
        { id: 'wild_64', type: 'tile', tileData: { value: 64, isDuplex: false, isWild: true, isBloom: false, bloomTimer: 0 }, rarity: 'epic', name: 'Wild 64', desc: 'Merges with 64s or lower.' },
    ];
    const RARITY_WEIGHTS = { common: 10, uncommon: 7, rare: 3, epic: 1 };

    // Powerup odds based on fight rarity
    const POWERUP_WEIGHTS = {
        common: { common: 10, uncommon: 5, rare: 2, epic: 0 },
        uncommon: { common: 6, uncommon: 8, rare: 4, epic: 1 },
        rare: { common: 3, uncommon: 6, rare: 8, epic: 3 },
        epic: { common: 0, uncommon: 3, rare: 8, epic: 6 }  // Boss fights
    };

    const WORLD_POWERS = {
        aqua: {
            id: 'still_waters',
            name: 'Still Waters',
            description: 'A new piece is added only every other successful move.'
        },
        inferno: {
            id: 'chain_reaction',
            name: 'Chain Reaction',
            description: 'After choosing a powerup, there is a 25% chance to choose another.'
        },
        woodlands: {
            id: 'patient_growth',
            name: 'Patient Growth',
            description: 'Skipping a powerup permanently adds +5 seconds to the timer.'
        },
        midnight: {
            id: 'forbidden_stock',
            name: 'Forbidden Stock',
            description: 'Powerup offerings are much more likely to contain high-rarity items.'
        },
        sakura: {
            id: 'renewal',
            name: 'Renewal',
            description: 'Refresh the offered powerups once after each fight.'
        }
    };

    const WORLDS = {
        classic: { name: "Classic World", desc: "The original temporal anomaly begins.", palette: { uiText: "#776e65", pageBackground: "#faf8ef", gridBackground: "#bbada0", cellBackground: "#cdc1b4", textDark: "#776e65", textLight: "#f9f6f2", tileColors: { 2: { bg: "#eee4da", text: "#776e65" }, 4: { bg: "#ede0c8", text: "#776e65" }, 8: { bg: "#f2b179", text: "#f9f6f2" }, 16: { bg: "#f59563", text: "#f9f6f2" }, 32: { bg: "#f67c5f", text: "#f9f6f2" }, 64: { bg: "#f65e3b", text: "#f9f6f2" }, 128: { bg: "#edcf72", text: "#f9f6f2" }, 256: { bg: "#edcc61", text: "#f9f6f2" }, 512: { bg: "#edc850", text: "#f9f6f2" }, 1024: { bg: "#edc53f", text: "#f9f6f2" }, 2048: { bg: "#edc22e", text: "#f9f6f2" } } }, previewColors: { bg: '#bbada0', text: '#f9f6f2', border: '#776e65' } },
        aqua: { name: "Aqua World", desc: "Depths hide powerful time crystals.", palette: { uiText: "#E0E1DD", pageBackground: "#273d57", gridBackground: "#1c2f42", cellBackground: "#536f8d", textDark: "#1B263B", textLight: "#E0E1DD", tileColors: { 2: { bg: "#E0E1DD", text: "#1B263B" }, 4: { bg: "#BDE0FE", text: "#1B263B" }, 8: { bg: "#A2D2FF", text: "#1B263B" }, 16: { bg: "#778DA9", text: "#E0E1DD" }, 32: { bg: "#415A77", text: "#E0E1DD" }, 64: { bg: "#0D1B2A", text: "#E0E1DD" }, 128: { bg: "#1E6091", text: "#E0E1DD" }, 256: { bg: "#184E77", text: "#E0E1DD" }, 512: { bg: "#163C5F", text: "#E0E1DD" }, 1024: { bg: "#12304C", text: "#E0E1DD" }, 2048: { bg: "#C9B037", text: "#1B263B" } } }, previewColors: { bg: '#A2D2FF', text: '#1B263B', border: '#1E6091' } },
        inferno: { name: "Inferno World", desc: "A world burning with fury.", palette: { uiText: "#FFF5E1", pageBackground: "#6d3b3a", gridBackground: "#4a2623", cellBackground: "#804c4c", textDark: "#5C1F20", textLight: "#FFF5E1", tileColors: { 2: { bg: "#D7C49E", text: "#5C1F20" }, 4: { bg: "#E8A87C", text: "#5C1F20" }, 8: { bg: "#E27D60", text: "#FFF5E1" }, 16: { bg: "#C3423F", text: "#FFF5E1" }, 32: { bg: "#B9342A", text: "#FFF5E1" }, 64: { bg: "#8F2A21", text: "#FFF5E1" }, 128: { bg: "#7C241C", text: "#FFF5E1" }, 256: { bg: "#6A1E16", text: "#FFF5E1" }, 512: { bg: "#581811", text: "#FFF5E1" }, 1024: { bg: "#4A1512", text: "#FFF5E1" }, 2048: { bg: "#FFC107", text: "#5C1F20" } } }, previewColors: { bg: '#E27D60', text: '#FFF5E1', border: '#8F2A21' } },
        woodlands: { name: "Woodlands World", desc: "Ancient energies stir in forests.", palette: { uiText: "#EFEBE2", pageBackground: "#2f453d", gridBackground: "#21382c", cellBackground: "#455e52", textDark: "#1D2A25", textLight: "#EFEBE2", tileColors: { 2: { bg: "#CAD4C8", text: "#1D2A25" }, 4: { bg: "#A38E7E", text: "#1D2A25" }, 8: { bg: "#7A997A", text: "#EFEBE2" }, 16: { bg: "#527853", text: "#EFEBE2" }, 32: { bg: "#6F5B4C", text: "#EFEBE2" }, 64: { bg: "#34593E", text: "#EFEBE2" }, 128: { bg: "#27442F", text: "#EFEBE2" }, 256: { bg: "#1A2D22", text: "#EFEBE2" }, 512: { bg: "#14221A", text: "#EFEBE2" }, 1024: { bg: "#0F1A14", text: "#EFEBE2" }, 2048: { bg: "#D6E0E3", text: "#1D2A25" } } }, previewColors: { bg: '#7A997A', text: '#EFEBE2', border: '#27442F' } },
        midnight: { name: "Midnight World", desc: "Shadows twist and distort time.", palette: { uiText: "#F5F5F5", pageBackground: "#34343c", gridBackground: "#2f1a20", cellBackground: "#4d4d54", textDark: "#222228", textLight: "#F5F5F5", tileColors: { 2: { bg: "#C5C9D1", text: "#222228" }, 4: { bg: "#9FA3AC", text: "#222228" }, 8: { bg: "#4A2E33", text: "#F5F5F5" }, 16: { bg: "#6E1B24", text: "#F5F5F5" }, 32: { bg: "#9A1725", text: "#F5F5F5" }, 64: { bg: "#8C001A", text: "#F5F5F5" }, 128: { bg: "#6D0013", text: "#F5F5F5" }, 256: { bg: "#54000D", text: "#F5F5F5" }, 512: { bg: "#3F0008", text: "#F5F5F5" }, 1024: { bg: "#2B0004", text: "#F5F5F5" }, 2048: { bg: "#7B0018", text: "#F5F5F5" } } }, previewColors: { bg: '#6E1B24', text: '#F5F5F5', border: '#9A1725' } },
        sakura: { name: "Sakura Garden", desc: "Serenity shattered by echoes.", palette: { uiText: "#FDFBF5", pageBackground: "#495057", gridBackground: "#6e4956", cellBackground: "#6c757d", textDark: "#343A40", textLight: "#FDFBF5", tileColors: { 2: { bg: "#CED4DA", text: "#343A40" }, 4: { bg: "#BDB1A2", text: "#343A40" }, 8: { bg: "#937B69", text: "#343A40" }, 16: { bg: "#7A918D", text: "#FDFBF5" }, 32: { bg: "#6A8D73", text: "#FDFBF5" }, 64: { bg: "#E7C6D2", text: "#343A40" }, 128: { bg: "#D9AAB8", text: "#343A40" }, 256: { bg: "#C98DA0", text: "#FDFBF5" }, 512: { bg: "#B8708A", text: "#FDFBF5" }, 1024: { bg: "#8F4F64", text: "#FDFBF5" }, 2048: { bg: "#FFFFFF", text: "#343A40" } } }, previewColors: { bg: '#E7C6D2', text: '#343A40', border: '#8F4F64' } }
    };

    let currentFightIndex = 0, gameState = null, timerInterval = null, timeLeft = 0, deck = [], timeBonus = 0, runWorldOrder = [], availableWorlds = [], worldChoicePair = [], musicStarted = false, storyAbortController = false;
    let worldSuccessfulMoves = 0, shopRefreshUsed = false;
    let maxJokerSlots = 2, nirvanaActive = false;
    let conqueredWorldPowerIds = new Set();
    let hasAnnounced20Percent = false, hasAnnouncedHalfTime = false, currentTheme = {}, currentMusicTrack = null;
    let isMusicEnabled = true, isSfxEnabled = true;
    let isDevMode = false;

    // Map state
    let worldMap = [];           // Generated nodes for current world
    let currentNodeId = null;    // Currently selected node ID
    let selectedNodeId = null;   // For mobile 2-tap selection
    let completedNodes = [];     // IDs of completed nodes
    let currentFight = null;     // { goal, time, isBoss, completesWorld } - current fight data
    let currentWorldIndex = 0;   // Which world we're in (0, 1, 2)
    let tutorialStep = 0, tutorialGrid = [], tutorialDeck = [], isTutorialMoving = false, tutorialTimerInterval = null, tutorialSpawnIndex = 0;
    const TUTORIAL_STEPS = [
        { goal: 16, deck: [{ value: 2 }, { value: 2 }, { value: 4 }, { value: 4 }], instruction: "Swipe to move tiles. Same numbers combine!", showTimer: false, showGoal: true, showDeck: false },
        { goal: 32, deck: [{ value: 2 }, { value: 4 }, { value: 8 }], instruction: "Reach the goal before the timer runs out!", showTimer: true, showGoal: true, showDeck: false, timerDuration: 60 },
        { goal: 64, deck: [{ value: 2 }, { value: 4 }, { value: 8 }, { value: 16 }], instruction: "Newly spawned tiles are chosen randomly from your deck!", showTimer: false, showGoal: false, showDeck: true },
        { goal: 16, deck: [{ value: 4 }, { value: 4, isDuplex: true }], instruction: "Duplex tiles DOUBLE the merge result! (two of them together quadruple it!)", showTimer: false, showGoal: false, showDeck: true, fixedSpawns: [{ value: 4 }, { value: 4, isDuplex: true }], noAddTiles: true },
        { goal: 32, deck: [{ value: 8 }, { value: 16, isWild: true }], instruction: "Wild tiles merge with ANY tile less then or equal to their value!", showTimer: false, showGoal: false, showDeck: true, fixedSpawns: [{ value: 8 }, { value: 16, isWild: true }], noAddTiles: false },
        { goal: 32, deck: [{ value: 4, isBloom: true, bloomTimer: 3 }, { value: 4 }], instruction: "Bloom tiles auto-DOUBLE after 3 turns. Combine them before they double for great value!", showTimer: false, showGoal: false, showDeck: true, fixedSpawns: [{ value: 4, isBloom: true, bloomTimer: 3 }, { value: 4 }], noAddTiles: false, spawnSequence: [{ value: 8 }, { value: 16 }] }
    ];

    const mapButton = document.getElementById('map-button');
    const ingameSettingsButton = document.getElementById('ingame-settings-button');

    const AUDIO = { menu: document.getElementById('audio-menu'), small: document.getElementById('audio-small'), big: document.getElementById('audio-big'), boss: document.getElementById('audio-boss') };
    Object.values(AUDIO).forEach(aud => aud.volume = 0.3);
    const SFX = {
        swipe: [document.getElementById('sfx-swipe_1'), document.getElementById('sfx-swipe_2'), document.getElementById('sfx-swipe_3')],
        combine: [document.getElementById('sfx-combine_1'), document.getElementById('sfx-combine_2'), document.getElementById('sfx-combine_3'), document.getElementById('sfx-combine_4'), document.getElementById('sfx-combine_5'), document.getElementById('sfx-combine_6')],
        duplex: [document.getElementById('sfx-duplex_combine_1'), document.getElementById('sfx-duplex_combine_2')],
        wild: [document.getElementById('sfx-wild_combine_1'), document.getElementById('sfx-wild_combine_2')],
        click: [document.getElementById('sfx-shop_click_1'), document.getElementById('sfx-shop_click_2'), document.getElementById('sfx-shop_click_3')],
        bigAnnounce: [document.getElementById('sfx-big_announcement_1'), document.getElementById('sfx-big_announcement_2'), document.getElementById('sfx-big_announcement_3')],
        smallAnnounce: [document.getElementById('sfx-small_announcement_bip_1'), document.getElementById('sfx-small_announcement_bip_2'), document.getElementById('sfx-small_announcement_bip_3')]
    };
    Object.values(SFX).flat().forEach(sfx => sfx.volume = 0.5);

    function playSoundEffect(sfxArray) {
        if (!isSfxEnabled || !musicStarted || !sfxArray || sfxArray.length === 0) return;
        const sound = sfxArray[Math.floor(Math.random() * sfxArray.length)];
        sound.currentTime = 0;
        sound.play().catch(e => { });
    }

    function playMusic(trackKey) {
        if (!isMusicEnabled || !musicStarted || currentMusicTrack === trackKey) return;
        Object.values(AUDIO).forEach(aud => aud.pause());
        currentMusicTrack = trackKey;
        if (AUDIO[trackKey]) { AUDIO[trackKey].currentTime = 0; AUDIO[trackKey].play().catch(e => { }); }
    }

    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function applyWorldTheme(worldKey) {
        const theme = WORLDS[worldKey].palette; currentTheme = theme; const root = document.documentElement;
        root.style.setProperty('--page-background', theme.pageBackground);
        root.style.setProperty('--page-background-translucent', hexToRgba(theme.pageBackground, 0.85));
        root.style.setProperty('--grid-background', theme.gridBackground);
        root.style.setProperty('--cell-background', theme.cellBackground);
        root.style.setProperty('--button-background', theme.gridBackground);
        root.style.setProperty('--ui-text-color', theme.uiText);
        root.style.setProperty('--text-dark', theme.textDark);
        root.style.setProperty('--text-light', theme.textLight);
        for (const [value, colors] of Object.entries(theme.tileColors)) {
            root.style.setProperty(`--tile-color-${value}`, colors.bg);
            root.style.setProperty(`--tile-text-${value}`, colors.text);
        }
    }

    function getCurrentWorldKey() {
        return runWorldOrder[currentWorldIndex] || 'classic';
    }

    function getCurrentWorldPower() {
        return WORLD_POWERS[getCurrentWorldKey()] || null;
    }

    function hasWorldPower(powerId) {
        return getCurrentWorldPower()?.id === powerId ||
            conqueredWorldPowerIds.has(powerId);
    }

    function getOccupiedJokerSlots() {
        return jokerManager.activeJokers.filter(joker => !joker.isBonusJoker).length;
    }

    function getCombatGoal() {
        return currentFight.goal * (nirvanaActive ? 4 : 1);
    }

    function formatWorldPower(power) {
        return power ? `${power.name}: ${power.description}` : '';
    }

    function formatActiveWorldPowers() {
        const nativePower = getCurrentWorldPower();
        const conqueredPowers = Object.values(WORLD_POWERS).filter(power =>
            conqueredWorldPowerIds.has(power.id) && power.id !== nativePower?.id
        );
        const descriptions = [];
        if (nativePower) descriptions.push(formatWorldPower(nativePower));
        if (conqueredPowers.length) {
            descriptions.push(`Conquered: ${conqueredPowers.map(power => power.name).join(', ')}`);
        }
        return descriptions.join(' • ');
    }

    function generateRunWorlds() {
        runWorldOrder = ['classic'];
        const allOtherWorlds = Object.keys(WORLDS).filter(k => k !== 'classic');
        for (let i = allOtherWorlds.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[allOtherWorlds[i], allOtherWorlds[j]] = [allOtherWorlds[j], allOtherWorlds[i]]; }
        availableWorlds = allOtherWorlds;
    }

    // --- NODE MAP GENERATION ---
    function generateNodeMap(worldIndex) {
        const config = MAP_FLOOR_CONFIG[Math.min(worldIndex, 2)];
        const floors = {};

        // Floor 1: Single start node - FORCE COMMON
        // Use the smallest goal from pool to ensure common rarity
        const startNodeConfig = { ...config, goalPool: [Math.min(...config.goalPool)] };
        // We ensure floor 1 is always a fight (never mystery) by passing forceFight=true
        floors[1] = [createMapNode(1, 0, startNodeConfig, true)];

        // Floors 2-3: Regular branching nodes
        for (let f = 2; f <= 3; f++) {
            const count = 3 + Math.floor(Math.random() * 2); // 3 or 4
            floors[f] = [];
            for (let i = 0; i < count; i++) {
                floors[f].push(createMapNode(f, i, config));
            }
        }

        // Floor 4: Guaranteed Joker chest row
        const jokerChestCount = 3 + Math.floor(Math.random() * 2);
        floors[4] = [];
        for (let i = 0; i < jokerChestCount; i++) {
            floors[4].push(createJokerNode(4, i));
        }

        // Floors 5-7: Normal randomized rooms after the Joker chest row
        for (let f = 5; f <= 7; f++) {
            const count = 3 + Math.floor(Math.random() * 2);
            floors[f] = [];
            for (let i = 0; i < count; i++) {
                floors[f].push(createMapNode(f, i, config));
            }
        }

        // Floor 8: Single boss node
        floors[8] = [createBossNode(config)];

        // Connect floors with branching paths
        connectMapFloors(floors);

        // Flatten to array
        const allNodes = [];
        for (let f = 1; f <= 8; f++) {
            floors[f].forEach(node => allNodes.push(node));
        }
        return allNodes;
    }

    function createMapNode(floor, index, config, forceFight = false) {
        const commonGoal = Math.min(...config.goalPool);
        const uncommonGoal = Math.max(...config.goalPool);
        const time = config.timeRange[0] + Math.floor(Math.random() * (config.timeRange[1] - config.timeRange[0] + 1));

        let type = 'fight';
        let goal = commonGoal;

        // Normal map spaces: 30% mystery, 25% uncommon fight, 45% common fight.
        if (!forceFight && floor >= 2 && floor <= 7) {
            const roomRoll = Math.random();

            if (roomRoll < 0.30) {
                type = 'mystery';
            } else if (roomRoll < 0.55) {
                goal = uncommonGoal;
            }
        }

        return {
            id: `${floor}-${index}`,
            type: type, // fight, mystery, boss
            floor,
            index,
            goal,
            time,
            isBoss: false,
            exits: [],    // IDs of connected nodes on next floor
            entries: []   // IDs of nodes that connect to this one
        };
    }

    function createJokerNode(floor, index) {
        return {
            id: `${floor}-${index}`,
            type: 'joker',
            floor,
            index,
            isBoss: false,
            exits: [],
            entries: []
        };
    }

    function createBossNode(config) {
        return {
            id: '8-0',
            floor: 8,
            index: 0,
            goal: config.bossGoal,
            time: config.bossTime,
            isBoss: true,
            exits: [],
            entries: []
        };
    }

    function connectMapFloors(floors) {
        // Connect every pre-boss floor to the next row
        for (let f = 1; f <= 7; f++) {
            const currentFloor = floors[f];
            const nextFloor = floors[f + 1];

            const connections = [];

            const addConnection = (sourceIndex, targetIndex) => {
                if (connections.some(edge =>
                    edge.sourceIndex === sourceIndex &&
                    edge.targetIndex === targetIndex
                )) return;

                const source = currentFloor[sourceIndex];
                const target = nextFloor[targetIndex];
                source.exits.push(target.id);
                target.entries.push(source.id);
                connections.push({ sourceIndex, targetIndex });
            };

            // A lone start node connects to the whole first row so no generated
            // node begins unreachable. All normal map nodes are limited to 1-2 exits.
            if (currentFloor.length === 1) {
                nextFloor.forEach((_, targetIndex) => addConnection(0, targetIndex));
                continue;
            }

            // Every final-row node leads into the single boss.
            if (nextFloor.length === 1) {
                currentFloor.forEach((_, sourceIndex) => addConnection(sourceIndex, 0));
                continue;
            }

            // Give every target one ordered entry. Proportional source selection
            // spreads routes across the row without allowing their order to invert.
            nextFloor.forEach((_, targetIndex) => {
                const sourceIndex = Math.round(
                    targetIndex * (currentFloor.length - 1) / (nextFloor.length - 1)
                );
                addConnection(sourceIndex, targetIndex);
            });

            // If the current row is wider, make sure every source still has a route.
            currentFloor.forEach((node, sourceIndex) => {
                if (node.exits.length === 0) {
                    const targetIndex = Math.round(
                        sourceIndex * (nextFloor.length - 1) / (currentFloor.length - 1)
                    );
                    addConnection(sourceIndex, targetIndex);
                }
            });

            const wouldCross = (sourceIndex, targetIndex) => connections.some(edge =>
                (sourceIndex < edge.sourceIndex && targetIndex > edge.targetIndex) ||
                (sourceIndex > edge.sourceIndex && targetIndex < edge.targetIndex)
            );

            // Add a random number of optional nearby branches. This creates a mix
            // of one-way nodes and choice nodes while keeping every source at two
            // exits maximum and preserving the no-crossing ordering.
            const desiredChoiceNodes =
                1 + Math.floor(Math.random() * (currentFloor.length - 1));
            const candidates = [];

            currentFloor.forEach((_, sourceIndex) => {
                const centerTarget = Math.round(
                    sourceIndex * (nextFloor.length - 1) / (currentFloor.length - 1)
                );

                for (let offset = -1; offset <= 1; offset++) {
                    const targetIndex = centerTarget + offset;
                    if (targetIndex >= 0 && targetIndex < nextFloor.length) {
                        candidates.push({ sourceIndex, targetIndex });
                    }
                }
            });

            for (let i = candidates.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
            }

            for (const candidate of candidates) {
                const choiceCount = currentFloor.filter(node => node.exits.length === 2).length;
                if (choiceCount >= desiredChoiceNodes) break;

                const source = currentFloor[candidate.sourceIndex];
                if (
                    source.exits.length < 2 &&
                    !wouldCross(candidate.sourceIndex, candidate.targetIndex)
                ) {
                    addConnection(candidate.sourceIndex, candidate.targetIndex);
                }
            }
        }
    }

    function getAvailableNodes() {
        if (completedNodes.length === 0) {
            // Only the start node is available
            return worldMap.filter(n => n.floor === 1);
        }
        // Only show exits from the LAST completed node (strict path restriction)
        const lastCompletedId = completedNodes[completedNodes.length - 1];
        const lastNode = worldMap.find(n => n.id === lastCompletedId);
        if (!lastNode) return [];

        // Phase Shift: Allow any node on the next floor
        const phaseShiftJoker = jokerManager.activeJokers.find(j => j.id === 'phase_shift');
        if (phaseShiftJoker) {
            const nextFloor = lastNode.floor + 1;
            return worldMap.filter(n => n.floor === nextFloor && !completedNodes.includes(n.id));
        }

        // Return only the exits from the last completed node that aren't completed
        return worldMap.filter(n =>
            lastNode.exits.includes(n.id) && !completedNodes.includes(n.id)
        );
    }

    function toggleInGameUI(show) {
        const display = show ? 'block' : 'none';
        mapButton.style.display = display;
        ingameSettingsButton.style.display = display;
    }

    function switchState(newState, reason = null) {
        gameState = newState;
        Object.values(SCREENS).forEach(s => s.classList.remove('active'));
        toggleInGameUI(['world', 'game', 'shop', 'world_select'].includes(newState));

        switch (newState) {
            case 'start': generateRunWorlds(); applyWorldTheme('classic'); SCREENS.start.classList.add('active'); currentWorldIndex = 0; worldMap = []; completedNodes = []; currentFight = null; currentNodeId = null; timeBonus = 0; maxJokerSlots = 2; nirvanaActive = false; conqueredWorldPowerIds = new Set(); deck = [{ value: 2, isDuplex: false, isWild: false }, { value: 2, isDuplex: false, isWild: false }, { value: 2, isDuplex: false, isWild: false }, { value: 4, isDuplex: false, isWild: false }]; currentMusicTrack = null; isDevMode = false; document.body.dataset.runMode = 'setup'; jokerManager.resetJokerStates(); jokerManager.setActiveJokers([]); playMusic('menu'); break;
            case 'world': deck.sort((a, b) => a.value - b.value || a.isDuplex - b.isDuplex || a.isWild - b.isWild); SCREENS.world.classList.add('active'); updateWorldScreen(); updateDeckDisplay(); playMusic('menu'); break;
            case 'game': SCREENS.game.classList.add('active'); updateDeckDisplay(); setupGame(); startCountdown(); currentMusicTrack = null; if (currentFight && currentFight.isBoss) playMusic('boss'); else playMusic('small'); break;
            case 'shop':
                const shopWorldKey = runWorldOrder[currentWorldIndex];
                applyWorldTheme(shopWorldKey);
                SCREENS.shop.classList.add('active');
                shopRefreshUsed = false;
                setupShop();
                updateDeckDisplay();
                playMusic('menu');
                break;
            case 'world_select': SCREENS.world_select.classList.add('active'); setupWorldSelectScreen(); playMusic('menu'); break;
            case 'story_intro': playStorySequence(true); break;
            case 'story_outro': playStorySequence(false); break;
            case 'fight_won':
                clearInterval(timerInterval);
                currentMusicTrack = null;
                playMusic('menu');
                jokerManager.onCombatEnd();
                const defeatedNode = worldMap.find(node => node.id === currentNodeId);
                const defeatedWorldBoss =
                    currentFight?.completesWorld === true &&
                    defeatedNode?.isBoss === true;
                // Mark current node as completed
                if (currentNodeId && !completedNodes.includes(currentNodeId)) {
                    completedNodes.push(currentNodeId);
                }
                // Check if boss was defeated (end of world)
                if (defeatedWorldBoss) {
                    currentWorldIndex++;
                    worldMap = [];
                    completedNodes = [];
                    if (currentWorldIndex >= 3) {
                        switchState('gauntlet_won');
                    } else {
                        switchState('world_select');
                    }
                } else {
                    // Regular fight won - go to shop, then back to map
                    showResult('Fight Won!', 'Choose Powerup', () => switchState('shop'));
                }
                break;
            case 'fight_lost': clearInterval(timerInterval); currentMusicTrack = null; playMusic('menu'); jokerManager.onCombatEnd(); const details = reason === 'time' ? 'You ran out of time!' : 'You ran out of moves!'; showResult('Run Failed!', 'Try Again', () => switchState('start'), details); break;
            case 'gauntlet_won': switchState('story_outro'); break;
            case 'tutorial': applyWorldTheme('classic'); SCREENS.tutorial.classList.add('active'); tutorialStep = 0; setupTutorialStep(); playMusic('menu'); break;
            case 'mystery': SCREENS.mystery.classList.add('active'); playMusic('menu'); break;
            case 'mystery_event': SCREENS.mystery_event.classList.add('active'); playMusic('menu'); break;
            case 'joker_reward': SCREENS.joker_reward.classList.add('active'); playMusic('menu'); break;
            case 'joker_selection': SCREENS.joker_select.classList.add('active'); setupJokerSelection(); playMusic('menu'); break;
        }
    }
    function showResult(message, buttonText, action, details = '') { SCREENS.result.classList.add('active'); document.getElementById('result-message').textContent = message; document.getElementById('result-details').textContent = details; const btn = document.getElementById('result-button'); btn.textContent = buttonText; btn.onclick = action; }

    function completeCurrentNode() {
        if (currentNodeId && !completedNodes.includes(currentNodeId)) {
            completedNodes.push(currentNodeId);
        }
    }

    function updateWorldScreen() {
        // Get current world info
        const worldKey = runWorldOrder[currentWorldIndex];
        applyWorldTheme(worldKey);
        document.getElementById('world-title').textContent = WORLDS[worldKey].name;
        const worldPowerDescription = document.getElementById('world-power-description');
        const worldPower = getCurrentWorldPower();
        worldPowerDescription.textContent = formatActiveWorldPowers();
        worldPowerDescription.style.display =
            worldPowerDescription.textContent ? 'block' : 'none';

        // Generate map if needed (new world)
        if (worldMap.length === 0 || completedNodes.length === 0) {
            worldMap = generateNodeMap(currentWorldIndex);
            completedNodes = [];
        }

        renderNodeMap();
    }

    function renderNodeMap() {
        const container = document.getElementById('node-map-container');
        const tooltip = document.getElementById('node-tooltip');
        container.innerHTML = '';

        // Global click listener to clear selection if clicking background (for mobile)
        if (!container.dataset.hasClickListener) {
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.map-node')) {
                    selectedNodeId = null;
                    tooltip.classList.remove('visible');
                }
            });
            container.dataset.hasClickListener = 'true';
        }

        const availableNodes = getAvailableNodes();
        const availableIds = availableNodes.map(n => n.id);

        const config = MAP_FLOOR_CONFIG[Math.min(currentWorldIndex, 2)];
        const avgGoal = config.goalPool.reduce((a, b) => a + b, 0) / config.goalPool.length;

        const floors = {};
        worldMap.forEach(node => {
            if (!floors[node.floor]) floors[node.floor] = [];
            floors[node.floor].push(node);
        });

        const nodeElements = {};
        for (let f = 1; f <= 8; f++) {
            const floorDiv = document.createElement('div');
            floorDiv.className = 'map-floor';
            floorDiv.dataset.floor = f;

            const floorNodes = floors[f] || [];
            floorNodes.forEach((node, idx) => {
                const nodeEl = document.createElement('div');
                nodeEl.className = 'map-node';
                nodeEl.dataset.id = node.id;

                const staggerOffset = (idx % 2 === 0) ? -8 : 8;
                nodeEl.style.marginTop = staggerOffset + 'px';

                const rarity = getNodeRarity(node.goal, avgGoal, node.isBoss);
                nodeEl.classList.add(`rarity-${rarity}`);

                if (completedNodes.includes(node.id)) {
                    nodeEl.classList.add('completed');
                } else if (availableIds.includes(node.id)) {
                    nodeEl.classList.add('available');
                } else {
                    nodeEl.classList.add('locked');
                }

                if (node.isBoss) {
                    nodeEl.classList.add('boss');
                }

                const icon = document.createElement('div');
                icon.className = 'node-icon';
                if (node.isBoss) {
                    icon.classList.add('icon-boss');
                } else if (node.type === 'mystery') {
                    icon.classList.add('icon-mystery');
                    nodeEl.classList.add('mystery');
                } else if (node.type === 'joker') {
                    icon.classList.add('icon-chest');
                    nodeEl.classList.add('joker-node');
                } else {
                    icon.classList.add('icon-enemy');
                }
                nodeEl.appendChild(icon);

                // Helper to show tooltip
                const showTooltip = () => {
                    let title = 'Fight';
                    let goalText = node.goal;
                    let timeText = node.time;
                    let isMystery = false;

                    if (node.isBoss) title = 'BOSS FIGHT';
                    else if (node.type === 'mystery') {
                        title = 'Mystery Space';
                        goalText = '????';
                        timeText = '????';
                        isMystery = true;
                    } else if (node.type === 'joker') {
                        title = 'Joker Chest';
                        goalText = 'Choose 1 of 2 Jokers';
                        timeText = '';
                        isMystery = true;
                    }

                    tooltip.querySelector('.tooltip-title').textContent = title;

                    // Toggle visibility of goal/time for mystery
                    const goalP = tooltip.querySelector('.tooltip-goal');
                    const timeP = tooltip.querySelector('.tooltip-time');
                    const rewardP = tooltip.querySelector('.tooltip-reward');

                    if (isMystery) {
                        goalP.innerHTML = `<span>${goalText}</span>`;
                        goalP.style.textAlign = 'center';
                        timeP.style.display = 'none';
                        goalP.style.display = 'block';
                        rewardP.style.display = 'none';
                    } else {
                        goalP.innerHTML = `Goal: <span>${goalText}</span>`;
                        goalP.style.textAlign = 'left';
                        timeP.style.display = 'block';
                        timeP.querySelector('span').textContent = timeText;
                        goalP.style.display = 'block';
                        rewardP.style.display = 'block';

                        const rewardSpan = rewardP.querySelector('span');
                        rewardSpan.textContent = 'Powerup';
                        rewardSpan.className = `reward-${rarity}`;
                    }

                    const rect = nodeEl.getBoundingClientRect();
                    tooltip.style.left = (rect.right + 10) + 'px';
                    tooltip.style.top = (rect.top - 10) + 'px';
                    tooltip.classList.add('visible');
                };

                nodeEl.addEventListener('mouseenter', () => {
                    if (window.innerWidth > 768) showTooltip();
                });

                nodeEl.addEventListener('mouseleave', () => {
                    if (window.innerWidth > 768) tooltip.classList.remove('visible');
                });

                if (availableIds.includes(node.id)) {
                    nodeEl.addEventListener('click', (e) => {
                        e.stopPropagation(); // Prevent global clear

                        // Mobile 2-tap Logic
                        if (window.innerWidth <= 768) {
                            if (selectedNodeId !== node.id) {
                                selectedNodeId = node.id;
                                showTooltip();
                                return; // First tap just shows tooltip
                            }
                        }

                        // Activate
                        playSoundEffect(SFX.click);
                        currentNodeId = node.id;
                        selectedNodeId = null; // Reset selection
                        tooltip.classList.remove('visible');

                        if (node.type === 'mystery') {
                            handleMysteryInteraction(node);
                        } else if (node.type === 'joker') {
                            showJokerReward(() => {
                                completeCurrentNode();
                                switchState('world');
                            });
                        } else {
                            currentFight = {
                                rarity,
                                goal: node.goal,
                                time: node.time,
                                isBoss: node.isBoss,
                                completesWorld: node.isBoss
                            };
                            switchState('game');
                        }
                    });
                }

                nodeElements[node.id] = nodeEl;
                floorDiv.appendChild(nodeEl);
            });

            container.appendChild(floorDiv);
        }

        setTimeout(() => drawMapConnections(nodeElements), 50);
    }

    function getNodeRarity(goal, avgGoal, isBoss) {
        if (isBoss) return 'epic';
        const ratio = goal / avgGoal;
        if (ratio >= 2) return 'rare';
        if (ratio > 1) return 'uncommon';
        return 'common';
    }


    function drawMapConnections(nodeElements) {
        const container = document.getElementById('node-map-container');

        // Remove old SVG if exists
        const oldSvg = container.querySelector('svg.map-connections');
        if (oldSvg) oldSvg.remove();

        // Create SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('map-connections');
        svg.style.width = container.scrollWidth + 'px';
        svg.style.height = container.scrollHeight + 'px';

        const containerRect = container.getBoundingClientRect();

        worldMap.forEach(node => {
            const fromEl = nodeElements[node.id];
            if (!fromEl) return;

            node.exits.forEach(exitId => {
                const toEl = nodeElements[exitId];
                if (!toEl) return;

                const fromRect = fromEl.getBoundingClientRect();
                const toRect = toEl.getBoundingClientRect();

                const x1 = fromRect.left + fromRect.width / 2 - containerRect.left + container.scrollLeft;
                const y1 = fromRect.top + fromRect.height / 2 - containerRect.top + container.scrollTop;
                const x2 = toRect.left + toRect.width / 2 - containerRect.left + container.scrollLeft;
                const y2 = toRect.top + toRect.height / 2 - containerRect.top + container.scrollTop;

                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', x1);
                line.setAttribute('y1', y1);
                line.setAttribute('x2', x2);
                line.setAttribute('y2', y2);

                // Highlight path if both nodes completed or one is available
                if (completedNodes.includes(node.id)) {
                    line.classList.add('active-path');
                }

                svg.appendChild(line);
            });
        });

        container.insertBefore(svg, container.firstChild);
    }

    function createTilePreview(tileData, innerClass, wrapperClass = 'deck-tile-preview') {
        const loneWolfActive =
            jokerManager.activeJokers.length === 1 &&
            jokerManager.activeJokers[0].id === 'lone_wolf';
        const displayValue = loneWolfActive ? tileData.value * 2 : tileData.value;

        // Apply deck-wide Joker effects in previews.
        let effectiveDuplex = tileData.isDuplex;
        if (
            jokerManager.activeJokers.some(j => j.id === 'natural_law') &&
            tileData.value === 2
        ) {
            effectiveDuplex = true;
        }
        if (
            deck.length === 2 &&
            jokerManager.activeJokers.some(j => j.id === 'rule_of_two')
        ) {
            effectiveDuplex = true;
        }
        const wrapper = document.createElement('div'); wrapper.className = wrapperClass; const inner = document.createElement('div'); inner.className = innerClass; inner.dataset.value = displayValue; const span = document.createElement('span'); span.textContent = displayValue; inner.appendChild(span);
        if (effectiveDuplex) inner.classList.add('duplex');
        if (tileData.isWild) {
            inner.classList.add('wild'); const cycleValues = []; for (let v = 2; v <= displayValue; v *= 2) cycleValues.push(v);
            const intervalId = setInterval(() => { span.textContent = cycleValues[Math.floor(Math.random() * cycleValues.length)]; }, 100);
            inner.dataset.cycleIntervalId = intervalId;
        }
        const effectiveBloom = tileData.isBloom ||
            (
                tileData.value === 2 &&
                jokerManager.activeJokers.some(j => j.id === 'natural_growth')
            );
        const effectiveBloomTimer = effectiveBloom
            ? (tileData.bloomTimer || 3)
            : 0;

        if (effectiveBloom) {
            inner.classList.add('bloom');
            if (effectiveBloomTimer > 0) {
                const timerEl = document.createElement('div'); timerEl.className = 'bloom-timer'; timerEl.textContent = effectiveBloomTimer; inner.appendChild(timerEl);
            }
        }
        wrapper.appendChild(inner);

        // Tooltip logic
        const isMobile = window.innerWidth <= 768;

        wrapper.addEventListener('mouseenter', () => {
            if (!isMobile) showDeckTooltip(tileData, wrapper);
        });

        wrapper.addEventListener('mouseleave', () => {
            if (!isMobile) hideDeckTooltip();
        });

        wrapper.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                // On mobile, show tooltip on tap.
                // Note: We don't stopPropagation here by default so other click handlers (like in shop/modals) still fire.
                // If they are modal actions, they might switch state, which is fine (tooltip will disappear).
                // If we want "pure" tooltip without action, we'd need to know context.
                showDeckTooltip(tileData, wrapper);

                // Auto hide after 2 seconds on mobile if it was just a quick check? No, let user tap elsewhere.
                // Add global click listener to hide? implemented in showDeckTooltip
            }
        });

        return wrapper;
    }

    function showDeckTooltip(tileData, element) {
        const tooltip = document.getElementById('deck-tooltip');
        if (!tooltip) return;

        const loneWolfActive =
            jokerManager.activeJokers.length === 1 &&
            jokerManager.activeJokers[0].id === 'lone_wolf';
        const displayValue = loneWolfActive ? tileData.value * 2 : tileData.value;
        tooltip.querySelector('.tooltip-title').textContent = `${displayValue} Tile`;

        const powerupsContainer = tooltip.querySelector('.tooltip-powerups');
        powerupsContainer.innerHTML = '';

        let desc = 'Standard tile.';
        const features = [];

        // Apply deck-wide Joker effects for the tooltip.
        let effectiveDuplex = tileData.isDuplex;
        if (
            jokerManager.activeJokers.some(j => j.id === 'natural_law') &&
            tileData.value === 2
        ) {
            effectiveDuplex = true;
        }
        if (
            deck.length === 2 &&
            jokerManager.activeJokers.some(j => j.id === 'rule_of_two')
        ) {
            effectiveDuplex = true;
        }
        if (effectiveDuplex) {
            features.push('Duplex');
            const tag = document.createElement('span'); tag.className = 'tooltip-powerup-tag duplex'; tag.textContent = 'Duplex'; powerupsContainer.appendChild(tag);
        }
        if (tileData.isWild) {
            features.push('Wild');
            const tag = document.createElement('span'); tag.className = 'tooltip-powerup-tag wild'; tag.textContent = 'Wild'; powerupsContainer.appendChild(tag);
        }
        const effectiveBloom = tileData.isBloom ||
            (
                tileData.value === 2 &&
                jokerManager.activeJokers.some(j => j.id === 'natural_growth')
            );

        if (effectiveBloom) {
            features.push('Bloom');
            const tag = document.createElement('span'); tag.className = 'tooltip-powerup-tag bloom'; tag.textContent = 'Bloom'; powerupsContainer.appendChild(tag);
        }


        if (features.length > 0) {
            desc = '';
            if (effectiveDuplex) desc += 'Doubles merge value. ';
            if (tileData.isWild) desc += 'Merges with lower/equal values. ';
            if (effectiveBloom) desc += `Doubles after ${tileData.bloomTimer || 3} turns. `;
        }

        tooltip.querySelector('.tooltip-desc').textContent = desc;

        // Show (but hide visually) to measure dimensions
        tooltip.style.visibility = 'hidden';
        tooltip.classList.add('visible');

        const rect = element.getBoundingClientRect();
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;

        // Position: "Up and Right" relative to the tile
        // Start at the top-right corner of the tile
        let left = rect.right + 5;
        let top = rect.top - tooltipHeight + 15; // Align bottom of tooltip near top of tile

        // Edge detection
        const padding = 10;
        const viewportWidth = window.innerWidth;

        // RIGHT: Flip to left side if it goes off screen
        if (left + tooltipWidth > viewportWidth - padding) {
            left = rect.left - tooltipWidth - 5;
        }

        // TOP: Move below if it goes off screen top
        if (top < padding) {
            top = rect.bottom + 5;
        }

        // LEFT: Safety clamp
        if (left < padding) left = padding;

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        tooltip.style.visibility = ''; // Reveal

        // For mobile, add close listener
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                const closeHandler = (e) => {
                    if (!tooltip.contains(e.target) && !element.contains(e.target)) {
                        hideDeckTooltip();
                        document.removeEventListener('click', closeHandler);
                    }
                };
                document.addEventListener('click', closeHandler);
            }, 0);
        }
    }

    function hideDeckTooltip() {
        const tooltip = document.getElementById('deck-tooltip');
        if (tooltip) tooltip.classList.remove('visible');
    }
    function updateDeckDisplay() {
        const displays = { world: document.getElementById('world-deck-display'), game: document.getElementById('game-deck-display'), shop: document.getElementById('shop-deck-display') };
        Object.values(displays).forEach(container => { if (container) container.querySelectorAll('[data-cycle-interval-id]').forEach(el => clearInterval(el.dataset.cycleIntervalId)); });
        ['world', 'shop'].forEach(key => { const t = document.querySelector(`#${key}-deck-container .deck-toggle`); if (t) t.firstChild.textContent = `DECK (${deck.length})`; });
        const gameTitle = document.querySelector('#game-deck-container .deck-title'); if (gameTitle) gameTitle.textContent = `DECK (${deck.length})`;
        Object.values(displays).forEach(container => { if (!container) return; container.innerHTML = ''; deck.forEach(tileData => container.appendChild(createTilePreview(tileData, 'deck-tile-preview-inner'))); });

        // Update joker displays
        updateJokerDisplays();
    }

    function updateJokerDisplays() {
        const jokerDisplays = {
            world: document.getElementById('world-joker-display'),
            game: document.getElementById('game-joker-display'),
            shop: document.getElementById('shop-joker-display')
        };

        Object.values(jokerDisplays).forEach(container => {
            if (!container) return;
            container.innerHTML = '';

            jokerManager.activeJokers.forEach(joker => {
                const jokerEl = document.createElement('div');
                jokerEl.className = 'joker-preview';
                if (joker.dormant) jokerEl.classList.add('dormant');
                if (joker.isBonusJoker) jokerEl.classList.add('bonus-joker');
                jokerEl.textContent = joker.isBonusJoker ? 'B' : 'J';
                jokerEl.title = joker.isBonusJoker
                    ? `${joker.name} (Bonus Joker — no slot used)`
                    : joker.name;
                jokerEl.dataset.jokerId = joker.id;

                // Click to open tooltip (stays open until clicking outside)
                jokerEl.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showJokerTooltip(joker, jokerEl);
                });

                container.appendChild(jokerEl);
            });
        });
    }

    let currentJokerTooltip = null; // Track which joker tooltip is open

    function showJokerTooltip(joker, element) {
        const tooltip = document.getElementById('joker-tooltip');
        if (!tooltip) return;

        // If clicking the same joker, close it
        if (currentJokerTooltip === joker.id && tooltip.classList.contains('visible')) {
            hideJokerTooltip();
            return;
        }

        currentJokerTooltip = joker.id;
        tooltip.querySelector('.tooltip-title').textContent = joker.name;
        let jokerDescription =
            joker.dormant ? `${joker.description} (Dormant)` : joker.description;
        if (joker.isBonusJoker) {
            jokerDescription += ' Bonus Joker: does not consume a slot.';
        }
        tooltip.querySelector('.tooltip-desc').textContent = jokerDescription;

        // Setup delete button
        const deleteBtn = document.getElementById('joker-delete-btn');
        if (deleteBtn) {
            // Protected Jokers cannot be destroyed or replaced.
            const canDelete = gameState !== 'game' && !joker.protectedFromDestruction;
            deleteBtn.disabled = !canDelete;
            deleteBtn.textContent = joker.protectedFromDestruction
                ? 'Cannot Be Destroyed'
                : (canDelete ? 'Destroy Joker' : 'In Combat');

            // Remove old listener and add new one
            deleteBtn.onclick = null;
            if (canDelete) {
                deleteBtn.onclick = (e) => {
                    e.stopPropagation();
                    deleteJoker(joker.id);
                    hideJokerTooltip();
                };
            }
        }

        tooltip.style.visibility = 'hidden';
        tooltip.classList.add('visible');

        const rect = element.getBoundingClientRect();
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;

        let left = rect.right + 10;
        let top = rect.top;

        // Edge detection
        if (left + tooltipWidth > window.innerWidth - 10) {
            left = rect.left - tooltipWidth - 10;
        }
        if (top + tooltipHeight > window.innerHeight - 10) {
            top = window.innerHeight - tooltipHeight - 10;
        }
        if (left < 10) left = 10;
        if (top < 10) top = 10;

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        tooltip.style.visibility = '';

        // Close when clicking outside (but not on tooltip itself)
        setTimeout(() => {
            const closeHandler = (e) => {
                if (!tooltip.contains(e.target) && !element.contains(e.target)) {
                    hideJokerTooltip();
                    document.removeEventListener('click', closeHandler);
                }
            };
            document.addEventListener('click', closeHandler);
        }, 0);
    }

    function hideJokerTooltip() {
        const tooltip = document.getElementById('joker-tooltip');
        if (tooltip) tooltip.classList.remove('visible');
        currentJokerTooltip = null;
    }

    function deleteJoker(jokerId) {
        const joker = jokerManager.activeJokers.find(j => j.id === jokerId);
        if (!joker || joker.protectedFromDestruction) return false;
        playSoundEffect(SFX.click);
        jokerManager.activeJokers = jokerManager.activeJokers.filter(j => j.id !== jokerId);
        updateJokerDisplays();
        updateDeckDisplay(); // Refresh deck in case joker affected tile visuals
        return true;
    }
    function getRandomShopItems(count, fightRarity = 'common') {
        // Use fight rarity to determine powerup odds
        const baseWeights = POWERUP_WEIGHTS[fightRarity] || POWERUP_WEIGHTS.common;
        const weights = { ...baseWeights };
        const worldPower = getCurrentWorldPower();

        if (hasWorldPower('forbidden_stock')) {
            weights.common = Math.max(1, Math.round(weights.common * 0.35));
            weights.uncommon = Math.max(5, Math.round(weights.uncommon * 1.5));
            weights.rare = Math.max(7, Math.round(weights.rare * 2.5));
            weights.epic = Math.max(4, Math.round(weights.epic * 4));
        }

        const hasExcision = jokerManager.activeJokers.some(j => j.id === 'excision');
        const availableItems = hasExcision
            ? SHOP_POOL.filter(item => item.type !== 'tile' || item.tileData.value !== 2)
            : SHOP_POOL;
        const weightedPool = availableItems.flatMap(item => Array(weights[item.rarity] || 0).fill(item));
        const results = [];
        const pickedIds = new Set();
        while (results.length < count && weightedPool.length > 0) {
            const randomIndex = Math.floor(Math.random() * weightedPool.length);
            const selectedItem = weightedPool[randomIndex];
            if (!pickedIds.has(selectedItem.id)) {
                results.push(selectedItem);
                pickedIds.add(selectedItem.id);
            }
        }
        return results;
    }

    function finishPowerupSelection() {
        const worldPower = getCurrentWorldPower();
        if (hasWorldPower('chain_reaction') && Math.random() < 0.25) {
            const description = document.getElementById('shop-world-power-description');
            description.textContent = 'Chain Reaction! Choose one additional powerup.';
            renderShopOptions();
            return;
        }
        switchState('world');
    }

    function renderShopOptions() {
        const container = document.getElementById('shop-options-container'); container.querySelectorAll('[data-cycle-interval-id]').forEach(el => clearInterval(el.dataset.cycleIntervalId)); container.innerHTML = '';
        const fightRarity = currentFight?.rarity || 'common';
        getRandomShopItems(3, fightRarity).forEach(item => {
            const card = document.createElement('div'); card.className = 'shop-option-card'; card.dataset.rarity = item.rarity;
            let previewHTML;
            if (item.type === 'tile') { previewHTML = createTilePreview(item.tileData, 'shop-tile-preview-inner', 'shop-tile-preview').outerHTML; }
            else {
                let iconClass = '', iconText = '';
                if (item.id.includes('upgrade_tile')) { iconClass = 'upgrade-icon'; iconText = '↑'; }
                else if (item.id === 'delete_tile') { iconClass = 'delete-icon'; iconText = 'D'; }
                else if (item.id === 'add_10_time') { iconClass = 'time-icon'; iconText = '+10s'; }
                else if (item.id === 'wild_tile_upgrade') { iconClass = 'upgrade-icon'; iconText = 'W'; }
                else if (item.id === 'duplex_tile_upgrade') { iconClass = 'upgrade-icon'; iconText = 'Dx'; }
                else if (item.id === 'super_duplex_upgrade') { iconClass = 'upgrade-icon'; iconText = 'S↑'; }
                else { iconClass = 'time-icon'; iconText = '8x3'; }
                previewHTML = `<div class="shop-item-icon ${iconClass}"><span>${iconText}</span></div>`;
            }
            card.innerHTML = `${previewHTML}<h3>${item.name}</h3><p>${item.desc}</p>`;
            card.addEventListener('click', () => {
                playSoundEffect(SFX.click);
                if (item.type === 'tile') { deck.push({ ...item.tileData }); }
                else if (item.id === 'add_10_time') { timeBonus += 10; }
                else if (item.id === 'crazy_8s') { for (let i = 0; i < 3; i++) deck.push({ value: 8, isDuplex: false, isWild: false, isBloom: false, bloomTimer: 0 }); }
                else if (item.id === 'delete_tile') { showDeleteTileModal(finishPowerupSelection); return; }
                else if (item.id.includes('upgrade_tile')) { showUpgradeTileModal(item.meta, finishPowerupSelection); return; }
                else if (item.id === 'wild_tile_upgrade') { showPropertyUpgradeModal('wild', finishPowerupSelection); return; }
                else if (item.id === 'duplex_tile_upgrade') { showPropertyUpgradeModal('duplex', finishPowerupSelection); return; }
                else if (item.id === 'super_duplex_upgrade') { showPropertyUpgradeModal('super_duplex', finishPowerupSelection); return; }
                finishPowerupSelection();
            }, { once: true });
            container.appendChild(card);
        });
    }

    function setupShop() {
        const worldPower = getCurrentWorldPower();
        const powerDescription = document.getElementById('shop-world-power-description');
        powerDescription.textContent = formatActiveWorldPowers();
        powerDescription.style.display =
            powerDescription.textContent ? 'block' : 'none';

        const refreshButton = document.getElementById('refresh-shop-button');
        const canRefresh = hasWorldPower('renewal') && !shopRefreshUsed;
        refreshButton.style.display = canRefresh ? 'inline-block' : 'none';
        refreshButton.onclick = () => {
            if (shopRefreshUsed) return;
            playSoundEffect(SFX.click);
            shopRefreshUsed = true;
            refreshButton.style.display = 'none';
            renderShopOptions();
        };

        renderShopOptions();

        // Skip shop button handler
        document.getElementById('skip-shop-button').onclick = () => {
            playSoundEffect(SFX.click);
            if (hasWorldPower('patient_growth')) {
                timeBonus += 5;
                makeMiniAnnouncement('Patient Growth: +5s', '#27ae60');
            }
            const results = jokerManager.onPowerupSkipped({ deck });
            if (results.some(entry => entry.joker.id === 'optimization' && entry.result)) {
                makeMiniAnnouncement('Optimization!', '#3498db');
            }
            switchState('world');
        };
    }

    function setupWorldSelectScreen() {
        const container = document.getElementById('world-options-container');
        container.innerHTML = '';
        worldChoicePair = availableWorlds.slice(0, 2);

        worldChoicePair.forEach(worldKey => {
            const world = WORLDS[worldKey];
            const card = document.createElement('div');
            card.className = 'world-option-card';
            card.style.backgroundColor = world.previewColors.bg;
            card.style.color = world.previewColors.text;
            card.style.borderColor = world.previewColors.border;

            const worldPower = WORLD_POWERS[worldKey];
            const powerMarkup = worldPower
                ? `<div class="world-power-card">
                    <span>WORLD POWER</span>
                    <strong>${worldPower.name}</strong>
                    <p>${worldPower.description}</p>
                </div>`
                : '';
            card.innerHTML = `<h3>${world.name}</h3><p class="world-option-description">${world.desc}</p>${powerMarkup}`;
            card.addEventListener('click', () => {
                playSoundEffect(SFX.click);
                runWorldOrder.push(worldKey);
                availableWorlds = availableWorlds.filter(key => !worldChoicePair.includes(key));
                switchState('shop');
            }, { once: true });
            container.appendChild(card);
        });
    }

    function showDeleteTileModal(onComplete = () => switchState('world')) { const modal = document.getElementById('delete-tile-modal'), display = document.getElementById('delete-deck-display'); display.innerHTML = ''; deck.forEach((tileData, index) => { const tileEl = createTilePreview(tileData, 'deck-tile-preview-inner'); tileEl.addEventListener('click', () => { playSoundEffect(SFX.click); deck.splice(index, 1); modal.classList.remove('active'); onComplete(); }, { once: true }); display.appendChild(tileEl); }); modal.classList.add('active'); }
    function showUpgradeTileModal(picksRemaining, onComplete = () => switchState('world')) {
        const modal = document.getElementById('upgrade-tile-modal'), display = document.getElementById('upgrade-deck-display');
        const title = document.getElementById('upgrade-modal-title'), desc = document.getElementById('upgrade-modal-desc');
        display.innerHTML = ''; title.textContent = picksRemaining > 1 ? "Upgrade Tiles" : "Upgrade Tile"; desc.textContent = `Select a tile to double its value. (${picksRemaining} pick${picksRemaining > 1 ? 's' : ''} left)`;
        deck.forEach((tileData, index) => {
            const tileEl = createTilePreview(tileData, 'deck-tile-preview-inner');
            tileEl.addEventListener('click', () => { playSoundEffect(SFX.click); deck[index].value *= 2; if (picksRemaining - 1 > 0) { showUpgradeTileModal(picksRemaining - 1, onComplete); } else { modal.classList.remove('active'); onComplete(); } }, { once: true });
            display.appendChild(tileEl);
        });
        modal.classList.add('active');
    }

    function showPropertyUpgradeModal(upgradeType, onComplete = () => switchState('world')) {
        const modal = document.getElementById('upgrade-tile-modal'), display = document.getElementById('upgrade-deck-display');
        const title = document.getElementById('upgrade-modal-title'), desc = document.getElementById('upgrade-modal-desc');
        display.innerHTML = '';
        if (upgradeType === 'wild') {
            title.textContent = "Add Wild Property";
            desc.textContent = "Select a tile to make wild (can merge with tiles of equal or lower value).";
        } else if (upgradeType === 'duplex') {
            title.textContent = "Add Duplex Property";
            desc.textContent = "Select a tile to make duplex (doubles merge value).";
        } else if (upgradeType === 'super_duplex') {
            title.textContent = "Super Duplex Upgrade";
            desc.textContent = "Select a tile to add duplex and double its value.";
        }
        deck.forEach((tileData, index) => {
            const tileEl = createTilePreview(tileData, 'deck-tile-preview-inner');
            tileEl.addEventListener('click', () => {
                playSoundEffect(SFX.click);
                if (upgradeType === 'wild') {
                    deck[index].isWild = true;
                } else if (upgradeType === 'duplex') {
                    deck[index].isDuplex = true;
                } else if (upgradeType === 'super_duplex') {
                    deck[index].isDuplex = true;
                    deck[index].value *= 2;
                }
                modal.classList.remove('active');
                onComplete();
            }, { once: true });
            display.appendChild(tileEl);
        });
        modal.classList.add('active');
    }

    const gridContainer = document.getElementById('grid-container'), announcementContainer = document.getElementById('announcement-container');
    const gridSize = 4, moveDuration = 100;
    let grid = [], isMoving = false;

    function makeAnnouncement(text, color, fontSize) { playSoundEffect(SFX.bigAnnounce); const el = document.createElement('div'); el.className = 'announcement-text'; el.textContent = text; el.style.color = color; el.style.fontSize = fontSize; announcementContainer.appendChild(el); setTimeout(() => el.remove(), 1500); }
    function makeMiniAnnouncement(text, color) { playSoundEffect(SFX.smallAnnounce); const el = document.createElement('div'); el.className = 'mini-announcement-text'; el.textContent = text; el.style.color = color; announcementContainer.appendChild(el); setTimeout(() => el.remove(), 1200); }

    function doubleAllBoardTiles() {
        for (const row of grid) for (const tile of row) {
            if (tile) {
                tile.updateValue(
                    tile.value * 2,
                    tile.isDuplex,
                    tile.isWild,
                    true,
                    tile.isBloom,
                    tile.bloomTimer
                );
            }
        }
    }

    function doubleLowestBoardTiles() {
        const tiles = grid.flat().filter(Boolean);
        if (!tiles.length) return;
        const lowestValue = Math.min(...tiles.map(tile => tile.value));
        tiles.filter(tile => tile.value === lowestValue).forEach(tile => {
            tile.updateValue(
                tile.value * 2,
                tile.isDuplex,
                tile.isWild,
                true,
                tile.isBloom,
                tile.bloomTimer
            );
        });
    }

    function removeBoardTilesByValue(values) {
        let removed = 0;
        for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
            const tile = grid[r][c];
            if (tile && values.includes(tile.value)) {
                tile.remove();
                grid[r][c] = null;
                removed++;
            }
        }
        return removed;
    }

    function saveWithEternity(reason, initialTime = null) {
        const eternity = jokerManager.tryPreventDeath({ reason, grid, deck, fight: currentFight });
        if (!eternity) return false;

        makeAnnouncement('ETERNITY', '#8e44ad', '7rem');
        updateJokerDisplays();

        if (reason === 'time') {
            timeLeft = Math.max(15, Math.ceil((initialTime || currentFight.time) / 2));
            updateTimerDisplay(initialTime || currentFight.time);
        } else {
            const tiles = [];
            for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
                if (grid[r][c]) tiles.push({ tile: grid[r][c], r, c });
            }
            tiles.sort((a, b) => a.tile.value - b.tile.value);
            tiles.slice(0, 4).forEach(({ tile, r, c }) => {
                tile.remove();
                grid[r][c] = null;
            });
        }

        isMoving = false;
        return true;
    }

    class Tile {
        constructor(r, c, tileData, isNew = false) {
            this.row = r; this.col = c; this.value = tileData.value; this.isDuplex = tileData.isDuplex; this.isWild = tileData.isWild;
            this.isBloom = tileData.isBloom || false; this.bloomTimer = tileData.bloomTimer || 0;
            this.element = document.createElement('div'); this.element.classList.add('tile');
            this.innerElement = document.createElement('div'); this.innerElement.classList.add('tile-inner'); this.element.appendChild(this.innerElement);
            this.spanElement = document.createElement('span'); this.innerElement.appendChild(this.spanElement);
            this.timerElement = null; this.cycleIntervalId = null;
            jokerManager.onTileCreate(this);
            this.updateValue(this.value, this.isDuplex, this.isWild, false, this.isBloom, this.bloomTimer);
            this.updatePosition(); gridContainer.appendChild(this.element);
            if (isNew) { this.innerElement.classList.add('new'); this.innerElement.addEventListener('animationend', () => this.innerElement.classList.remove('new'), { once: true }); }
        }
        updateValue(nv, isDup = false, isWild = false, isMerged = false, isBloom = false, bloomTimer = 0) {
            this.value = nv; this.isDuplex = isDup; this.isWild = isWild; this.isBloom = isBloom; this.bloomTimer = bloomTimer;
            this.innerElement.dataset.value = this.value; this.spanElement.textContent = this.value;
            this.innerElement.classList.toggle('duplex', this.isDuplex); this.innerElement.classList.toggle('wild', this.isWild); this.innerElement.classList.toggle('bloom', this.isBloom);
            // Handle bloom timer badge
            if (this.timerElement) { this.timerElement.remove(); this.timerElement = null; }
            if (this.isBloom && this.bloomTimer > 0) {
                this.timerElement = document.createElement('div'); this.timerElement.className = 'bloom-timer'; this.timerElement.textContent = this.bloomTimer; this.innerElement.appendChild(this.timerElement);
            }
            // Handle wild cycling
            if (this.cycleIntervalId) { clearInterval(this.cycleIntervalId); this.cycleIntervalId = null; }
            if (this.isWild) { const cycleValues = []; for (let v = 2; v <= this.value; v *= 2) cycleValues.push(v); this.cycleIntervalId = setInterval(() => { this.spanElement.textContent = cycleValues[Math.floor(Math.random() * cycleValues.length)]; }, 100); }
            if (isMerged) { this.innerElement.classList.add('merged'); this.innerElement.addEventListener('animationend', () => this.innerElement.classList.remove('merged'), { once: true }); }
        }
        updatePosition() { const cs = gridContainer.clientWidth; if (cs === 0) return; const tg = 15; const ts = (cs - 15 * (4 + 1)) / 4; this.element.style.transform = `translate(${this.col * (ts + 15) + 15}px, ${this.row * (ts + 15) + 15}px)`; }
        triggerRipple(level) { if (level < 1) return; this.element.classList.add(`ripple-${level}`); this.element.addEventListener('animationend', () => this.element.classList.remove(`ripple-${level}`), { once: true }); }
        remove() { if (this.cycleIntervalId) clearInterval(this.cycleIntervalId); this.element.remove(); }
    }

    function getMergeInfo(t1, t2) {
        if (!t1 || !t2) return null;

        // Determine combined properties for the merged tile
        // Note: Duplex and Wild do NOT carry over by default. Jokers can override this.
        let resultDuplex = false;
        let resultWild = false;
        let resultBloom = t1.isBloom || t2.isBloom;
        let resultBloomTimer = 0;
        if (resultBloom) {
            if (t1.isBloom && t2.isBloom) resultBloomTimer = Math.min(t1.bloomTimer, t2.bloomTimer);
            else resultBloomTimer = t1.isBloom ? t1.bloomTimer : t2.bloomTimer;
        }

        // Check if merge is possible
        let canMerge = false;
        let baseValue = 0;

        // Wild tiles can merge with any tile of equal or lower value
        if (t1.isWild && t2.value <= t1.value) {
            canMerge = true;
            baseValue = t2.value;
        } else if (t2.isWild && t1.value <= t2.value) {
            canMerge = true;
            baseValue = t1.value;
        } else if (t1.value === t2.value && !t1.isWild && !t2.isWild) {
            // Regular merge: same values
            canMerge = true;
            baseValue = t1.value;
        }

        if (!canMerge) return null;

        // Calculate new value with duplex bonus
        let newValue = baseValue * 2;
        let duplexLevel = (t1.isDuplex ? 1 : 0) + (t2.isDuplex ? 1 : 0);
        if (duplexLevel > 0) {
            newValue *= (2 ** duplexLevel);
        }

        const info = {
            newValue,
            duplexLevel,
            wasWild: t1.isWild || t2.isWild,
            resultDuplex,
            resultWild,
            isBloom: resultBloom,
            bloomTimer: resultBloomTimer
        };

        jokerManager.modifyMergeInfo(info, t1, t2);
        return info;
    }

    function handleMove(dir) {
        if (isMoving || gameState !== 'game') return; isMoving = true;
        const vec = { up: { r: -1, c: 0 }, down: { r: 1, c: 0 }, left: { r: 0, c: -1 }, right: { r: 0, c: 1 } }[dir];
        const trav = getTraversals(vec); let moved = false; const tilesToRemove = [];
        for (const r of grid) for (const c of r) if (c) { c.mergedFrom = null; c.mergeInfo = null; }
        trav.rows.forEach(r => { trav.cols.forEach(c => { const tile = grid[r][c]; if (tile) { const { farthest, next } = findFarthestPosition(r, c, vec); if (next && !next.mergedFrom) { const mergeInfo = getMergeInfo(tile, next); if (mergeInfo) { grid[r][c] = null; tile.row = next.row; tile.col = next.col; next.mergedFrom = tile; next.mergeInfo = mergeInfo; moved = true; return; } } if (farthest.r !== r || farthest.c !== c) { grid[farthest.r][farthest.c] = tile; grid[r][c] = null; tile.row = farthest.r; tile.col = farthest.c; moved = true; } } }); });
        if (moved) {
            playSoundEffect(SFX.swipe);
            for (const row of grid) for (const tile of row) if (tile) tile.updatePosition();
            setTimeout(() => {
                const goal = getCombatGoal();
                // Process merges
                for (const row of grid) for (const tile of row) {
                    if (tile && tile.mergedFrom) {
                        const { newValue, duplexLevel, wasWild, isBloom, bloomTimer } = tile.mergeInfo;
                        if (wasWild) { playSoundEffect(SFX.wild); }
                        else if (duplexLevel > 0) { playSoundEffect(SFX.duplex); }
                        else { playSoundEffect(SFX.combine); }
                        // Wild and duplex do NOT carry over - only bloom does, UNLESS jokers or other logic says so (passed in mergeInfo)
                        tile.updateValue(newValue, tile.mergeInfo.resultDuplex || false, tile.mergeInfo.resultWild || false, true, isBloom, bloomTimer);
                        tile.triggerRipple(duplexLevel);
                        const mergeResults = jokerManager.onMergeResolution(tile, {
                            deck,
                            addTime: seconds => {
                                if (nirvanaActive) return false;
                                timeLeft += seconds;
                                updateTimerDisplay(currentFight.time + timeBonus);
                                return true;
                            }
                        });
                        if (mergeResults.some(entry => entry.joker.id === 'afterimage' && entry.result)) {
                            makeMiniAnnouncement('Afterimage!', '#9b59b6');
                        }
                        if (mergeResults.some(entry => entry.joker.id === 'flow_state' && entry.result)) {
                            makeMiniAnnouncement('Flow State: +5s', '#3498db');
                        }
                        tilesToRemove.push(tile.mergedFrom);
                        tile.mergedFrom = null;
                        if (newValue >= goal) { makeAnnouncement(newValue, currentTheme.tileColors[newValue]?.bg || '#3c3a32', '12rem'); }
                        else if (newValue === goal / 2) { makeAnnouncement(newValue, currentTheme.tileColors[newValue]?.bg || '#3c3a32', '10rem'); }
                        else if (newValue >= 32) { const text = duplexLevel > 0 ? `Duplex ${newValue}` : newValue; makeMiniAnnouncement(text, currentTheme.tileColors[newValue]?.bg || '#3c3a32'); }
                    }
                }
                // Process bloom tiles: decrement timer and double value if timer reaches 0
                for (const row of grid) for (const tile of row) {
                    if (tile && tile.isBloom && tile.bloomTimer > 0) {
                        tile.bloomTimer--;
                        if (tile.bloomTimer <= 0) {
                            // Bloom activates! Overgrowth can replace the normal
                            // doubling with a quadruple.
                            const overgrowth = jokerManager.activeJokers.find(j => j.id === 'overgrowth');
                            const multiplier = overgrowth ? overgrowth.getBloomMultiplier() : 2;
                            const newVal = tile.value * multiplier;
                            tile.updateValue(newVal, tile.isDuplex, tile.isWild, true, false, 0);
                            makeMiniAnnouncement(
                                multiplier === 4 ? `Overgrowth! ${newVal}` : `Bloom! ${newVal}`,
                                '#ffd700'
                            );

                            const bloomResults = jokerManager.onBloomActivate({ tile, grid, deck });
                            if (bloomResults.some(entry => entry.joker.id === 'superbloom' && entry.result)) {
                                doubleAllBoardTiles();
                                makeAnnouncement('SUPERBLOOM!', '#27ae60', '6rem');
                            }
                        } else {
                            // Just update the timer display
                            tile.updateValue(tile.value, tile.isDuplex, tile.isWild, false, tile.isBloom, tile.bloomTimer);
                        }
                    }
                }
                tilesToRemove.forEach(t => t.remove());

                const moveResults = jokerManager.onSuccessfulMove({ grid, deck, fight: currentFight });
                if (moveResults.some(entry => entry.joker.id === 'compound_interest' && entry.result)) {
                    doubleLowestBoardTiles();
                    makeMiniAnnouncement('Compound Interest!', '#f1c40f');
                }

                const cleansing = jokerManager.activeJokers.find(j => j.id === 'the_cleansing');
                if (cleansing && cleansing.shouldTrigger(grid, goal)) {
                    const removed = removeBoardTilesByValue([2, 4]);
                    if (removed > 0) makeAnnouncement('CLEANSED', '#ecf0f1', '7rem');
                }

                let spawnCount = 1;
                const worldPower = getCurrentWorldPower();
                const populationBoom = jokerManager.activeJokers.find(j => j.id === 'population_boom');

                if (hasWorldPower('still_waters')) {
                    worldSuccessfulMoves++;
                    spawnCount = worldSuccessfulMoves % 2 === 1 ? 1 : 0;
                } else if (populationBoom) {
                    spawnCount = populationBoom.getSpawnCountAfterMove();
                }

                for (let i = 0; i < spawnCount; i++) addRandomTile();

                if (checkWin()) { isMoving = true; setTimeout(() => switchState('fight_won'), 300); }
                else if (checkGameOver()) {
                    // Panic Button: Try to save the game
                    const panicButtonJoker = jokerManager.activeJokers.find(j => j.id === 'panic_button');
                    if (panicButtonJoker && !panicButtonJoker.triggered) {
                        panicButtonJoker.triggered = true;

                        // Find all tiles and sort by value
                        const allTiles = [];
                        for (let r = 0; r < 4; r++) {
                            for (let c = 0; c < 4; c++) {
                                if (grid[r][c]) {
                                    allTiles.push({ tile: grid[r][c], r, c });
                                }
                            }
                        }
                        allTiles.sort((a, b) => a.tile.value - b.tile.value);

                        // Remove 3 lowest tiles
                        const tilesToDelete = allTiles.slice(0, 3);
                        tilesToDelete.forEach(({ tile, r, c }) => {
                            tile.remove();
                            grid[r][c] = null;
                        });

                        // Spawn Duplex 64 in one of the freed spots
                        const spawnSpot = tilesToDelete[0];
                        grid[spawnSpot.r][spawnSpot.c] = new Tile(spawnSpot.r, spawnSpot.c,
                            { value: 64, isDuplex: true, isWild: false, isBloom: false, bloomTimer: 0 }, true);

                        makeAnnouncement('PANIC!', '#e74c3c', '10rem');
                        isMoving = false;
                    } else if (saveWithEternity('moves')) {
                        // Eternity opened the board and combat continues.
                    } else {
                        clearInterval(timerInterval); setTimeout(() => switchState('fight_lost', 'moves'), 2000);
                    }
                }
                else { isMoving = false; }
            }, moveDuration);
        } else { isMoving = false; }
    }
    function setupGame() {
        hasAnnounced20Percent = false; hasAnnouncedHalfTime = false; announcementContainer.innerHTML = ''; isMoving = false;
        worldSuccessfulMoves = 0;
        const goal = getCombatGoal(); const goalElement = document.getElementById('goal');
        goalElement.textContent = goal; goalElement.style.color = currentTheme.tileColors[goal]?.bg || 'white';
        gridContainer.querySelectorAll('.tile, .grid-cell').forEach(el => el.remove());
        for (let i = 0; i < 16; i++) { gridContainer.appendChild(document.createElement('div')).classList.add('grid-cell'); }
        grid = Array.from({ length: 4 }, () => Array(4).fill(null));

        // Wildfire: Add Duplex Wild Bloom 4 to deck at combat start
        const wildfireJoker = jokerManager.activeJokers.find(j => j.id === 'wildfire');
        if (wildfireJoker) {
            deck.push({ value: 4, isDuplex: true, isWild: true, isBloom: true, bloomTimer: 3 });
        }

        jokerManager.onCombatStart({
            deck,
            grid,
            fight: currentFight,
            fightRarity: currentFight.rarity,
            activeJokerCount: jokerManager.activeJokers.length
        });
        updateDeckDisplay();

        addRandomTile(); addRandomTile();
    }
    function addRandomTile() { const empty = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) if (!grid[r][c]) empty.push({ r, c }); if (empty.length > 0) { const { r, c } = empty[Math.floor(Math.random() * empty.length)]; const tileData = deck[Math.floor(Math.random() * deck.length)]; grid[r][c] = new Tile(r, c, tileData, true); } }
    function checkGameOver() { for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { const tile = grid[r][c]; if (!tile) return false; if (c < 3 && getMergeInfo(tile, grid[r][c + 1])) return false; if (r < 3 && getMergeInfo(tile, grid[r + 1][c])) return false; } return true; }
    function getTraversals(vec) { const t = { rows: [], cols: [] }; for (let i = 0; i < 4; i++) { t.rows.push(i); t.cols.push(i); } if (vec.r === 1) t.rows.reverse(); if (vec.c === 1) t.cols.reverse(); return t; }
    function findFarthestPosition(r, c, vec) { let cr = r, cc = c, nr, nc; do { nr = cr + vec.r; nc = cc + vec.c; if (isWithinBounds(nr, nc) && !grid[nr][nc]) { cr = nr; cc = nc; } else break; } while (true); return { farthest: { r: cr, c: cc }, next: grid[nr]?.[nc] }; }
    function isWithinBounds(r, c) { return r >= 0 && r < 4 && c >= 0 && c < 4; }
    function checkWin() { return grid.flat().some(tile => tile && tile.value >= getCombatGoal()); }

    function startTimer() {
        if (nirvanaActive) {
            clearInterval(timerInterval);
            timeLeft = Infinity;
            document.getElementById('timer').textContent = '∞';
            document.getElementById('timer-box').dataset.value = 4;
            return;
        }
        const initialTime = currentFight.time + timeBonus; timeLeft = initialTime; updateTimerDisplay(initialTime);
        timerInterval = setInterval(() => {
            timeLeft--; updateTimerDisplay(initialTime);
            if (timeLeft <= 0) {
                if (saveWithEternity('time', initialTime)) return;
                clearInterval(timerInterval);
                switchState('fight_lost', 'time');
                return;
            }
            if (timeLeft === 3 || timeLeft === 2 || timeLeft === 1) { makeAnnouncement(timeLeft, currentTheme.tileColors['64']?.bg || '#f65e3b', '15rem'); }
            else if (timeLeft === 10) { makeAnnouncement('10 SECONDS', currentTheme.tileColors['32']?.bg || '#f67c5f', '8rem'); }
            else if (!hasAnnouncedHalfTime && timeLeft <= initialTime / 2) { hasAnnouncedHalfTime = true; makeMiniAnnouncement('Half Time', currentTheme.uiText); }
            else if (!hasAnnounced20Percent && timeLeft <= initialTime * 0.2 && timeLeft > 10) { hasAnnounced20Percent = true; const roundedTime = Math.ceil(timeLeft / 5) * 5; makeAnnouncement(`${roundedTime} SECONDS`, currentTheme.tileColors['16']?.bg || '#f59563', '6rem'); }
        }, 1000);
    }

    async function playStorySequence(isIntro) {
        storyAbortController = false;
        SCREENS.story.classList.add('active');
        const grid = document.getElementById('story-grid-container');
        const dialogueBox = document.getElementById('dialogue-box');
        const dialogueText = document.getElementById('dialogue-text');
        const skipButton = document.getElementById('skip-story-button');
        const continueButton = document.getElementById('story-continue-button');

        grid.innerHTML = ''; dialogueBox.style.opacity = 0; dialogueText.textContent = ''; continueButton.style.display = 'none';
        if (isIntro) skipButton.style.display = 'block';

        const onComplete = isIntro ? () => switchState('joker_selection') : () => switchState('start');
        const dialogue = isIntro
            ? "Traveler... The continuum frays. Time runs short. You must gather the temporal energy from these worlds. Defeat the bosses who shatter the timeline. Go now... save what can be saved."
            : "You... you did it. The echoes of their destruction fade. The timeline is stable once more. Thank you, Traveler. Now... I can finally rest.";

        const skip = () => { storyAbortController = true; onComplete(); };
        skipButton.onclick = skip;

        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

        for (const step of [{ count: 1 }, { count: 2 }, { count: 4 }, { count: 8 }, { count: 16 }]) {
            if (storyAbortController) return;
            grid.style.gridTemplateColumns = `repeat(${Math.sqrt(step.count)}, 1fr)`;
            grid.innerHTML = '';
            for (let i = 0; i < step.count; i++) grid.appendChild(document.createElement('div')).className = 'story-tile';
            await sleep(400);
        }

        if (storyAbortController) return;
        const tiles = grid.children;
        tiles[0].classList.add('eye'); tiles[3].classList.add('eye');
        tiles[8].classList.add('mouth'); tiles[9].classList.add('mouth');
        tiles[10].classList.add('mouth');
        tiles[11].classList.add('mouth');
        tiles[12].classList.add('mouth');
        tiles[15].classList.add('mouth');
        await sleep(1000);

        if (storyAbortController) return;
        dialogueBox.style.opacity = 1;

        let charIndex = 0;
        const typeInterval = setInterval(() => {
            if (storyAbortController) { clearInterval(typeInterval); return; }
            if (charIndex < dialogue.length) {
                dialogueText.textContent += dialogue.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typeInterval);
                skipButton.style.display = 'none';
                if (!isIntro) {
                    continueButton.style.display = 'block';
                    continueButton.onclick = () => { playSoundEffect(SFX.click); onComplete(); };
                } else {
                    setTimeout(onComplete, 1500);
                }
            }
        }, 50);
    }

    function updateTimerDisplay(initialTime) { const t = document.getElementById('timer'), b = document.getElementById('timer-box'); t.textContent = timeLeft; const f = timeLeft / initialTime; let c; if (f <= 1 / 6) c = 128; else if (f <= 2 / 6) c = 64; else if (f <= 3 / 6) c = 32; else if (f <= 4 / 6) c = 16; else if (f <= 5 / 6) c = 8; else c = 4; b.dataset.value = c; }

    // --- TUTORIAL SYSTEM ---
    const tutorialGridContainer = document.getElementById('tutorial-grid-container');

    class TutorialTile {
        constructor(r, c, tileData, isNew = false) {
            this.row = r; this.col = c; this.value = tileData.value; this.isDuplex = tileData.isDuplex || false; this.isWild = tileData.isWild || false;
            this.isBloom = tileData.isBloom || false; this.bloomTimer = tileData.bloomTimer || 0;
            this.element = document.createElement('div'); this.element.classList.add('tile');
            this.innerElement = document.createElement('div'); this.innerElement.classList.add('tile-inner'); this.element.appendChild(this.innerElement);
            this.spanElement = document.createElement('span'); this.innerElement.appendChild(this.spanElement);
            this.timerElement = null; this.cycleIntervalId = null;
            this.updateValue(tileData.value, tileData.isDuplex, tileData.isWild, false, this.isBloom, this.bloomTimer);
            this.updatePosition(); tutorialGridContainer.appendChild(this.element);
            if (isNew) { this.innerElement.classList.add('new'); this.innerElement.addEventListener('animationend', () => this.innerElement.classList.remove('new'), { once: true }); }
        }
        updateValue(nv, isDup = false, isWild = false, isMerged = false, isBloom = false, bloomTimer = 0) {
            this.value = nv; this.isDuplex = isDup; this.isWild = isWild; this.isBloom = isBloom; this.bloomTimer = bloomTimer;
            this.innerElement.dataset.value = this.value; this.spanElement.textContent = this.value;
            this.innerElement.classList.toggle('duplex', this.isDuplex); this.innerElement.classList.toggle('wild', this.isWild); this.innerElement.classList.toggle('bloom', this.isBloom);
            if (this.timerElement) { this.timerElement.remove(); this.timerElement = null; }
            if (this.isBloom && this.bloomTimer > 0) {
                this.timerElement = document.createElement('div'); this.timerElement.className = 'bloom-timer'; this.timerElement.textContent = this.bloomTimer; this.innerElement.appendChild(this.timerElement);
            }
            if (this.cycleIntervalId) { clearInterval(this.cycleIntervalId); this.cycleIntervalId = null; }
            if (this.isWild) { const cycleValues = []; for (let v = 2; v <= this.value; v *= 2) cycleValues.push(v); this.cycleIntervalId = setInterval(() => { this.spanElement.textContent = cycleValues[Math.floor(Math.random() * cycleValues.length)]; }, 100); }
            if (isMerged) { this.innerElement.classList.add('merged'); this.innerElement.addEventListener('animationend', () => this.innerElement.classList.remove('merged'), { once: true }); }
        }
        updatePosition() { const cs = tutorialGridContainer.clientWidth; if (cs === 0) return; const tg = 12; const ts = (cs - 12 * (4 + 1)) / 4; this.element.style.transform = `translate(${this.col * (ts + 12) + 12}px, ${this.row * (ts + 12) + 12}px)`; }
        remove() { if (this.cycleIntervalId) clearInterval(this.cycleIntervalId); this.element.remove(); }
    }

    function setupTutorialStep() {
        const step = TUTORIAL_STEPS[tutorialStep];
        isTutorialMoving = false;
        tutorialSpawnIndex = 0;

        // Clear any existing tutorial timer
        if (tutorialTimerInterval) {
            clearInterval(tutorialTimerInterval);
            tutorialTimerInterval = null;
        }

        // Update UI
        document.getElementById('tutorial-step-num').textContent = tutorialStep + 1;
        document.getElementById('tutorial-text').textContent = step.instruction;
        document.getElementById('tutorial-goal').textContent = step.goal;

        // Show stats container if either timer or goal should show
        const showStats = step.showTimer || step.showGoal;
        document.getElementById('tutorial-stats').style.display = showStats ? 'flex' : 'none';
        document.getElementById('tutorial-timer-box').style.display = step.showTimer ? 'flex' : 'none';
        document.getElementById('tutorial-goal-box').style.display = step.showGoal ? 'flex' : 'none';
        document.getElementById('tutorial-deck-container').style.display = step.showDeck ? 'block' : 'none';

        // Start tutorial timer if needed
        if (step.showTimer && step.timerDuration) {
            let tutorialTimeLeft = step.timerDuration;
            document.getElementById('tutorial-timer').textContent = tutorialTimeLeft;
            tutorialTimerInterval = setInterval(() => {
                tutorialTimeLeft--;
                document.getElementById('tutorial-timer').textContent = tutorialTimeLeft;
                if (tutorialTimeLeft <= 0) {
                    clearInterval(tutorialTimerInterval);
                    tutorialTimerInterval = null;
                    // Reset step on timeout
                    setupTutorialStep();
                }
            }, 1000);
        } else {
            document.getElementById('tutorial-timer').textContent = '--';
        }

        // Setup deck
        tutorialDeck = step.deck.map(t => ({ value: t.value, isDuplex: t.isDuplex || false, isWild: t.isWild || false, isBloom: t.isBloom || false, bloomTimer: t.bloomTimer || 0 }));
        updateTutorialDeckDisplay();

        // Setup grid
        tutorialGridContainer.querySelectorAll('.tile, .grid-cell').forEach(el => el.remove());
        for (let i = 0; i < 16; i++) { tutorialGridContainer.appendChild(document.createElement('div')).classList.add('grid-cell'); }
        tutorialGrid = Array.from({ length: 4 }, () => Array(4).fill(null));

        // Spawn tiles - either fixed or random
        if (step.fixedSpawns) {
            step.fixedSpawns.forEach((tileData, idx) => {
                const positions = [[1, 1], [2, 2], [1, 2], [2, 1]]; // Centered positions
                const [r, c] = positions[idx] || [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
                tutorialGrid[r][c] = new TutorialTile(r, c, { value: tileData.value, isDuplex: tileData.isDuplex || false, isWild: tileData.isWild || false, isBloom: tileData.isBloom || false, bloomTimer: tileData.bloomTimer || 0 }, true);
            });
        } else {
            addTutorialTile(); addTutorialTile();
        }
    }

    function updateTutorialDeckDisplay() {
        const display = document.getElementById('tutorial-deck-display');
        display.querySelectorAll('[data-cycle-interval-id]').forEach(el => clearInterval(el.dataset.cycleIntervalId));
        display.innerHTML = '';
        tutorialDeck.forEach(tileData => display.appendChild(createTilePreview(tileData, 'deck-tile-preview-inner')));
    }

    function addTutorialTile() {
        const empty = [];
        for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) if (!tutorialGrid[r][c]) empty.push({ r, c });
        if (empty.length > 0) {
            const { r, c } = empty[Math.floor(Math.random() * empty.length)];
            const tileData = tutorialDeck[Math.floor(Math.random() * tutorialDeck.length)];
            tutorialGrid[r][c] = new TutorialTile(r, c, tileData, true);
        }
    }

    function checkTutorialWin() {
        const goal = TUTORIAL_STEPS[tutorialStep].goal;
        return tutorialGrid.flat().some(tile => tile && tile.value >= goal);
    }

    function checkTutorialGameOver() {
        for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
            const tile = tutorialGrid[r][c];
            if (!tile) return false;
            if (c < 3 && getMergeInfo(tile, tutorialGrid[r][c + 1])) return false;
            if (r < 3 && getMergeInfo(tile, tutorialGrid[r + 1][c])) return false;
        }
        return true;
    }

    function findTutorialFarthestPosition(r, c, vec) {
        let cr = r, cc = c, nr, nc;
        do {
            nr = cr + vec.r; nc = cc + vec.c;
            if (isWithinBounds(nr, nc) && !tutorialGrid[nr][nc]) { cr = nr; cc = nc; }
            else break;
        } while (true);
        return { farthest: { r: cr, c: cc }, next: tutorialGrid[nr]?.[nc] };
    }

    function handleTutorialMove(dir) {
        if (isTutorialMoving || gameState !== 'tutorial') return;
        isTutorialMoving = true;
        const step = TUTORIAL_STEPS[tutorialStep];

        const vec = { up: { r: -1, c: 0 }, down: { r: 1, c: 0 }, left: { r: 0, c: -1 }, right: { r: 0, c: 1 } }[dir];
        const trav = getTraversals(vec);
        let moved = false;
        let mergeHappened = false;
        const tilesToRemove = [];

        for (const r of tutorialGrid) for (const c of r) if (c) { c.mergedFrom = null; c.mergeInfo = null; }

        trav.rows.forEach(r => {
            trav.cols.forEach(c => {
                const tile = tutorialGrid[r][c];
                if (tile) {
                    const { farthest, next } = findTutorialFarthestPosition(r, c, vec);
                    if (next && !next.mergedFrom) {
                        const mergeInfo = getMergeInfo(tile, next);
                        if (mergeInfo) {
                            tutorialGrid[r][c] = null;
                            tile.row = next.row; tile.col = next.col;
                            next.mergedFrom = tile; next.mergeInfo = mergeInfo;
                            moved = true;
                            mergeHappened = true;
                            return;
                        }
                    }
                    if (farthest.r !== r || farthest.c !== c) {
                        tutorialGrid[farthest.r][farthest.c] = tile;
                        tutorialGrid[r][c] = null;
                        tile.row = farthest.r; tile.col = farthest.c;
                        moved = true;
                    }
                }
            });
        });

        if (moved) {
            playSoundEffect(SFX.swipe);
            for (const row of tutorialGrid) for (const tile of row) if (tile) tile.updatePosition();

            setTimeout(() => {
                // Process merges
                for (const row of tutorialGrid) for (const tile of row) {
                    if (tile && tile.mergedFrom) {
                        const { newValue, duplexLevel, wasWild, isBloom, bloomTimer } = tile.mergeInfo;
                        if (wasWild) playSoundEffect(SFX.wild);
                        else if (duplexLevel > 0) playSoundEffect(SFX.duplex);
                        else playSoundEffect(SFX.combine);
                        tile.updateValue(newValue, false, false, true, isBloom, bloomTimer);
                        tilesToRemove.push(tile.mergedFrom);
                        tile.mergedFrom = null;
                    }
                }
                // Process bloom tiles
                for (const row of tutorialGrid) for (const tile of row) {
                    if (tile && tile.isBloom && tile.bloomTimer > 0) {
                        tile.bloomTimer--;
                        if (tile.bloomTimer <= 0) {
                            const newVal = tile.value * 2;
                            tile.updateValue(newVal, tile.isDuplex, tile.isWild, true, false, 0);
                        } else {
                            tile.updateValue(tile.value, tile.isDuplex, tile.isWild, false, tile.isBloom, tile.bloomTimer);
                        }
                    }
                }

                tilesToRemove.forEach(t => t.remove());

                // Handle tile spawning based on step configuration
                if (!step.noAddTiles) {
                    // Normal random tile spawning
                    addTutorialTile();
                } else if (step.spawnSequence && mergeHappened && tutorialSpawnIndex < step.spawnSequence.length) {
                    // Spawn next tile from sequence after a merge
                    const nextTileData = step.spawnSequence[tutorialSpawnIndex];
                    tutorialSpawnIndex++;
                    const empty = [];
                    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) if (!tutorialGrid[r][c]) empty.push({ r, c });
                    if (empty.length > 0) {
                        const { r, c } = empty[Math.floor(Math.random() * empty.length)];
                        tutorialGrid[r][c] = new TutorialTile(r, c, { value: nextTileData.value, isDuplex: nextTileData.isDuplex || false, isWild: nextTileData.isWild || false, isBloom: nextTileData.isBloom || false, bloomTimer: nextTileData.bloomTimer || 0 }, true);
                    }
                }
                // For noAddTiles without spawnSequence (lessons 4-5), don't add any tiles

                if (checkTutorialWin()) {
                    isTutorialMoving = true;
                    // Give player time to see the result of their merge (1.2s delay)
                    setTimeout(() => advanceTutorial(), 1200);
                } else if (checkTutorialGameOver()) {
                    // Reset current step on game over
                    setTimeout(() => setupTutorialStep(), 1000);
                } else {
                    isTutorialMoving = false;
                }
            }, moveDuration);
        } else {
            isTutorialMoving = false;
        }
    }

    function advanceTutorial() {
        // Clear timer if running
        if (tutorialTimerInterval) {
            clearInterval(tutorialTimerInterval);
            tutorialTimerInterval = null;
        }

        tutorialStep++;
        const transitionOverlay = document.getElementById('tutorial-lesson-transition');
        const transitionText = transitionOverlay.querySelector('.transition-text');

        if (tutorialStep >= TUTORIAL_STEPS.length) {
            // Tutorial complete!
            transitionText.textContent = 'Tutorial Complete!';
            transitionOverlay.classList.add('active');
            setTimeout(() => {
                transitionOverlay.classList.remove('active');
                switchState('start');
            }, 1500);
        } else {
            // Show lesson transition
            transitionText.textContent = `Step ${tutorialStep + 1}`;
            transitionOverlay.classList.add('active');
            setTimeout(() => {
                transitionOverlay.classList.remove('active');
                setupTutorialStep();
            }, 1000);
        }
    }
    document.querySelectorAll('.deck-toggle').forEach(t => { t.addEventListener('click', () => { playSoundEffect(SFX.click); const i = t.querySelector('.toggle-icon'), c = t.parentElement; c.classList.toggle('collapsed'); i.textContent = c.classList.contains('collapsed') ? '[+]' : '[-]'; }); const i = t.querySelector('.toggle-icon'), c = t.parentElement; i.textContent = c.classList.contains('collapsed') ? '[+]' : '[-]'; });
    function startCountdown() { isMoving = true; const o = document.getElementById('countdown-overlay'), t = document.getElementById('countdown-text'); let c = 3; o.classList.add('active'); t.textContent = c; t.style.animation = 'pop-in 1s ease-out infinite'; const i = setInterval(() => { c--; if (c > 0) { t.textContent = c; } else { t.textContent = 'GO!'; clearInterval(i); setTimeout(() => { o.style.opacity = '0'; setTimeout(() => { o.classList.remove('active'); o.style.opacity = '1'; isMoving = false; startTimer(); }, 500); }, 800); } }, 1000); }

    function setupInput() {
        document.addEventListener('keydown', e => {
            const keyMap = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
            if (e.key.toLowerCase() === 'p' && isDevMode && gameState === 'world') {
                e.preventDefault();
                toggleDevDebugMenu();
                return;
            }
            if (keyMap[e.key]) {
                e.preventDefault();
                if (gameState === 'tutorial') handleTutorialMove(keyMap[e.key]);
                else handleMove(keyMap[e.key]);
            }
        });
        let touchStartX = 0, touchStartY = 0, moveTriggeredThisTouch = false;
        const swipeThreshold = 30, gameArea = document.getElementById('game-screen');
        const tutorialArea = document.getElementById('tutorial-screen');

        gameArea.addEventListener('touchstart', e => { if (e.touches.length > 1 || isMoving) return; touchStartX = e.touches[0].screenX; touchStartY = e.touches[0].screenY; moveTriggeredThisTouch = false; }, { passive: true });
        gameArea.addEventListener('touchmove', e => { e.preventDefault(); if (isMoving || moveTriggeredThisTouch || e.touches.length > 1) return; const touchEndX = e.touches[0].screenX, touchEndY = e.touches[0].screenY; const dx = touchEndX - touchStartX, dy = touchEndY - touchStartY; if (Math.abs(dx) > swipeThreshold || Math.abs(dy) > swipeThreshold) { const direction = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'); handleMove(direction); moveTriggeredThisTouch = true; } }, { passive: false });

        tutorialArea.addEventListener('touchstart', e => { if (e.touches.length > 1 || isTutorialMoving) return; touchStartX = e.touches[0].screenX; touchStartY = e.touches[0].screenY; moveTriggeredThisTouch = false; }, { passive: true });
        tutorialArea.addEventListener('touchmove', e => { e.preventDefault(); if (isTutorialMoving || moveTriggeredThisTouch || e.touches.length > 1) return; const touchEndX = e.touches[0].screenX, touchEndY = e.touches[0].screenY; const dx = touchEndX - touchStartX, dy = touchEndY - touchStartY; if (Math.abs(dx) > swipeThreshold || Math.abs(dy) > swipeThreshold) { const direction = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'); handleTutorialMove(direction); moveTriggeredThisTouch = true; } }, { passive: false });
    }

    const startButton = document.getElementById('start-run-button');
    const settingsButton = document.getElementById('settings-button');
    const settingsModal = document.getElementById('settings-modal');
    const settingsCloseButton = document.getElementById('settings-close-button');
    const musicToggle = document.getElementById('music-toggle');
    const sfxToggle = document.getElementById('sfx-toggle');
    const mapModal = document.getElementById('map-modal');
    const mapCloseButton = document.getElementById('map-close-button');
    const mapContainer = document.getElementById('map-container');
    const resetButton = document.getElementById('reset-run-button');

    function loadSettings() {
        const musicSetting = localStorage.getItem('2048wot_musicEnabled');
        const sfxSetting = localStorage.getItem('2048wot_sfxEnabled');
        isMusicEnabled = musicSetting === null ? true : musicSetting === 'true';
        isSfxEnabled = sfxSetting === null ? true : sfxSetting === 'true';
        musicToggle.checked = isMusicEnabled;
        sfxToggle.checked = isSfxEnabled;
    }

    function firstInteraction() { if (!musicStarted) { musicStarted = true; Object.values(AUDIO).forEach(aud => { aud.play().catch(e => { }); aud.pause(); }); } }

    function openSettingsModal(isIngame = false) {
        firstInteraction();
        playSoundEffect(SFX.click);
        resetButton.style.display = isIngame ? 'block' : 'none';
        settingsModal.classList.add('active');
    }

    function generateWorldMap() {
        mapContainer.innerHTML = '';
        const currentWorldIndex = Math.floor(currentFightIndex / 3);

        const createCard = (worldKey, isLocked) => {
            const card = document.createElement('div');
            card.className = 'map-world-card';
            if (isLocked) {
                card.classList.add('locked');
                card.textContent = '???';
            } else {
                const world = WORLDS[worldKey];
                card.textContent = world.name;
                card.style.backgroundColor = world.previewColors.bg;
                card.style.color = world.previewColors.text;
                card.style.borderColor = world.previewColors.border;

                if (runWorldOrder.indexOf(worldKey) === currentWorldIndex) {
                    card.classList.add('current-world');
                }
            }
            return card;
        };

        const createArrow = () => {
            const arrow = document.createElement('div');
            arrow.className = 'map-arrow';
            arrow.innerHTML = '→';
            return arrow;
        };

        mapContainer.appendChild(createCard(runWorldOrder[0], false));
        mapContainer.appendChild(createArrow());
        mapContainer.appendChild(createCard(runWorldOrder[1], runWorldOrder.length < 2));
        mapContainer.appendChild(createArrow());
        mapContainer.appendChild(createCard(runWorldOrder[2], runWorldOrder.length < 3));
    }

    startButton.addEventListener('click', () => { firstInteraction(); playSoundEffect(SFX.click); switchState('story_intro'); });
    document.getElementById('tutorial-button').addEventListener('click', () => { firstInteraction(); playSoundEffect(SFX.click); switchState('tutorial'); });
    document.getElementById('tutorial-skip-button').addEventListener('click', () => { playSoundEffect(SFX.click); if (tutorialTimerInterval) { clearInterval(tutorialTimerInterval); tutorialTimerInterval = null; } switchState('start'); });
    settingsButton.addEventListener('click', () => openSettingsModal(false));
    ingameSettingsButton.addEventListener('click', () => openSettingsModal(true));

    settingsCloseButton.addEventListener('click', () => { playSoundEffect(SFX.click); settingsModal.classList.remove('active'); });
    settingsModal.addEventListener('click', (e) => { if (e.target === settingsModal) { settingsModal.classList.remove('active'); } });

    mapButton.addEventListener('click', () => { playSoundEffect(SFX.click); generateWorldMap(); mapModal.classList.add('active'); });
    mapCloseButton.addEventListener('click', () => { playSoundEffect(SFX.click); mapModal.classList.remove('active'); });
    mapModal.addEventListener('click', (e) => { if (e.target === mapModal) { mapModal.classList.remove('active'); } });

    resetButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset your run? All progress will be lost.')) {
            settingsModal.classList.remove('active');
            clearInterval(timerInterval);
            switchState('start');
        }
    });

    musicToggle.addEventListener('change', () => { isMusicEnabled = musicToggle.checked; localStorage.setItem('2048wot_musicEnabled', isMusicEnabled); if (!isMusicEnabled) { Object.values(AUDIO).forEach(aud => aud.pause()); currentMusicTrack = null; } else { if (['start', 'world', 'shop', 'world_select'].includes(gameState)) playMusic('menu'); } });
    sfxToggle.addEventListener('change', () => { isSfxEnabled = sfxToggle.checked; localStorage.setItem('2048wot_sfxEnabled', isSfxEnabled); });

    document.getElementById('play-blind-button').addEventListener('click', () => { playSoundEffect(SFX.click); switchState('game'); });
    document.getElementById('result-button').addEventListener('click', () => playSoundEffect(SFX.click));

    // --- JOKER REWARDS ---
    function getRandomJokerChoices(count = 2) {
        const activeIds = new Set(jokerManager.activeJokers.map(joker => joker.id));
        const pool = jokerManager.getAllJokers().filter(joker => !activeIds.has(joker.id));
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        return pool.slice(0, count);
    }

    function addJokerToRun(joker) {
        if (!joker || getOccupiedJokerSlots() >= maxJokerSlots) return false;
        joker.isBonusJoker = false;
        jokerManager.activeJokers.push(joker);
        joker.onRunStart();
        jokerManager.onAcquire(joker, { deck });
        updateJokerDisplays();
        updateDeckDisplay();
        return true;
    }

    function addBonusJokerToRun(joker) {
        if (!joker || jokerManager.activeJokers.includes(joker)) return false;
        joker.isBonusJoker = true;
        jokerManager.activeJokers.push(joker);
        joker.onRunStart();
        jokerManager.onAcquire(joker, { deck });
        updateDeckDisplay();
        return true;
    }

    function replaceJokerInRun(oldJoker, newJoker) {
        const index = jokerManager.activeJokers.findIndex(joker => joker.id === oldJoker.id);
        if (index === -1 || !newJoker || oldJoker.protectedFromDestruction) return false;
        newJoker.isBonusJoker = false;
        jokerManager.activeJokers[index] = newJoker;
        newJoker.onRunStart();
        jokerManager.onAcquire(newJoker, { deck });
        updateJokerDisplays();
        updateDeckDisplay();
        return true;
    }

    function createJokerRewardCard(joker, buttonText, onSelect, extraClass = '') {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = `joker-reward-card ${extraClass}`.trim();
        card.innerHTML = `<h3>${joker.name}</h3><p>${joker.description}</p><span>${buttonText}</span>`;
        card.onclick = () => {
            playSoundEffect(SFX.click);
            onSelect();
        };
        return card;
    }

    function showJokerReward(onComplete) {
        const choices = getRandomJokerChoices(2);
        const title = document.getElementById('joker-reward-title');
        const desc = document.getElementById('joker-reward-desc');
        const options = document.getElementById('joker-reward-options');
        const backBtn = document.getElementById('joker-reward-back-button');
        let selectedNewJoker = null;

        const finishReward = () => {
            selectedNewJoker = null;
            onComplete();
        };

        const renderChoices = () => {
            switchState('joker_reward');
            title.textContent = 'Joker Chest';
            desc.textContent = getOccupiedJokerSlots() < maxJokerSlots
                ? 'Choose one of these two Jokers to add to your run.'
                : `Your ${maxJokerSlots} Joker slots are full. Choose a new Joker, then choose exactly which current Joker it will replace.`;
            options.innerHTML = '';
            backBtn.style.display = 'none';

            choices.forEach(joker => {
                options.appendChild(createJokerRewardCard(joker, 'Choose This Joker', () => {
                    if (getOccupiedJokerSlots() < maxJokerSlots) {
                        addJokerToRun(joker);
                        finishReward();
                    } else {
                        selectedNewJoker = joker;
                        renderReplacementChoices();
                    }
                }));
            });
        };

        const renderReplacementChoices = () => {
            title.textContent = `Replace a Joker with ${selectedNewJoker.name}`;
            desc.textContent = `Choose the Joker to destroy. The Joker you select below will be permanently destroyed and replaced by ${selectedNewJoker.name}.`;
            options.innerHTML = '';
            backBtn.style.display = 'inline-block';

            const replaceableJokers = jokerManager.activeJokers.filter(
                currentJoker => !currentJoker.protectedFromDestruction &&
                    !currentJoker.isBonusJoker
            );

            if (replaceableJokers.length === 0) {
                desc.textContent = 'Your Joker slots are protected and cannot be replaced.';
                const continueButton = document.createElement('button');
                continueButton.className = 'joker-reward-card';
                continueButton.textContent = 'Continue';
                continueButton.onclick = finishReward;
                options.appendChild(continueButton);
                backBtn.style.display = 'none';
                return;
            }

            replaceableJokers.forEach(currentJoker => {
                options.appendChild(createJokerRewardCard(
                    currentJoker,
                    `Destroy ${currentJoker.name} and Gain ${selectedNewJoker.name}`,
                    () => {
                        replaceJokerInRun(currentJoker, selectedNewJoker);
                        finishReward();
                    },
                    'replace-card'
                ));
            });
        };

        backBtn.onclick = () => {
            playSoundEffect(SFX.click);
            selectedNewJoker = null;
            renderChoices();
        };

        renderChoices();
    }

    // --- MYSTERY SPACE LOGIC ---
    const MYSTERY_EVENTS = [
        { id: 'fight_reg', weight: 20, type: 'fight', name: 'Ambush!', desc: 'A common enemy appears!', rarity: 'common' },
        { id: 'fight_boss', weight: 5, type: 'fight', name: 'BOSS AMBUSH!', desc: 'A powerful foe appears!', rarity: 'epic' },
        { id: 'gamble_delete', weight: 10, type: 'choice', name: 'Delete or Double', desc: 'Delete 1 tile, or risk it all for more!' },
        { id: 'shop_common', weight: 10, type: 'shop', name: 'Traveler\'s Shop', rarity: 'common' },
        { id: 'shop_rare', weight: 3, type: 'shop', name: 'Rare Shop', rarity: 'rare' },
        { id: 'shop_epic', weight: 2, type: 'shop', name: 'Epic Shop', rarity: 'epic' },
        { id: 'temple_duplex', weight: 5, type: 'special', name: 'Temple of Duplex', desc: 'Destroy your deck? Receive 3x2s and 1xDuplex 64.' },
        { id: 'thats_wild', weight: 5, type: 'special', name: 'That\'s Wild!', desc: 'Turn ALL current tiles into Wild tiles?' },
        { id: 'joker_select', weight: 5, type: 'joker', name: 'Joker Chest', desc: 'Choose one of two Jokers.' },
        { id: 'temple_of_two', weight: 3, type: 'special', name: 'Temple of Two', desc: 'Transform your entire deck into 2s and replace all your Jokers with Natural Law and Natural Growth?' },
        { id: 'nirvana', weight: 5, type: 'special', name: 'Nirvana', desc: 'Enter Nirvana? The time limit will disappear, but every combat goal will be quadrupled. (Does it smell like the spirit of a child in here?)' },
        { id: 'world_conqueror', weight: 3, type: 'special', name: 'World Conqueror', desc: 'Permanently gain the power of a random world other than your current world?' },
        { id: 'shady_salesman', weight: 7, type: 'special', name: 'Shady Salesman', desc: 'Destroy a random tile in your deck and receive a random bonus Joker that does not consume a slot?' },
        { id: 'why_so_serious', weight: 2, type: 'special', name: 'Why So Serious?', desc: 'Permanently gain a third Joker slot?' },
        { id: 'placeholder', weight: 15, type: 'placeholder', name: 'Mystery...', desc: 'Use "p" to debug events.' }
    ];

    function handleMysteryInteraction(node) {
        // Immediate event trigger - no entry screen
        const event = rollMysteryEvent();
        triggerMysteryEvent(event, node);
    }

    function rollMysteryEvent() {
        // Sanctuary: Filter out fight events
        const sanctuaryJoker = jokerManager.activeJokers.find(j => j.id === 'sanctuary');
        const currentWorldKey = getCurrentWorldKey();
        const hasConquerableWorld = Object.entries(WORLD_POWERS).some(
            ([worldKey, power]) =>
                worldKey !== currentWorldKey &&
                !conqueredWorldPowerIds.has(power.id)
        );
        const hasAvailableBonusJoker = jokerManager.getAllJokers().some(
            joker => !jokerManager.activeJokers.includes(joker)
        );

        let events = MYSTERY_EVENTS.filter(event => {
            if (event.id === 'nirvana' && nirvanaActive) return false;
            if (event.id === 'why_so_serious' && maxJokerSlots >= 3) return false;
            if (event.id === 'world_conqueror' && !hasConquerableWorld) return false;
            if (
                event.id === 'shady_salesman' &&
                (deck.length <= 1 || !hasAvailableBonusJoker)
            ) return false;
            return true;
        });
        if (sanctuaryJoker) {
            events = events.filter(e => e.type !== 'fight');
        }

        const totalWeight = events.reduce((sum, e) => sum + e.weight, 0);
        let random = Math.random() * totalWeight;
        for (const event of events) {
            random -= event.weight;
            if (random <= 0) return event;
        }
        return events[0];
    }

    function triggerMysteryEvent(event, node) {
        if (event.type === 'fight') {
            currentFight = {
                goal: node.goal,
                time: node.time,
                isBoss: event.id === 'fight_boss',
                completesWorld: false,
                rarity: event.rarity
            };
            switchState('game');
        } else if (event.type === 'shop') {
            // Shop automatically marks complete when leaving?
            // Actually standard behavior is fight_won -> shop -> world.
            // We just mark it here immediately since we are giving it for free (no fight).
            completeCurrentNode();

            const rarity = event.rarity || 'common';
            // Setup shop with correct rarity
            // Setup shop with correct rarity
            const shopWorldKey = runWorldOrder[currentWorldIndex];
            applyWorldTheme(shopWorldKey);

            currentFight = { rarity: rarity };

            // Use switchState to correctly handle screen transitions and layout
            switchState('shop');
        } else if (event.type === 'joker') {
            showJokerReward(() => {
                completeCurrentNode();
                switchState('world');
            });
        } else if (event.type === 'placeholder') {
            // Use generic UI for placeholder so it doesn't just flash
            showMysteryEventUI({
                name: 'Quiet Area',
                desc: 'There is nothing here but silence...',
                type: 'placeholder'
            }, () => {
                // Accept (Explore?) -> just leave
                completeCurrentNode();
                switchState('world');
            });
        } else if (event.type === 'choice') {
            if (event.id === 'gamble_delete') {
                showGambleUI(1);
            }
        } else if (event.type === 'special') {
            showMysteryEventUI(event, () => {
                if (event.id === 'temple_duplex') {
                    deck = [
                        { value: 2, isDuplex: false, isWild: false },
                        { value: 2, isDuplex: false, isWild: false },
                        { value: 2, isDuplex: false, isWild: false },
                        { value: 64, isDuplex: true, isWild: false }
                    ];
                    playSoundEffect(SFX.bigAnnounce);
                } else if (event.id === 'thats_wild') {
                    deck.forEach(t => t.isWild = true);
                    playSoundEffect(SFX.wild);
                } else if (event.id === 'temple_of_two') {
                    deck = deck.map(() => ({
                        value: 2,
                        isDuplex: false,
                        isWild: false,
                        isBloom: false,
                        bloomTimer: 0
                    }));
                    jokerManager.setActiveJokers(['natural_law', 'natural_growth']);
                    jokerManager.activeJokers.forEach(joker => {
                        joker.isBonusJoker = false;
                        jokerManager.onAcquire(joker, { deck });
                    });
                    playSoundEffect(SFX.bigAnnounce);
                } else if (event.id === 'nirvana') {
                    nirvanaActive = true;
                    playSoundEffect(SFX.bigAnnounce);
                } else if (event.id === 'world_conqueror') {
                    const currentWorldKey = getCurrentWorldKey();
                    const eligiblePowers = Object.entries(WORLD_POWERS)
                        .filter(([worldKey, power]) =>
                            worldKey !== currentWorldKey &&
                            !conqueredWorldPowerIds.has(power.id)
                        )
                        .map(([, power]) => power);
                    if (eligiblePowers.length) {
                        const power = eligiblePowers[
                            Math.floor(Math.random() * eligiblePowers.length)
                        ];
                        conqueredWorldPowerIds.add(power.id);
                    }
                    playSoundEffect(SFX.bigAnnounce);
                } else if (event.id === 'shady_salesman') {
                    if (deck.length > 1) {
                        deck.splice(Math.floor(Math.random() * deck.length), 1);
                    }
                    const ownedIds = new Set(
                        jokerManager.activeJokers.map(joker => joker.id)
                    );
                    const jokerPool = jokerManager.getAllJokers().filter(
                        joker => !ownedIds.has(joker.id)
                    );
                    if (jokerPool.length) {
                        const joker = jokerPool[
                            Math.floor(Math.random() * jokerPool.length)
                        ];
                        addBonusJokerToRun(joker);
                    }
                    playSoundEffect(SFX.click);
                } else if (event.id === 'why_so_serious') {
                    maxJokerSlots = Math.max(maxJokerSlots, 3);
                    playSoundEffect(SFX.bigAnnounce);
                }
                completeCurrentNode();
                switchState('world');
            });
        }
    }

    function showMysteryEventUI(event, onAccept) {
        switchState('mystery_event');
        document.getElementById('mystery-event-title').textContent = event.name;
        document.getElementById('mystery-event-desc').textContent = event.desc;

        // Setup Icon based on type
        const iconEl = document.getElementById('mystery-event-icon');
        iconEl.textContent = event.type === 'special' ? '!' : '?'; // simple fallback
        // Could set background image if we had assets

        const acceptBtn = document.getElementById('mystery-action-button');
        const leaveBtn = document.getElementById('mystery-leave-button');

        const yesNoEvents = new Set([
            'temple_of_two',
            'nirvana',
            'world_conqueror',
            'shady_salesman',
            'why_so_serious'
        ]);
        acceptBtn.textContent = yesNoEvents.has(event.id) ? 'Yes' : 'Accept';
        acceptBtn.onclick = () => {
            playSoundEffect(SFX.click);
            onAccept();
        };

        leaveBtn.textContent = yesNoEvents.has(event.id) ? 'No' : 'Leave';
        leaveBtn.onclick = () => {
            playSoundEffect(SFX.click);
            completeCurrentNode();
            switchState('world');
        };
    }

    // --- GAMBLE LOGIC ---
    function showGambleUI(level) {
        switchState('mystery_event');
        document.getElementById('mystery-event-title').textContent = "Double or Nothing";
        document.getElementById('mystery-event-desc').textContent = `Offer: Delete ${level} Tile${level > 1 ? 's' : ''} for free. Or risk it (50%) to delete ${level * 2}?`;
        document.getElementById('mystery-event-icon').textContent = '$'; // Gamble icon

        const acceptBtn = document.getElementById('mystery-action-button');
        const leaveBtn = document.getElementById('mystery-leave-button');

        // Button 1: Take Safe (Delete N)
        acceptBtn.textContent = `Take: Delete ${level}`;
        acceptBtn.onclick = () => {
            playSoundEffect(SFX.click);
            showDeleteTileModal(level);
        };

        // Button 2: Gamble (Risk)
        // We'll reuse the secondary button for "Risk" and add a third for "Leave"?
        // Or hijack Leave button as "Gamble".
        // Let's create a dedicated gamble button if not exists or repurpose.
        // For simplicity: Accept = Take Safe. Leave = Risk.
        // Wait, user might want to just LEAVE (do nothing).
        // Let's dynamically add a 3rd button or assume "Leave" means "Reject Deal" (do nothing).
        // But the event is "Gamble or Delete".
        // Let's use the layout:
        // 1. Accept (Take)
        // 2. Risk (Gamble)
        // 3. Leave (Cancel)

        leaveBtn.textContent = "Gamble (50%)";
        leaveBtn.style.backgroundColor = '#d35400';
        leaveBtn.onclick = () => {
            playSoundEffect(SFX.click);
            if (Math.random() < 0.5) {
                // Lost!
                playSoundEffect(SFX.boss);
                alert("You lost everything!");
                completeCurrentNode();
                switchState('world');
            } else {
                // Won!
                playSoundEffect(SFX.bigAnnounce);
                showGambleUI(level * 2);
            }
        };

        // Add a "No Thanks" text link or button?
        // Or just let "Leave" be the gamble and if they fail they leave.
        // If they want to do NOTHING (save deck), they can't?
        // User requirement: "User chooses between guaranteed Delete 1 or gamble".
        // Implicitly they can choose NEITHER?
        // Let's stick to the 2 main choices for now.
    }

    // Modified Delete Modal to accept count
    // We need to override showDeleteTileModal or create a new internal one
    // Since showDeleteTileModal is defined above, we can overwrite it or create a new one.
    // Javascript functions can be overwritten.

    // Let's create `showMultiDeleteModal` and use that.
    function showDeleteTileModal(count = 1) {
        // Hide gamble button if it exists
        const gambleBtn = document.getElementById('gamble-button');
        if (gambleBtn) gambleBtn.style.display = 'none';

        const modal = document.getElementById('delete-tile-modal');
        const display = document.getElementById('delete-deck-display');
        const title = document.querySelector('#delete-tile-modal h2');

        modal.classList.add('active');
        document.getElementById('result-screen').classList.remove('active'); // Hide result

        let remaining = count;

        const render = () => {
            title.textContent = `Delete ${remaining} Tile${remaining > 1 ? 's' : ''}`;
            display.innerHTML = '';
            deck.forEach((tileData, index) => {
                const tileEl = createTilePreview(tileData, 'deck-tile-preview-inner');
                tileEl.addEventListener('click', () => {
                    playSoundEffect(SFX.click);
                    // Remove from deck (splice changes in place, need to track original index carefully?
                    // Actually, re-rendering handles indices.)
                    deck.splice(index, 1);
                    remaining--;

                    if (remaining > 0 && deck.length > 0) {
                        render();
                    } else {
                        modal.classList.remove('active');
                        completeCurrentNode();
                        switchState('world');
                    }
                }, { once: true });
                display.appendChild(tileEl);
            });

            // Allow cancel if deck empty or optional? Setup says "User GETS to choose", usually implies mandatory if positive outcome.
            // But if deck runs out, we must exit.
            if (deck.length === 0) {
                modal.classList.remove('active');
                completeCurrentNode();
                switchState('world');
            }
        };
        render();
    }

    // --- DEV MENU ---
    function createDevMenu() {
        if (document.getElementById('dev-debug-menu')) return;
        const menu = document.createElement('div');
        menu.id = 'dev-debug-menu';
        menu.innerHTML = '<h3>Debug Mystery Event</h3>';

        MYSTERY_EVENTS.forEach(evt => {
            const btn = document.createElement('button');
            btn.textContent = `${evt.name} (${evt.weight}%)`;
            btn.onclick = () => {
                document.getElementById('dev-debug-menu').classList.remove('active');
                // Remove P listener hook from handleMysteryInteraction if active
                const resBtn = document.getElementById('result-button');
                if (resBtn && resBtn.onclick) resBtn.onclick = null; // crude cleanup

                triggerMysteryEvent(evt, currentNodeId ? { goal: 512, time: 60 } : { goal: 512, time: 60 });
            };
            menu.appendChild(btn);
        });

        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Cancel';
        closeBtn.style.backgroundColor = '#666';
        closeBtn.onclick = () => menu.classList.remove('active');
        menu.appendChild(closeBtn);

        document.body.appendChild(menu);
    }

    function toggleDevDebugMenu(node) {
        createDevMenu();
        const menu = document.getElementById('dev-debug-menu');
        menu.classList.toggle('active');
    }

    // Initialize
    createDevMenu();

    loadSettings();
    setupInput();
    switchState('start');
    function setupJokerSelection() {
        const container = document.getElementById('joker-list-container');
        const slotsContainer = document.getElementById('joker-slots-container');
        const startBtn = document.getElementById('start-joker-run-button');
        container.innerHTML = '';
        slotsContainer.innerHTML = '';

        let selectedJokers = [];

        // Render Slots
        const renderSlots = () => {
            slotsContainer.innerHTML = '';
            for (let i = 0; i < 2; i++) {
                const slot = document.createElement('div');
                slot.className = 'joker-slot';
                if (selectedJokers[i]) {
                    slot.classList.add('filled');
                    slot.textContent = selectedJokers[i].name;
                    slot.onclick = () => {
                        playSoundEffect(SFX.click);
                        selectedJokers.splice(i, 1);
                        renderSlots();
                        renderList();
                        updateStartBtn();
                    };
                } else {
                    slot.classList.add('empty');
                    slot.textContent = 'Empty';
                }
                slotsContainer.appendChild(slot);
            }
        };

        // Render List
        const renderList = () => {
            container.innerHTML = '';
            jokerManager.getAllJokers().forEach(joker => {
                const isSelected = selectedJokers.includes(joker);
                const card = document.createElement('div');
                card.className = `joker-card ${isSelected ? 'selected' : ''}`;
                card.innerHTML = `<h3>${joker.name}</h3><p>${joker.description}</p>`;
                card.onclick = () => {
                    playSoundEffect(SFX.click);
                    if (isSelected) {
                        selectedJokers = selectedJokers.filter(j => j !== joker);
                    } else {
                        if (selectedJokers.length < 2) {
                            selectedJokers.push(joker);
                        }
                    }
                    renderSlots();
                    renderList();
                    updateStartBtn();
                };
                container.appendChild(card);
            });
        };

        const updateStartBtn = () => {
            startBtn.disabled = false;
            if (selectedJokers.length > 0) {
                startBtn.textContent = `Start Dev Run (${selectedJokers.length}/2 Jokers)`;
            } else {
                startBtn.textContent = "Start Regular Run (No Jokers)";
            }
        };

        startBtn.onclick = () => {
            playSoundEffect(SFX.click);
            isDevMode = selectedJokers.length > 0;
            document.body.dataset.runMode = isDevMode ? 'dev' : 'regular';
            jokerManager.setActiveJokers(selectedJokers.map(j => j.id));
            jokerManager.activeJokers.forEach(joker => {
                jokerManager.onAcquire(joker, { deck });
            });
            switchState('world');
        };

        renderSlots();
        renderList();
        updateStartBtn();
    }
});
