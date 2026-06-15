import React, { useState } from "react";
import type { TraitType } from "../utils/types/build";
import TraitTooltip from "./traitTooltip";

type TraitProps = {
  trait: TraitType | undefined;
  type: string | undefined;
};

//this component is used to display a trait
const Trait: React.FC<TraitProps> = ({ trait, type }) => {
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
    <>
      <div
        className={`trait ${type}`}
        onMouseEnter={(e) => handleMouseEnter(e)}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseLeave={handleMouseExit}
      >
        <img className="trait" src={trait?.icon} alt="" />
      </div>
      {(focused && trait) && <TraitTooltip trait={trait} x={pos.x} y={pos.y} />}
    </>
  );
};

export default Trait;
