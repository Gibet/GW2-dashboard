import React from "react";
import { useTheme } from "../../contexts/themeContext";
import { Link, useLocation } from "react-router";
import { useAccount } from "../../contexts/accountContext";
import { Moon, Sun } from "lucide-react";

const Header: React.FC = () => {
  const theme = useTheme();
  const account = useAccount();
  const { pathname } = useLocation()

  return (
    <header className="flex items-center w-full Cagliostro">
      <nav className="flex justify-between items-center px-4 w-full h-full text-sm">
        <div className="flex">
          <button onClick={theme.toggleTheme} aria-label="Toggle theme">
            { theme.theme === 'light' ? 
              <Sun size={20} strokeWidth={1} className='cursor-pointer' /> :
              <Moon size={20} strokeWidth={1} className='cursor-pointer' />
            }
          </button>
        </div>
        {account?.isDemo && <span className="Lato">Using Demo Account</span>}
        <div className="flex gap-2">
          <Link data-active={pathname === "/"} to={"/"} className="flex gap-1">
            <span className="sprite-home"></span>
            <span>Home</span>
          </Link>
          {account?.permissions?.includes("account") && (
            <Link data-active={pathname === "/account"} to={"/account"} className="flex gap-1">
              <span className="sprite-account"></span>
              <span>Account</span>
            </Link>
          )}
          <Link data-active={pathname === "/achievements"} to={"/achievements"} className="flex gap-1">
            <span className="sprite-achievement-big"></span>
            <span>Achievements</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
