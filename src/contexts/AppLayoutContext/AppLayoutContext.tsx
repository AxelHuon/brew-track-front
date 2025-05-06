import React, { createContext, useContext, useState } from 'react';

interface AppLayoutContextType {
  isDialogAddDrinkOpen: boolean;
  setIsDialogAddDrinkOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppLayoutContext = createContext<AppLayoutContextType>({
  isDialogAddDrinkOpen: false,
  setIsDialogAddDrinkOpen: () => {},
});

interface AppLayoutProviderProps {
  children: React.ReactNode;
}

export const AppLayoutProvider: React.FC<AppLayoutProviderProps> = ({
  children,
}) => {
  const [isDialogAddDrinkOpen, setIsDialogAddDrinkOpen] =
    useState<boolean>(false);

  const value = {
    isDialogAddDrinkOpen,
    setIsDialogAddDrinkOpen,
  };

  return (
    <AppLayoutContext.Provider value={value}>
      {children}
    </AppLayoutContext.Provider>
  );
};

export const useAppLayout = () => useContext(AppLayoutContext);
