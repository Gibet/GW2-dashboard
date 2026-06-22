import React, { useLayoutEffect, useRef, useState } from "react";
import type { SkillType } from "../../utils/types/build";

type SkillTooltipProps = {
  skill: SkillType;
  x?: number;
  y?: number;
};

//this component is used to display the tooltip when the trait is focused
const SkillTooltip: React.FC<SkillTooltipProps> = ({ skill, x = 0, y = 0 }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ left: x + 12, top: y + 12 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const { offsetWidth: w, offsetHeight: h } = el;
    let left = x + 12;
    let top = y + 12;
    if (left + w > window.innerWidth) left = window.innerWidth - w - 8;
    if (top + h > window.innerHeight) top = window.innerHeight - h - 8;
    if (left < 8) left = 8;
    if (top < 8) top = 8;
    setPos({ left, top });
  }, [x, y]);

  return (
    <div
      className="tool_tip text-xs text-left"
      ref={ref}
      style={{
        position: "fixed",
        left: pos.left,
        top: pos.top,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <div className="tooltip_header mb-2">
        <img src={skill.icon} className="skill" alt="" />
        <div>{skill.name}</div>
      </div>
      <div
        className="tooltip_description text-left"
        dangerouslySetInnerHTML={{ __html: skill.description }}
      />
      {skill.facts && <div className="flex flex-col items-start gap-1 mt-2">
        {skill.facts.map((fact) => (
          <div className="flex justify-start gap-1">
            <img src={fact.icon} className="w-5 h-5" alt="" />
            <span>{fact.description || fact.text}{fact.text && ":"}</span>
            {fact.target && <span>{fact.target}</span>}
            {fact.value && <span>{fact.value}{fact.type === "Recharge" ? "s" : ""}</span>}
            {fact.dmg_multiplier && <span>{fact.dmg_multiplier * 1000} -</span>}
            {fact.hit_count && <span>{fact.hit_count} hit{fact.hit_count > 1 ? "s" : ""}</span>}
            {fact.duration && <span>{fact.duration}s</span>}
            {fact.percent && <span>{fact.percent}%</span>}
            {fact.field_type && <span>{fact.field_type}</span>}
          </div>
        ))}
      </div>}
    </div>
  );
};

export default SkillTooltip;
