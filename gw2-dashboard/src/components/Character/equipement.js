import React, { useEffect, useState } from 'react';
import Item from '../Generic/item';
import { parseAttribute, parseInfusions } from '../../helpers/utils';
import GW2 from '../../service/api';
import { primaryAttributes } from '../../helpers/variables';


// this component is used to display the equipment of a character
const Gear = ({equipment, level}) => {

    const [ gearInfo, setGearInfo ] = useState(null)
    const [ attributes, setAttributes ] = useState(null)

    useEffect(()=>{
        !gearInfo && load_gear_info()
    }, [gearInfo, attributes])

    useEffect(()=>{
        parseInfusions(equipment, attributes)
    }, [])

    const load_gear_info = async () => {

        setGearInfo(null)
        
        let ids = []
        let info = {}

        // put the ids in a list
        equipment.forEach(gear => {
                ids.push(gear.id)
        });
        
        // query returning the items of a character based on the ids provided
        let data = await GW2.fetch(`items?ids=${ids.join(",")}`)
        // for each item in the equipment we add it to the info list with the slot of the item as key
        for(let i = 0; i < ids.length; i++){
            
            if(equipment[i].stats){
                let stats = []
                // convert equipment[i].stats.attributes to an array
                for(let key in equipment[i].stats.attributes){
                    stats.push({attribute: key, modifier: equipment[i].stats.attributes[key]})
                }
                // add the stats to the item
                data[i].details = {
                    ...data[i].details,
                    infix_upgrade: {
                        attributes: stats
                    }
                }

            }
            info[equipment[i].slot] = data[i]
        }
        setGearInfo(info)

        // set the attributes of the character based on the equipment
        !attributes && setAttributes(parseAttribute(equipment, info, level))
    }
    
    return  <>{gearInfo &&
            <div id="gear">
                <h2>Gear</h2>
                <div id="gear_view">
                    <div id="main_gear">
                        <div id="armor_piece">
                            Armor
                            <Item item = {gearInfo.Helm}/>
                            <Item item = {gearInfo.Shoulders}/>
                            <Item item = {gearInfo.Coat}/>
                            <Item item = {gearInfo.Gloves}/>
                            <Item item = {gearInfo.Leggings}/>
                            <Item item = {gearInfo.Boots}/>
                        </div>
                        <div id="land_weapons_set">
                            Weapons
                            <div id="set_1">
                                set 1
                                <Item item = {gearInfo.WeaponA1}/>
                                <Item item = {gearInfo.WeaponA2}/>
                            </div>
                            <div id="set_2">
                                set 2
                                <Item item = {gearInfo.WeaponB1}/>
                                <Item item = {gearInfo.WeaponB2}/>
                            </div>
                        </div>
                    </div>
                    <div id="secondary_gear">
                        {attributes && <div id="stat_view">
                            <h3>Stats</h3>
                            {Object.keys(attributes).map((attribute, index) => {
                                return <div key={index}>
                                    {primaryAttributes[attribute]}: {attributes[attribute]}
                                </div>
                            })}
                        </div>}
                        <div id="trinkets">
                            Trinkets
                            <div>
                            {gearInfo.Backpack && (<Item item = {gearInfo.Backpack}/>)}
                                <div id="accesory">
                                    <Item item = {gearInfo.Accessory1}/>
                                    <Item item = {gearInfo.Accessory2}/>
                                </div>
                            </div>
                            <div>
                                <Item item = {gearInfo.Amulet}/>
                                <div id="rings">
                                    <Item item = {gearInfo.Ring1}/>
                                    <Item item = {gearInfo.Ring2}/>
                                </div>
                            </div>
                            Underwater
                            <div id="underwater_gear">
                                <div>
                                    <Item item = {gearInfo.HelmAquatic}/>
                                    <Item item = {gearInfo.WeaponAquaticA}/>
                                    <Item item = {gearInfo.WeaponAquaticB}/>
                                </div>
                            </div>
                            Gathering tools
                            <div id="gathering_tools">
                                <div>
                                    <Item item = {gearInfo.Sickle}/>
                                    <Item item = {gearInfo.Axe}/>
                                    <Item item = {gearInfo.Pick}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }</>
}

export default Gear