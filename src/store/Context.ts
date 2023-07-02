import React, { useContext } from 'react';
import { RootStore } from '.';

export const StoreContext = React.createContext<RootStore>({} as RootStore);

export const useStore = () => useContext(StoreContext);
