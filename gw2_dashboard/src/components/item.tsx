import type React from "react";
import type { ItemType } from "../utils/types/items";


const Item: React.FC<ItemType> = (item: ItemType) => {
  return (
    <div className="item">
      <img src={item.icon} alt="" />
    </div>
  )
}

export default Item