import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import type { BagType } from "../utils/types/items";
import { getItems } from "../utils/services/items";
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

  const inventoryContent = useMemo(() => {
    if (!data) return null;

    const itemsById = new Map(data.map((item) => [item.id, item]))
  
    return bags.map((bag) => 
      bag.inventory.map((slot) => (slot ? itemsById.get(slot.id) ?? null : null))
    )
  }, [bags, data]);

  return <div className="p-4 flex flex-col items-center justify-center">
    {(isLoading) && <div>Loading inventory...</div>}
    {(isError) && <div className="text-red-500">{error?.message}</div>}
    {inventoryContent?.map((bag, index) => (
      <div key={index} className="bag flex flex-wrap mb-3">
        {bag.map((item, key) => (
          <div key={[item?.id, key].join('_')}>
            { item ? <Item {...item} /> : <div title='Empty' className='icon'></div>}
          </div>
        ))}
      </div>
    ))}

  </div>;
};

export default Inventory;
