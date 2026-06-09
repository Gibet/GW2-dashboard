import React, { useEffect, useState } from 'react';
import { SecToHours } from '../helpers/utils';
import Gear from './Character/equipement';
import Build from './Character/build';
import Inventory from './Character/inventory';
import Backstory from './backstory';
import CharacterContext from '../context/character';
import { useContext } from 'react';

// This component is used to display the character sheet of a character
const CharacterSheet = ({}) => {

    const character = useContext(CharacterContext)
    const [ viewState, setViewState ] = useState(0)

    return <div id='character_sheet' className={`${character.race} ${character.profession}`} >
            {character &&
                <>
                    <div id='chara_header' >
                        <div><h2>{character.name}</h2></div>
                        <div id='chara_detail'>
                            <div id='chara_info'>
                                <div>Race: {character.race}</div>
                                <div>Profession: {character.profession}</div>
                                <div>Level: {character.level}</div>
                                <div>Playtime: {SecToHours(character.age)}</div>
                                <div>Created: {new Date(character.created).toLocaleString()}</div>
                            </div>
                            <div id='chara_menu'>
                                <li onClick={() => {setViewState(1)}}>Equipment</li>
                                <li onClick={() => {setViewState(2)}}>Build</li>
                                <li onClick={() => {setViewState(3)}}>Inventory</li>
                                <li onClick={() => {setViewState(4)}}>Backstory</li>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    {(viewState === 1) && (<Gear equipment = {character.equipment} level = {character.level} />)}
                    {(viewState === 2) && (<Build skills = {character.skills} traits = {character.specializations}/>)}
                    {(viewState === 3) && (<Inventory bags = {character.bags}/>)}
                    {(viewState === 4) && (<Backstory story = {character.backstory}/>)}
                </>
            }
        </div>
}

export default CharacterSheet