//  primary attributes have a base value that grows with character level, rising every level until character level 10 and every even level thereafter. The base value starts at 37 for a level 1 character and increases to a total of 1000 at level 80.

// increase pattern of a primary attribute based on the character level


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
const increasePatterns = [
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

// get the base value of a primary attribute based on the character level
export function getBaseValue(level){

    // base value of a primary attribute at level 1
    let baseValue = 37

    for (let i = 2; i <= level; i++) {
        
        // find the increase pattern that correspond to the current level eg: if level is 12, the increase pattern is the one with maxLevel = 20
        
        // skip every odd level after level 10
        if (i > 10 && i % 2 !== 0) { continue; }

        let increasePattern = increasePatterns.find((pattern) => {
            return i <= pattern.maxLevel;
        });
        
        baseValue += increasePattern.increase;
    }
    return baseValue
}

