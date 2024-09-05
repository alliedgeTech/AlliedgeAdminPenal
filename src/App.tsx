/* eslint-disable */
// All code here will not be checked by ESLint
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Footer, Navbar, Sidebar } from './components';
import Login from './components/Login';
import { useStateContext } from './context/Context';


import GalleryIndex from './pages/Gallery';
import LifeIndex from './pages/Life';
import ContactIndex from './pages/Contact';


const App: React.FC = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, setActiveMenu } = useStateContext();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('isLoggedIn') === 'true');

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleSidebarToggle = () => {
    setActiveMenu(!activeMenu);
  };

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className={`flex relative dark:bg-main-dark-bg`}>
          {isLoggedIn && (
            <div className={`w-72 fixed dark:bg-secondary-dark-bg bg-main-bg transition-all duration-300 ${activeMenu ? 'block' : 'hidden'}`}>
              <Sidebar />
            </div>
          )}

          <div
            className={
              activeMenu 
                ? `dark:bg-main-dark-bg bg-main-bg min-h-screen ${ isLoggedIn ?'md:ml-72' : ''} w-full transition-all duration-300`
                : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2 transition-all duration-300'
            }
          >
            <div className={`fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full`}>
              {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} onSidebarToggle={handleSidebarToggle} />}
            </div>
            <div>
              <Routes>
                {!isLoggedIn ? (
                <Route path="/" element={<Login onLogin={handleLogin} />} />
                ): (
                  <>
              
                <Route path="/Life" element={<LifeIndex />} />
                <Route path="/Gallery" element={<GalleryIndex />} />
                <Route path="/Contact" element={<ContactIndex />} />
            
                </>
                )}
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
