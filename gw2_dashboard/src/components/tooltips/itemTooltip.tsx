import type React from "react";
import type { InventoryItemType, ItemType } from "../../utils/types/items";
import { useLayoutEffect, useRef, useState } from "react";
import { convertGoldFormat } from "../../utils/functions";
import { primaryAttributes } from "../../utils/variables";

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
    <div
      className="tool_tip text-xs gap-2"
      ref={ref}
      style={{
        position: "fixed",
        left: pos.left,
        top: pos.top,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <div className={`tooltip_header gap-2 text-left tooltip-${item.rarity}`}>
        <div className="item">
          <img src={item.icon} className={item.rarity} alt="" />
        </div>
        <div className={`text-${item.rarity}`}>
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

      {item.details && (
        <div className="tooltip_stats flex flex-col gap-2 text-left">
          <div className="tooltip_stats_header flex justify-between gap-2">
            <div className="">
              {!!item.details.defense && (
                <span>Defense: <span className="stats">{item.details.defense}</span></span>
              )}
              {item.details.min_power && (
                <span className="text-nowrap">
                  {item.details.min_power}-{item.details.max_power}{" "}
                  {item.details.damage_type} damage
                </span>
              )}
            </div>
          </div>
          <div className="item_stats">
            {item?.details?.infix_upgrade?.attributes.map(
              (attribute, index) => (
                <div key={index} className="stats">
                  {primaryAttributes[attribute.attribute]}: {attribute.modifier}
                </div>
              ),
            )}
          </div>
        </div>
      )}
      <div className="flex flex-col justify-start items-start w-full text left">
        {["Armor", "Weapon", "Trinket"].includes(item.type) && <span className={`text-${item.rarity}`}>{item.rarity}</span>}
        {item.details?.weight_class && <span>{item.details.weight_class}</span>}
        <span>
          <span className="text-nowrap">
            {item.details?.type}{item.details?.type && <>&nbsp;</>}{item.type}
          </span>
        </span>
          {!!item.level && <span>Required level: {item.level}</span>}
        <div className="flex justify-start gap-1 text-left">
          {item.details?.icon && <img className="max-w-5 max-h-5" src={item.details?.icon} alt="" />}
          <span
            className=""
            dangerouslySetInnerHTML={{
              __html: item.details?.description || item.description,
            }}
          />
        </div>
      </div>
      <br />

      {!!item.vendor_value && (
        <div className="flex items-center gap-1">
          <span>Value: </span>
          <span>
            {convertGoldFormat(item.vendor_value * (slot?.count || 1))}
          </span>
        </div>
      )}
      <div className="text-left">
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
      </div>
    </div>
  );
};

export default ItemTooltip;
