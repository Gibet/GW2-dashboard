import type React from "react";
import type { CurrencyType } from "../../utils/types/account";
import useTooltip from "../../hooks/useTooltip";
import Tooltip from "../tooltips/tooltip";

type CurrencyProps = {
  currency: CurrencyType;
  amount: React.ReactNode;
};

const Currency: React.FC<CurrencyProps> = ({ currency, amount }) => {
  const tooltip = useTooltip();

  return (
    <div
      data-hover={tooltip.focused}
      onMouseEnter={(e) => tooltip.handleMouseEnter(e)}
      onMouseMove={(e) => tooltip.handleMouseMove(e)}
      onMouseLeave={tooltip.handleMouseExit}
      key={currency.id}
      className="w-full flex justify-between items-center p-1 cursor-default"
    >
      <span>{currency.name}</span>
      <div className="flex gap-3">
        <span className="text-xs flex justify-center">{amount}</span>
        <img src={currency.icon} alt="" className="w-6 h-6" />
      </div>
      {tooltip.focused && (
        <Tooltip
          name={currency.name}
          description={currency.description}
          x={tooltip.pos.x}
          y={tooltip.pos.y}
        />
      )}
    </div>
  );
};

export default Currency;
