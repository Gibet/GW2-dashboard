import type { GearSetType } from "./types/character";
import { increasePatterns } from "./variables";

export function SecToHours(value: number) {
  let hours = Math.floor(value / 3600);
  let minutes = Math.floor((value % 3600) / 60);
  let seconds = value - hours * 3600 - minutes * 60;

  let format = `${hours.toLocaleString()} hours ${minutes} minutes ${seconds} seconds`;

  return format;
}

export const convertGoldFormat = (value: number) => {
  let gold = Math.floor(value / 10000);
  let silver = Math.floor((value % 10000) / 100);
  let copper = value - gold * 10000 - silver * 100;

  return (
    <span className="flex items-center gap-1">
      {!!gold && (
        <span className="flex items-center">
          <span>{gold}</span>
          <span className="sprite-gold"></span>
        </span>
      )}
      {!!silver && (
        <span className="flex items-center">
          <span>{silver}</span>
          <span className="sprite-silver"></span>
        </span>
      )}
      {!!copper && (
        <span className="flex items-center">
          <span>{copper}</span>
          <span className="sprite-copper"></span>
        </span>
      )}
    </span>
  );
};

export const chunk = <T,>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

// get the base value of a primary attribute based on the character level
export const getBaseValue = (level: number) => {
  // base value of a primary attribute at level 1
  let baseValue = 37;

  for (let i = 2; i <= level; i++) {
    // find the increase pattern that correspond to the current level eg: if level is 12, the increase pattern is the one with maxLevel = 20

    // skip every odd level after level 10
    if (i > 10 && i % 2 !== 0) {
      continue;
    }

    let increasePattern = increasePatterns.find((pattern) => {
      return i <= pattern.maxLevel;
    });

    if (increasePattern) baseValue += increasePattern.increase;
  }
  return baseValue;
};

export const parseAttributes = (gear: GearSetType, level: number) => {
  let equipment = {};
  let aquaticPieces = ["HelmAquatic", "WeaponAquaticA", "WeaponAquaticB"];
  let secondaryPieces = ["WeaponB1", "WeaponB2"];

  let attributes = {
    Power: getBaseValue(level),
    Toughness: getBaseValue(level),
    Vitality: getBaseValue(level),
    Precision: getBaseValue(level),
    CritDamage: 0,
    ConditionDamage: 0,
    ConditionDuration: 0,
    Concentration: 0,
    HealingPower: 0,
  };
  // parse the attributes of the gear set
  /* items.forEach(item => {
        if (item.stats?.attributes) {
            
            Object.keys(item.stats.attributes).forEach(key => {
                equipment[item.slot] = item.stats.attributes;
            })
        }
        else if(info[item.slot]){
            if(info[item.slot].details?.infix_upgrade?.attributes){
                let piece = {} 
                info[item.slot].details.infix_upgrade.attributes.forEach(attribute => {
                    piece[attribute.attribute] = attribute.modifier
                })
                equipment[item.slot] = piece
            }
        }
    });
    
    Object.keys(equipment).forEach(key => {
        if(!aquaticPieces.includes(key) && !secondaryPieces.includes(key)){
            Object.keys(equipment[key]).forEach(attribute => {
                attributes[attribute] += equipment[key][attribute]
            })
        }
    }) */

  return attributes;
};
