import React, { useState } from "react";
import type { TraitType } from "../../utils/types/build";
import TraitTooltip from "../tooltips/traitTooltip";
import useTooltip from "../../hooks/useTooltip";

type TraitProps = {
  trait: TraitType | undefined;
  type: string | undefined;
};

//this component is used to display a trait
const Trait: React.FC<TraitProps> = ({ trait, type }) => {
  const tooltip = useTooltip()

  return (
    <>
      <div
        className={`trait ${type}`}
        onMouseEnter={(e) => tooltip.handleMouseEnter(e)}
        onMouseMove={(e) => tooltip.handleMouseMove(e)}
        onMouseLeave={tooltip.handleMouseExit}
      >
        <img className="trait" src={trait?.icon} alt="" />
      </div>
      {(tooltip.focused && trait) && <TraitTooltip trait={trait} x={tooltip.pos.x} y={tooltip.pos.y} />}
    </>
  );
};

export default Trait;
