import React, { useLayoutEffect, useRef, useState } from "react";
import type { TraitType } from "../utils/types/build";

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
      className="tool_tip text-xs"
      ref={ref}
      style={{
        position: "fixed",
        left: pos.left,
        top: pos.top,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <div className="tooltip_header">
        <img src={trait.icon} alt="" />
        <div>{trait.name}</div>
      </div>
      <div
        className="tooltip_description"
        dangerouslySetInnerHTML={{ __html: trait.description }}
      />
    </div>
  );
};

export default TraitTooltip;
