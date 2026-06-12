import React from 'react'
import { useTheme } from '../contexts/themeContext'
import { Link } from 'react-router';

const Header :React.FC = () => {

  const theme = useTheme();

  return (
    <header>
      <nav className='flex justify-between px-4'>
        <button onClick={theme.toggleTheme}>
          {theme.theme}
        </button>
        <div className='flex gap-2'>
          <Link to={'/'}>Home</Link>
          <Link to={'/account'}>Account</Link>
          <Link to={'/achievments'}>Achievments</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header