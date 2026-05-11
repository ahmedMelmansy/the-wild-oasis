import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

export default function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

  useEffect(()=>{
    if(isDarkMode){
        document.documentElement.classList.add('dark-mode')
        document.documentElement.classList.remove('light-mode')
    }
    else{
        document.documentElement.classList.remove('dark-mode')
        document.documentElement.classList.add('light-mode')
    }
  },[isDarkMode])
  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error("DarkMode was used outside of DarkMode Provider");
  }

  return context;
}