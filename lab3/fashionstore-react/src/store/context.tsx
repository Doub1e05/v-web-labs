import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StoreApi } from 'zustand';
import { State } from './types';
import { createAppStore } from './store';

type StoreContextValue = StoreApi<State> | null;

const StoreContext = createContext<StoreContextValue>(null);

type StoreProviderProps = {
  children: ReactNode;
};

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [store] = useState(() => createAppStore());
  
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = <T,>(selector: (state: State) => T): T => {
  const store = useContext(StoreContext);
  
  if (!store) {
    throw new Error('[ERROR] useStore must be used within a StoreProvider');
  }
  
  const [selectedState, setSelectedState] = useState(() => selector(store.getState()));
  
  React.useEffect(() => {
    const unsubscribe = store.subscribe((state) => {
      const newSelectedState = selector(state);
      if (newSelectedState !== selectedState) {
        setSelectedState(newSelectedState);
      }
    });
    
    return unsubscribe;
  }, [store, selector, selectedState]);
  
  return selectedState;
};

export const useStoreSelector = <T,>(selector: (state: State) => T): T => {
  const store = useContext(StoreContext);
  
  if (!store) {
    throw new Error('[ERROR] useStoreSelector must be used within a StoreProvider');
  }
  
  return React.useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState())
  );
};