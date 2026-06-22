import type React from "react";
import type { AttributeType } from "../../utils/types/character";
import { primaryAttributes } from "../../utils/variables";

const columnA = [
  "Power",
  "Toughness",
  "Vitality",
  "Precision",
  "CritDamage",
  "ConditionDamage",
  "ConditionDuration",
  "BoonDuration",
  "AgonyResistance",
];
const columnB = [
  "Armor",
  "Health",
  "CritChance",
  "Ferocity",
  "HealingPower",
  "Expertise",
  "Concentration",
];
const percentStats = ["CritChance", "Ferocity", "Expertise", "Concentration"];

type StatPanelProps = {
  stats?: AttributeType;
};

const StatPanel: React.FC<StatPanelProps> = ({ stats = {} }) => {
  return (
    <div className="grid grid-cols-2 text-xs gap-6 p-4 stat-panel">
      <div className="col-span-1 grid grid-rows-9">
        {columnA.map((attribute) => (
          <span key={attribute} className="flex items-end gap-2">
            <span
              className={`sprite-${attribute}`}
              title={primaryAttributes[attribute]}
            />
            <span>
              {(stats[attribute as keyof AttributeType] || 0).toLocaleString()}
            </span>
          </span>
        ))}
      </div>
      <div className="col-span-1 grid grid-rows-9">
        <span></span>
        {columnB.map((attribute) => (
          <span key={attribute} className="flex items-end gap-2">
            <span
              className={`sprite-${attribute}`}
              title={primaryAttributes[attribute]}
            />
            <span>
              {percentStats.includes(attribute)
                ? `${(stats[attribute as keyof AttributeType] || 0).toFixed(2)}%`
                : (
                    Math.ceil(stats[attribute as keyof AttributeType] || 0)
                  ).toLocaleString()}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default StatPanel;
