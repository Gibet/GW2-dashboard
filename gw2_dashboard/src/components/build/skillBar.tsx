import type React from "react";
import type { SkillType } from "../../utils/types/build";
import Skill from "./skill";

type SkillBarProps = {
  skills: SkillType[]
}

const SkillBar: React.FC<SkillBarProps> = ({ skills }) => {
  return (
    <div className="flex gap-2">
      {skills.map((skill) => (
        <Skill skill={skill} />
      ))}
    </div>
  );
};

export default SkillBar;
