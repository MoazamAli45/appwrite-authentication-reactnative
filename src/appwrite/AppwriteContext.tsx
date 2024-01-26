import {PropsWithChildren, createContext, useState} from 'react';
import AppwriteService from './service';
import React from 'react';
type AppwriteContextType = {
  appwrite: AppwriteService;
  isLoggedIn: boolean;

  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

const AppwriteContext = createContext<AppwriteContextType>({
  appwrite: new AppwriteService(),
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const AppwriteContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const defaultValue = {
    appwrite: new AppwriteService(),
    isLoggedIn,
    setIsLoggedIn,
  };
  return (
    <AppwriteContext.Provider value={defaultValue}>
      {children}
    </AppwriteContext.Provider>
  );
};

export default AppwriteContext;
