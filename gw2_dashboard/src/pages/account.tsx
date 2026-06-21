import { useState } from 'react'
import { useAccount } from '../contexts/accountContext'
import AccountView from '../components/account/accountView'
import Characters from '../components/account/charactersView'
import { CharacterProvider } from '../contexts/characterContext'
import Bank from '../components/account/bank'
import Wallet from '../components/account/wallet'
import CustomButton from '../components/generic/button'

const tabs = ['Characters', 'Bank', 'Wallet']

const Account = () => {
  const account = useAccount()
  const [content, setContent] = useState<string>('Characters')

  return (
    <div className='page_content flex-col px-4'>
      { account && <>
        <div>
          {account?.data && <AccountView {...account.data} />}
        </div>
        <div className='flex gap-2 text-sm justify-start mb-3'>
          {tabs.map((tab) => (
            <CustomButton
              key={tab}
              active={tab === content}
              className='flex gap-1'
              onClick={() => setContent(tab)}
            >
              <span className={`sprite-${tab.toLocaleLowerCase()}`}></span>  
              <span>{tab}</span>
            </CustomButton>
          ))}
        </div>
        <hr />
        <div className='h-full overflow-hidden'>
          { (content === 'Characters') &&  <CharacterProvider><Characters /></CharacterProvider>}
          { (content === 'Bank') &&  <Bank />}
          { (content === 'Wallet') &&  <Wallet />}
        </div>
      </>}
    </div>
  )
}

export default Account