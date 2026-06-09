import React, { useContext, useEffect, useMemo, useState } from 'react';
import CharacterMenu from '../components/characterMenu';
import CharacterSheet from '../components/characterSheet';
import Inventory from '../components/Character/inventory';
import Wallet from '../components/Account/wallet';
import GW2 from '../service/api';
import CharacterContext from '../context/character';


const AccountPage = () => {

    const [ key, setKey ] = useState(localStorage.api_key)
    const [ allCharacters , setAllCharacters ] = useState(null)
    const [ character , setCharacter ] = useState(null)
    const [ bank, setBank ] = useState([])
    const [ wallet, setWallet ] = useState()
    const [ viewState, setViewState ] = useState(0)
    const charContext = useContext(CharacterContext)

    useEffect(()=>{

        if(key && !allCharacters){

            loadAllCharacters()
            loadWallet()
            loadBank()
        }
    }, [])

    const chararcterData = useMemo(()=>{
        return character
    },[character])




    const loadAllCharacters = async () => {
        // query returning the list of characters of the account based on the api key provided
        const result = await GW2.account(`characters`)
        setAllCharacters(result)
    }
    const loadCharacter = async (name) => {
        setCharacter(null)

        // query returning the detail of a character based on the name provided
        const result = await GW2.account(`characters/${name}`)
        setViewState(1)    
        setCharacter(result)

    }
    const loadWallet = async () => {
        // query returning the wallet of the account based on the api key provided
        const result = await GW2.account(`account/wallet`)
        setWallet(result)
    }
    const loadBank = async () => {
        // query returning the bank of the account based on the api key provided
        const result = await GW2.account(`account/bank`)
        setBank(...bank, {inventory: result})
    }

    return (
        <div className='page-container'>
            {key &&
                <>
                    <div className="account-menu">
                        {allCharacters &&
                            <CharacterMenu
                                characters={allCharacters}
                                handleClick={loadCharacter}
                            />
                        }
                        <li onClick={() => setViewState(2)}>Bank</li>
                        <li onClick={() => setViewState(3)}>Wallet</li>
                        {/* Search bar */}
                        <div className="search-bar">
                            <input type="text" placeholder="Search..." />
                        </div>
                    </div>
                    {(viewState === 1 && character) && <CharacterContext.Provider value={chararcterData}>
                        <CharacterSheet character={character} />
                    </CharacterContext.Provider>}
                    {(viewState === 2 && bank) && <Inventory bags={[bank]} />}
                    {(viewState === 3 && wallet) && <Wallet content={wallet} />}
                </>
            }
        </div>
    )
}

export default AccountPage