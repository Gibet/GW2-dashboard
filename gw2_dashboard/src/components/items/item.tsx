import type React from "react";
import type { InventoryItemType, ItemType } from "../../utils/types/items";
import ItemTooltip from "../tooltips/itemTooltip";
import useTooltip from "../../hooks/useTooltip";

type ItemProps = {
  item?: ItemType;
  slot?: InventoryItemType;
};

const Item: React.FC<ItemProps> = ({ item, slot }) => {
  const tooltip = useTooltip()

  if (!item) return <div title="Empty" className="icon"></div>;

  return (
    <div
      className="item PT_Serif"
      onMouseEnter={(e) => tooltip.handleMouseEnter(e)}
      onMouseMove={(e) => tooltip.handleMouseMove(e)}
      onMouseLeave={tooltip.handleMouseExit}
    >
      <img className={item.rarity} src={item.icon} alt="" />
      {tooltip.focused && <ItemTooltip item={item} slot={slot} x={tooltip.pos.x} y={tooltip.pos.y} />}

      {slot?.count && slot.count > 1 && (
        <span className="count">{slot.count}</span>
      )}
    </div>
  );
};

export default Item;
