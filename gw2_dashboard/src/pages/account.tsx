import React, { useState } from 'react'
import { useAccount } from '../contexts/accountContext'
import AccountView from '../components/accountView'
import Characters from '../components/charactersView'
import { CharacterProvider } from '../contexts/characterContext'
import Bank from '../components/bank'

const tabs = ['Characters', 'Bank', 'Wallet', 'Guilds']

const Account = () => {
  const account = useAccount()
  const [content, setContent] = useState<string>('Characters')

  return (
    <div className='p-4'>
      { account && <div>
        <div>
          {account?.data && <AccountView {...account.data} />}
        </div>
        <div className='flex gap-2 justify-start mb-3'>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setContent(tab)}
            >{tab}</button>
          ))}
        </div>
        <hr />
        <div>
          { (content === 'Characters') &&  <CharacterProvider><Characters /></CharacterProvider>}
          { (content === 'Bank') &&  <Bank />}
          { (content === 'Wallet') &&  <></>}
          { (content === 'Guilds') &&  <></>}
        </div>
      </div>}
    </div>
  )
}

export default Account