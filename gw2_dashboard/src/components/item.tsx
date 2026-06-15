import type React from "react";
import type { InventoryItemType, ItemType } from "../utils/types/items";


type ItemProps = {
  item?: ItemType
  slot?: InventoryItemType
}

const Item: React.FC<ItemProps> = ({item, slot}) => {

  if (!item) return (<div title='Empty' className='icon'></div>)

  return (
    <div className='item' title={item.name} >
        <img className={item.rarity} src={item.icon} alt=""/>
        {/* { focused && <ItemTooltip 
                item={item}
                details={details}
        />} */}

        {(slot?.count && slot.count > 1) && <span className='count'>{slot.count}</span>}
    </div>
  )
}

export default Item