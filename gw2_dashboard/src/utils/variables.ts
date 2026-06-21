export const STORAGE_KEY = "GW2API";

export const primaryAttributes = {
    Power: "Power",
    Precision: "Precision",
    Toughness: "Toughness",
    Vitality: "Vitality",
    CritDamage: "Ferocity",
    HealingPower: "Healing Power",
    Healing: "Healing Power",
    ConditionDamage: "Condition Damage",
    ConditionDuration: "Expertise",
    Concentration: "Concentration",
    BoonDuration: "Concentration",
}

// Stats increase per level for each range for stats calculation
export const increasePatterns = [
    { maxLevel: 10, increase: 7 },
    { maxLevel: 20, increase: 10 },
    { maxLevel: 24, increase: 14 },
    { maxLevel: 26, increase: 15 },
    { maxLevel: 30, increase: 16 },
    { maxLevel: 40, increase: 20 },
    { maxLevel: 44, increase: 24 },
    { maxLevel: 46, increase: 25 },
    { maxLevel: 50, increase: 26 },
    { maxLevel: 60, increase: 30 },
    { maxLevel: 64, increase: 34 },
    { maxLevel: 66, increase: 35 },
    { maxLevel: 70, increase: 36 },
    { maxLevel: 74, increase: 44 },
    { maxLevel: 76, increase: 45 },
    { maxLevel: 80, increase: 46 },
];