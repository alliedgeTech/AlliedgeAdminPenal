
export interface State {
    chat: boolean;
    cart: boolean;
    userProfile: boolean;
    notification: boolean;
  
  }
export interface ContextProps {
    currentColor: string;
    currentMode: string;
    activeMenu: boolean;
    screenSize: number | undefined;
    setScreenSize: (size: number | undefined) => void;
    handleClick: (clicked: keyof State) => void;
    isClicked: State;
    initialState: State;
    setIsClicked: React.Dispatch<React.SetStateAction<State>>;
    setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentColor: React.Dispatch<React.SetStateAction<string>>;
    setCurrentMode: React.Dispatch<React.SetStateAction<string>>;
    setMode: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setColor: (color: string) => void;
    themeSettings: boolean;
    setThemeSettings: React.Dispatch<React.SetStateAction<boolean>>;
  }