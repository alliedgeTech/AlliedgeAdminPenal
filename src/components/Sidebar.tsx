import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { links } from './MockSidebar';
import { useStateContext } from '../context/Context';
import download from "../assets/images/download.png"
/**
 * Sidebar component
 */
export const Sidebar: React.FC = () => {
  /** Destructuring necessary variables and functions from context */
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  /** Function to close the sidebar on small screens when clicking outside the sidebar */
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  /** CSS classes for active and normal links */
  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 text-blue-500 border-l-4 border-blue-500 m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  /** Rendering the Sidebar component */
  return (
    <div className="absolute top-0 left-0 right-0 z-10 h-screen md:overflow-hidden overflow-auto pb-10 shadow-2xl">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            {/* Sidebar title */}
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <span className='px-5'><img src="https://res.cloudinary.com/dagd6qt6p/image/upload/v1725339448/alliedgelogo_nfcxzr.png" alt='download' className='w-25 me-5' /></span>
            </Link>
            {/* Close button */}
            <button
              type='button'
              onClick={() => setActiveMenu(!activeMenu)}
              style={{ color: currentColor }}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              cancel
            </button>
          </div>
          {/* Sidebar links */}
          <div className="mt-10">
            {links.map((item) => (
              <div key={item.title}>
                {/* Section title */}
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
              
                </p>
                {/* Render each link */}
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                    style={({ isActive }) => ({
                      borderLeftColor: isActive ? currentColor : 'transparent',
                      color: isActive ? currentColor : 'inherit',
                    })}
                  >
                    {/* Link icon and name */}
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
