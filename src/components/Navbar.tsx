/* eslint-disable */
// All code here will not be checked by ESLint
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useStateContext } from '../context/Context';
import SidebarImg from '../assets/images/Sidebar'
/**
 * Interface for NavButton component props
 * @interface INavButtonProps
 */
interface INavButtonProps {
  title: string;
  customFunc: () => void;
  icon: React.ReactNode;
  color: string;
  dotColor: string;
}

/**
 * NavButton component
 * @param  title Title of the button
 * @param  customFunc Function to handle button click
 * @param  icon Icon element to display within the button
 * @param  color Color of the button
 * @param  dotColor Color of the dot within the button
 */
const NavButton: React.FC<INavButtonProps> = ({ title, customFunc, icon, color, dotColor }) => (
  <button
    type='button'
    onClick={() => customFunc()}
    style={{ color }}
    className="relative text-xl rounded-full p-3 hover:bg-light-gray"
  >
    {/* Dot indicator */}
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    />
    {/* Button icon */}
    {icon}
  </button>
);
/**
 * Navbar Component
 */
interface NavbarProps {
  isLoggedIn: boolean;
  onSidebarToggle: () => void; // Function to toggle sidebar
}
export const Navbar: React.FC<NavbarProps> = ({ isLoggedIn , onSidebarToggle }) => {

  /**!SECTION
   *  Destructuring necessary variables and functions from context
   */ 
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize, setThemeSettings } = useStateContext();
/**!SECTION
 *  Effect to handle screen resize
 */
    useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**!SECTION
   * Effect to handle menu activation based on screen size 
   */ 
  useEffect(() => {
    if (screenSize && screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  /**!SECTION
   * Function to toggle menu activation 
   */ 
  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  /**!SECTION
   *  Rendering the Navbar component 
   */
  return (
    <>
      <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
        {/* Menu button */}
        <NavButton title="Menu" customFunc={onSidebarToggle} color={currentColor} icon={<SidebarImg />} dotColor={''} />
        <div className="flex">
          {/*LogOut Button*/  }
          {isLoggedIn ? (
          <LogoutButton />
        ) : (
          <Link to="/Login">Login</Link>
        )}
        </div>
      </div>
    </>
  );
};
