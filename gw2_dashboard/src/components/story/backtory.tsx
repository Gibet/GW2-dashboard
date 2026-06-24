import type React from "react";
import useTooltip from "../../hooks/useTooltip";
import Tooltip from "../tooltips/tooltip";
import type { BackstoryAnswerType } from "../../utils/types/story";

type BackstoryProps = {
  answer: BackstoryAnswerType;
};

const Backstory: React.FC<BackstoryProps> = ({ answer }) => {
  const tooltip = useTooltip();

  return (
    <div
      data-hover={tooltip.focused}
      onMouseEnter={(e) => tooltip.handleMouseEnter(e)}
      onMouseMove={(e) => tooltip.handleMouseMove(e)}
      onMouseLeave={tooltip.handleMouseExit}
      key={answer.id}
      className="w-full pl-2 cursor-default text-sm"
    >
      <span
        dangerouslySetInnerHTML={{
          __html: answer.journal.replace(/<br>/, ""),
        }}
      />
      {tooltip.focused && (
        <Tooltip
          name={answer.title}
          description={answer.description}
          x={tooltip.pos.x}
          y={tooltip.pos.y}
        />
      )}
    </div>
  );
};

export default Backstory;
