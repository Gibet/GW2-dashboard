import type React from "react";
import type { SkillType } from "../utils/types/build";

type SkillBarProps = {
  skills: SkillType[]
}

const SkillBar: React.FC<SkillBarProps> = ({ skills }) => {
  return (
    <div className="flex gap-2">
      {skills.map((skill) => (
        <div key={skill.name} className="w-12 h-12">
          <img src={skill.icon} alt={skill.name} />
        </div>
      ))}
    </div>
  );
};

export default SkillBar;
