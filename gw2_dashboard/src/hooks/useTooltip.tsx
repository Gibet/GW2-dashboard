import React, { useState } from "react";

const useTooltip = () => {
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

  return { focused, pos, handleMouseEnter, handleMouseExit, handleMouseMove};
};

export default useTooltip
