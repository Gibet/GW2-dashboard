import type { AttributeType, GearSetType, GearType } from "./types/character";
import {
  primaryStatsIncreasePatterns,
  primaryAttributes,
  healthIncreasePatterns,
  HighProfessions,
  LowProfessions,
  MediumProfessions,
} from "./variables";

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
export const getBaseStat = (level: number) => {
  // base value of a primary attribute at level 1
  let baseValue = 37;

  for (let i = 2; i <= level; i++) {
    // find the increase pattern that correspond to the current level eg: if level is 12, the increase pattern is the one with maxLevel = 20

    // skip every odd level after level 10
    if (i > 10 && i % 2 !== 0) {
      continue;
    }

    let increasePattern = primaryStatsIncreasePatterns.find((pattern) => {
      return i <= pattern.maxLevel;
    });

    if (increasePattern) baseValue += increasePattern.increase;
  }
  return baseValue;
};

export const getBaseHealth = (level: number, profession: string) => {
  let baseValue = 0;

  for (let i = 1; i <= level; i++) {
    let increasePattern = healthIncreasePatterns.find((pattern) => {
      return i <= pattern.maxLevel;
    });
    if (HighProfessions.has(profession) && increasePattern) baseValue += increasePattern?.high
    if (MediumProfessions.has(profession) && increasePattern) baseValue += increasePattern?.medium
    if (LowProfessions.has(profession) && increasePattern) baseValue += increasePattern?.low
  }
  return baseValue
};

export const parseAttributes = (
  gear: GearSetType,
  level: number,
  profession: string
): AttributeType => {
  let aquaticPieces = new Set<string>([
    "HelmAquatic",
    "WeaponAquaticA",
    "WeaponAquaticB",
  ]);
  let secondaryPieces = new Set<string>(["WeaponB1", "WeaponB2"]);

  // zero-init every attribute key we care about (using primaryAttributes from variables.ts)
  const attributesTotal = Object.keys(primaryAttributes).reduce((acc, k) => {
    acc[k as keyof AttributeType] = 0;
    return acc;
  }, {} as AttributeType);

  // set base values for the main primary stats
  attributesTotal.Power = getBaseStat(level);
  attributesTotal.Toughness = getBaseStat(level);
  attributesTotal.Vitality = getBaseStat(level);
  attributesTotal.Precision = getBaseStat(level);
  attributesTotal.Health = getBaseHealth(level, profession)
  attributesTotal.Armor = attributesTotal.Toughness;

  // parse the attributes of the gear set
  const gearEntries = Object.entries(gear) as [
    keyof GearSetType,
    GearType | undefined,
  ][];
  for (const [slot, item] of gearEntries) {
    if (!Object.prototype.hasOwnProperty.call(gear, slot)) continue;

    if (
      !aquaticPieces.has(slot) &&
      !secondaryPieces.has(slot) &&
      item?.item.details?.infix_upgrade
    ) {
      const infix_attributes = item?.item?.details?.infix_upgrade.attributes;
      const armor = item?.item?.details?.defense;

      if (armor) {
        attributesTotal.Armor += armor;
      }

      if (infix_attributes) {
        infix_attributes.forEach((attr) => {
          const key = attr.attribute as keyof AttributeType;
          attributesTotal[key] = (attributesTotal[key] ?? 0) + attr.modifier;
        });
      }
    }
  }
  attributesTotal.Health += (attributesTotal.Vitality * 10)
  attributesTotal.CritChance = 5 + ((attributesTotal.Precision - 1000 ) / 21)
  attributesTotal.Ferocity = 150 + ((attributesTotal.CritDamage || 0) / 15)
  attributesTotal.Concentration = (attributesTotal.BoonDuration || 0) / 15
  attributesTotal.Expertise = (attributesTotal.ConditionDuration || 0) / 15

  return attributesTotal;
};
