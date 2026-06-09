import React, { useState } from 'react';
import ItemTooltip from './Tooltip/tooltip';

// this component is used to display an item
const Item = ({item, details}) => {

    const [ focused,setFocused ] = useState(false)

    // this function is used to display the tooltip when the item is focused
    const handleFocus = () => {
        setFocused(true)
    }

    const handleBlur = () => {
        setFocused(false)
    }

    return  <>
                {item ? 
                    (<div className='item' title={item.name} tabIndex="0" onFocus={handleFocus} onBlur={handleBlur}>
                        <img className={item.rarity} src={item.icon} alt=""/>
                        { focused && <ItemTooltip 
                                item={item}
                                details={details}
                        />}
                        {details && <>
                            {details.count > 1 && <span className='count'>{details.count}</span>}
                        </>}
                    </div>)
                    :
                    (<div title='Empty' className='icon'></div>)
                }
            </>
}

export default Item