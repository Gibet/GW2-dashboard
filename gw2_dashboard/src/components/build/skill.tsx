import React, { useState } from "react";
import type { SkillType, TraitType } from "../../utils/types/build";
import SkillTooltip from "../tooltips/skillTooltip";
import useTooltip from "../../hooks/useTooltip";

type SkillProps = {
  skill: SkillType;
};

//this component is used to display a trait
const Skill: React.FC<SkillProps> = ({ skill }) => {
  const tooltip = useTooltip()

  return (
    <div
      className="skill"
      onMouseEnter={(e) => tooltip.handleMouseEnter(e)}
      onMouseMove={(e) => tooltip.handleMouseMove(e)}
      onMouseLeave={tooltip.handleMouseExit}
    >
      <img className={`icon ${skill.slot}`} src={skill.icon} alt="" />
      {tooltip.focused && <SkillTooltip skill={skill} x={tooltip.pos.x} y={tooltip.pos.y} />}
    </div>
  );
};

export default Skill;
