import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ContextProps, State } from './Context.props';

const StateContext = createContext<ContextProps | undefined>(undefined);

const initialState: State = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
  const [currentColor, setCurrentColor] = useState<string>('#0096FF');
  const [currentMode, setCurrentMode] = useState<string>('Light');
  const [themeSettings, setThemeSettings] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<State>(initialState);

  const setMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color: string) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked: keyof State) => setIsClicked({ ...initialState, [clicked]: true });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty array as dependency to run only once on mount

  return (
    <StateContext.Provider value={{ currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateContext must be used within a ContextProvider');
  }
  return context;
};
