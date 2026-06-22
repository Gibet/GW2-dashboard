import type React from "react";
import type { AttributeType } from "../../utils/types/character";

const columnA = ["Power", "Toughness", "Vitality", "Precision", "Ferocity", "ConditionDamage", "Expertise", "Concentration", "AgonyResistance"]
const columnB = ["Armor", "Health", "CritChance", "CritDamage", "HealingPower", "ConditionDuration", "BoonDuration"]

type StatPanelProps = {
  stats?: AttributeType
}


const StatPanel: React.FC<StatPanelProps> = ({ stats = {} }) => {
  return (
    <div className="grid grid-cols-2 text-xs gap-6 p-4 stat-panel">
      <div className="col-span-1 grid grid-rows-9">
        {columnA.map ((attribute) => <span className="flex items-end gap-2">
          <span className={`sprite-${attribute}`} />
          <span>{(stats[attribute as keyof AttributeType] || 0).toLocaleString()}</span>
        </span>)}
      </div>
      <div className="col-span-1 grid grid-rows-9">
        <span></span>
        {columnB.map ((attribute) => <span className="flex items-end gap-2">
          <span className={`sprite-${attribute}`} /> 
          <span>{(stats[attribute as keyof AttributeType] || 0).toLocaleString()}</span>
        </span>)}
      </div>
    </div>
  );
};

export default StatPanel;
