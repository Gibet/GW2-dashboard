import React from 'react'
import { useTheme } from '../../contexts/themeContext'
import { Link } from 'react-router';
import { useAccount } from '../../contexts/accountContext';

const Header :React.FC = () => {

  const theme = useTheme();
  const account = useAccount()

  return (
    <header>
      <nav className='flex justify-between px-4'>
        <button onClick={theme.toggleTheme}>
          {theme.theme}
        </button>
        <div className='flex gap-2'>
          <Link to={'/'}>Home</Link>
          {account?.data && <Link to={'/account'}>Account</Link>}
          <Link to={'/achievments'}>Achievments</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header