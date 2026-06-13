import type React from "react";
import type { ItemType } from "../utils/types/items";


const Item: React.FC<ItemType> = (item: ItemType) => {
  return (
    <div className="w-12 h-12">
      <img src={item.icon} alt="" />
    </div>
  )
}

export default Item