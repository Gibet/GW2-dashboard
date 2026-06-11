import React from 'react'
import { useTheme } from '../contexts/themeContext'
import { Link } from 'react-router';

const Header :React.FC = () => {

  const theme = useTheme();

  return (
    <header>
      <Link to={'/'}>Home</Link>
      <Link to={'/account'}>Account</Link>
      <Link to={'/characters'}>Characters</Link>
      <Link to={'/achievments'}>Achievments</Link>
    </header>
  )
}

export default Header