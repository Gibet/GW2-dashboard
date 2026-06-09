import GW2 from "../service/api";
import { getBaseValue } from "./variables";

export function SecToHours(value){

    let hours = Math.floor(value/3600);
    let minutes = Math.floor(value%3600 / 60);
    let seconds = value - (hours * 3600) - (minutes * 60);

    let format = `${hours}h ${minutes}min ${seconds}sec`;

    return format;
}

// parse the attributes of a gear set to display them in the gear set component without counting the attributes of aquatics weapons and armor and secondary weapons set
export function parseAttribute(gear, info, level) {

    let equipment = {}
    let aquaticPieces = ['HelmAquatic', 'WeaponAquaticA', 'WeaponAquaticB']
    let secondaryPieces = ['WeaponB1', 'WeaponB2']

    let attributes = {
        'Power': getBaseValue(level),
        'Toughness':getBaseValue(level),
        'Vitality':getBaseValue(level),
        'Precision':getBaseValue(level),
        'CritDamage':0,
        'ConditionDamage':0,
        'ConditionDuration':0,
        'Concentration':0,
        'HealingPower':0
    }
    // parse the attributes of the gear set 
    gear.forEach(item => {
        if (item.stats?.attributes) {
            
            Object.keys(item.stats.attributes).forEach(key => {
                equipment[item.slot] = item.stats.attributes;
            })
        }
        else if(info[item.slot]){
            if(info[item.slot].details?.infix_upgrade?.attributes){
                let piece = {} 
                info[item.slot].details.infix_upgrade.attributes.forEach(attribute => {
                    piece[attribute.attribute] = attribute.modifier
                })
                equipment[item.slot] = piece
            }
        }
    });
    
    Object.keys(equipment).forEach(key => {
        if(!aquaticPieces.includes(key) && !secondaryPieces.includes(key)){
            Object.keys(equipment[key]).forEach(attribute => {
                attributes[attribute] += equipment[key][attribute]
            })
        }
    })
    
    return attributes;
}

export function parseInfusions(equipment, attributes){

    let infusionAttributes = {
        'Power': 0,
        'Toughness':0,
        'Vitality':0,
        'Precision':0,
        'CritDamage':0,
        'ConditionDamage':0,
        'ConditionDuration':0,
        'Concentration':0,
        'HealingPower':0,
        'AgonyResistance':0
    }

    equipment.forEach(async (gear) => {
        let infusionsIds = []

        if (gear.infusions){
            gear.infusions.forEach(infusion => {
                // if the infusion is not in the list we add it
                if(!infusionsIds.includes(infusion.id)){
                    infusionsIds.push(infusion.id)
                }
            })
        }
        console.log(infusionsIds)
        if (infusionsIds.length > 0){
            let infusions = await GW2.fetch(`items?ids=${infusionsIds.join(",")}`)
            console.log(infusions)
        }
        
    })

    return infusionAttributes
}