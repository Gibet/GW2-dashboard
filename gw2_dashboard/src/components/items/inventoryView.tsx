import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import type { BagType, InventorySlotType } from "../../utils/types/items";
import { getItems } from "../../utils/services/items";
import Item from "./item";

type InventoryProps = {
  bags: BagType[];
};

const Inventory: React.FC<InventoryProps> = ({ bags }) => {
  const itemsIds = useMemo(() => 
    [...new Set(
      bags.flatMap((bag) =>
        bag.inventory.filter(Boolean).map((item) => item!.id),
      ),
    )],
  [bags]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["inventory", itemsIds.join(",")],
    queryFn: () => getItems(itemsIds),
    enabled: itemsIds.length > 0,
  });

  const inventoryContent = useMemo((): (InventorySlotType | null)[][] => {
    if (!data || !bags) return []; 
    
    return bags.map((bag) =>
      bag.inventory.map((slot) => {
        if (!slot) return null;
        const item = data.find((item) => item.id === slot.id);
        return item ? { info: slot, item } : null;
      }),
    );
        
  }, [bags, data]);

  return <div className="inventory flex flex-col items-center h-full">
    {(isLoading) && <div>Loading inventory...</div>}
    {(isError) && <div className="text-red-500">{error?.message}</div>}
    {inventoryContent?.map((bag, index) => (
      <div key={index} className="bag flex flex-wrap mb-3">
        {bag.map((slot, key) => (
          <div key={[slot?.item.id, key].join('_')}>
            { slot ? <Item item={slot.item} slot={slot.info}/> : <div title='Empty' className='icon'></div>}
          </div>
        ))}
      </div>
    ))}

  </div>;
};

export default Inventory;
