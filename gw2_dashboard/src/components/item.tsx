import type React from "react";
import type { InventoryItemType, ItemType } from "../utils/types/items";
import { useState } from "react";
import ItemTooltip from "./itemTooltip";

type ItemProps = {
  item?: ItemType;
  slot?: InventoryItemType;
};

const Item: React.FC<ItemProps> = ({ item, slot }) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
  }

  const handleMouseExit = () => {
    setFocused(false);
  };

  if (!item) return <div title="Empty" className="icon"></div>;

  return (
    <div
      className="item"
      onMouseEnter={(e) => handleMouseEnter(e)}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseLeave={handleMouseExit}
    >
      <img className={item.rarity} src={item.icon} alt="" />
      {focused && <ItemTooltip item={item} slot={slot} x={pos.x} y={pos.y} />}

      {slot?.count && slot.count > 1 && (
        <span className="count">{slot.count}</span>
      )}
    </div>
  );
};

export default Item;
