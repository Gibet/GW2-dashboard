import React, { useState } from "react";
import type { SkillType, TraitType } from "../utils/types/build";
import SkillTooltip from "./skillTooltip";

type SkillProps = {
  skill: SkillType;
};

//this component is used to display a trait
const Skill: React.FC<SkillProps> = ({ skill }) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setFocused(true);
    setPos({
      x: (e as React.MouseEvent).clientX,
      y: (e as React.MouseEvent).clientY,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setPos({
      x: (e as React.MouseEvent).clientX,
      y: (e as React.MouseEvent).clientY,
    });
  };

  const handleMouseExit = () => {
    setFocused(false);
  };

  return (
    <div
      className="skill"
      onMouseEnter={(e) => handleMouseEnter(e)}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseLeave={handleMouseExit}
    >
      <img className={`icon`} src={skill.icon} alt="" />
      {focused && <SkillTooltip skill={skill} x={pos.x} y={pos.y} />}
    </div>
  );
};

export default Skill;
