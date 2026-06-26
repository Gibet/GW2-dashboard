import React, { useLayoutEffect, useRef, useState } from "react";
import type { TraitType } from "../../utils/types/build";
import SkillTooltip from "./skillTooltip";
import { primaryAttributes } from "../../utils/variables";

type TraitTooltipProps = {
  trait: TraitType;
  x?: number;
  y?: number;
};

//this component is used to display the tooltip when the trait is focused
const TraitTooltip: React.FC<TraitTooltipProps> = ({ trait, x = 0, y = 0 }) => {
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
      className="tool_tip text-xs text-left gap-2"
      ref={ref}
      style={{
        position: "fixed",
        left: pos.left,
        top: pos.top,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <div className="tooltip_header flex gap-2">
        <div className={`trait ${trait.slot.toLowerCase()}`}>
          <img src={trait.icon} alt="" />
        </div>
        <div>{trait.name}</div>
      </div>
      <div
        className="tooltip_description text-left"
        dangerouslySetInnerHTML={{ __html: trait.description }}
      />
      {trait.facts && (
        <div className="flex flex-col items-start gap-1">
          {trait.facts.map((fact) => (
            <div key={fact.text} className="flex gap-1 facts">
              <span className="min-h-5 min-w-5">
                <span className="relative max-w-5 max-h-5">
                  <img src={fact.icon} className="w-5 h-5" alt="" />
                  {(fact.apply_count && fact.apply_count > 1) && (
                    <span className="absolute -bottom-1 text-white right-0">
                      {fact.apply_count}
                    </span>
                  )}
                </span>
              </span>
              {(fact.description || fact.text) && <span>{fact.description || fact.text}</span>}
              {fact.target && <span>{primaryAttributes[fact.target] || fact.target}</span>}
              {fact.value && (
                <span>
                  {fact.value}
                  {fact.type === "Recharge" ? "s" : ""}
                </span>
              )}
              {fact.dmg_multiplier && (
                <span>{fact.dmg_multiplier * 1000} -</span>
              )}
              {fact.hit_count && (
                <span>
                  {fact.hit_count} hit{fact.hit_count > 1 ? "s" : ""}
                </span>
              )}
              {!!fact.duration && <span>{fact.duration}s</span>}
              {fact.percent && <span>{fact.percent}%</span>}
              {fact.field_type && <span>{fact.field_type}</span>}
            </div>
          ))}
        </div>
      )}
      {trait?.skills?.map((skill, index) => (
        <SkillTooltip key={skill.name} skill={skill} x={index * 300} />
      ))}
    </div>
  );
};

export default TraitTooltip;
