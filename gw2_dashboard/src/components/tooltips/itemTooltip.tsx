import type React from "react";
import type { InventoryItemType, ItemType } from "../../utils/types/items";
import { useLayoutEffect, useRef, useState } from "react";

type ItemProps = {
  item: ItemType;
  slot?: InventoryItemType;
  x?: number;
  y?: number;
};

const ItemTooltip: React.FC<ItemProps> = ({ item, slot, x = 0, y = 0 }) => {
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
    <div className="tool_tip text-xs"
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
        <img src={item.icon} className={item.rarity} alt="" />
        <div>
          {item.details && (
            <>
              {slot?.count && slot?.count > 1 && (
                <span>{`${slot?.count} `}</span>
              )}
            </>
          )}
          {item.name}
        </div>
      </div>
      <hr />

      {item.details && (
        <div className="tooltip_stats">
          <div className="tooltip_stats_header">
            <div>Level: {item.level}</div>
            <div>
              {!!item.details.defense && (
                <span>{item.details.defense} armor</span>
              )}
              {item.details.min_power && (
                <span>
                  {item.details.min_power}-{item.details.max_power} damage
                </span>
              )}
            </div>
          </div>
          <div className="item_stats">
            {item?.details?.infix_upgrade &&
              item.details.infix_upgrade.attributes.map((attribute, index) => (
                <div key={index}>
                  {attribute.attribute}: {attribute.modifier}
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="tooltip_description">
        <div dangerouslySetInnerHTML={{ __html: item.description }} />
      </div>
      <br />

      <div className="tooltip_label">
        <div>
          <div>{item.rarity}</div> - <div>{item.type}</div>
        </div>
        <>
          {slot && (
            <>
              {slot.binding && (
                <div>
                  Bound to{" "}
                  {slot.bound_to ? <>{slot.bound_to}</> : <>{slot.binding}</>}
                </div>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default ItemTooltip;
