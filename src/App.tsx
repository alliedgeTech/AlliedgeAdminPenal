<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import "./App.css";
import DefaultLayout from "./layout/DefaultLayout";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import DashboardIndex from "./page/Dashboard";
import PropertyIndex from "./page/Property";
import AddProperty from "./page/Property/Components/AddProperty/AddProperty";
import AddGallery from "./page/Gallery/Components/AddGallery/AddGallery";
import AddLife from "./page/Life/Components/AddLife/AddLife";
import GalleryIndex from "./page/Gallery";
import ContactIndex from "./page/Contacts";
import LifeIndex from "./page/Life";
=======
/* eslint-disable */
// All code here will not be checked by ESLint
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Footer, Navbar, Sidebar } from './components';
import Login from './components/Login';
import { useStateContext } from './context/Context';

>>>>>>> b713862f4f2c281a0279c5e1925ebda64ea136a6

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

<<<<<<< HEAD
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
=======
  const handleSidebarToggle = () => {
    setActiveMenu(!activeMenu);
>>>>>>> b713862f4f2c281a0279c5e1925ebda64ea136a6
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
<<<<<<< HEAD
          />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <DefaultLayout>
                  <LifeIndex />
                </DefaultLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          
          <Route
            path="/addgallery"
            element={
              isLoggedIn ? (
                <DefaultLayout>
                  <AddGallery />
                </DefaultLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/gallery"
            element={
              isLoggedIn ? (
                <DefaultLayout>
                  <GalleryIndex />
                </DefaultLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
           <Route
            path="/addlife"
            element={
              isLoggedIn ? (
                <DefaultLayout>
                  <AddLife />
                </DefaultLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/life"
            element={
              isLoggedIn ? (
                <DefaultLayout>
                  <LifeIndex />
                </DefaultLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
           <Route
            path="/contactus"
            element={
              isLoggedIn ? (
                <DefaultLayout>
                  <ContactIndex />
                </DefaultLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
=======
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
>>>>>>> b713862f4f2c281a0279c5e1925ebda64ea136a6
      </BrowserRouter>
    </div>
  );
};

export default App;
