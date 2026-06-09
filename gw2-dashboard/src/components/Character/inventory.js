import React, { useEffect, useState } from 'react';
import Item from '../Generic/item';
import GW2 from '../../service/api';


// this component is used to display the inventory of a character 
const Inventory = ({bags}) => {

    const [ inventoryContent, setInventoryContent ] = useState(null)

    useEffect(()=> {
        !inventoryContent && loadInventoryInfo()
    })

    // this function is used to get the information of the items in the inventory of the character
    const loadInventoryInfo = async () => {

        setInventoryContent(null)
        
        let itemsIds = []
        let bagsContent = []
        
        // for each bag in the inventory of the character
        for(let i = 0; i < bags.length; i++){
            itemsIds[i] = []
            bagsContent[i] = []
            let bagIndex = 0

            // get the ids of the items in the bag
            bags[i].inventory.forEach(item => {
                    item && itemsIds[i].push(item.id)   
            })
            
            // if the bag is not empty
            if(itemsIds[i].length !== 0){
                const data = await GW2.fetch(`items?ids=${itemsIds[i].join(",")}`)
                
                // for each item in the bag 
                for (let x = 0 ; x < bags[i].inventory.length; x++){
                    let duplicate = false
                    
                    if(bags[i].inventory[x]){
                        // check if the item is a duplicate of an item already in the bag
                        for (let b = 0 ; b < x; b++){
                            
                            duplicate = false
                            if(bags[i].inventory[b]){
                                // if the item is a duplicate we replace it with the item already in the bag
                                if(bagsContent[i][b].id === bags[i].inventory[x].id){

                                    duplicate = true
                                    bagsContent[i][x] = bagsContent[i][b]
                                    break
                                }
                            }
                        }
                        // if the item is not a duplicate we add it to the bag
                        if(!duplicate){
                            bagsContent[i][x] = data[bagIndex]
                            bagIndex++
                        }
                    }
                    // if the item is null we add null to the bag
                    else{
                    bagsContent[i][x] = bags[i].inventory[x]
                    }
                }
            }
            // if the bag is empty we add null to the bag
            else{
                bagsContent[i] = bags[i].inventory
            }
        }
        setInventoryContent(bagsContent)
    }

    return  <div id='inventory'>
                <h3>Inventory</h3>
                {inventoryContent && <>
                    {inventoryContent.map((bag, index) => {
                        let x = 0
                        return <div
                            key={index}
                            className='bag'
                        >
                            {bag.map((item, key) => {
                                let info = bags[index].inventory[x]
                                x++
                                return <Item
                                    key = {item ? item.id : key}
                                    item = {item}
                                    details = {info}
                                />
                                })}
                        </div>
                        })
                    }
                </>}
            </div>
}

export default Inventory