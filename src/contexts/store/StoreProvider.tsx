import React, { useEffect, useState } from 'react';

import { StoreContext } from './StoreContext';
import { getAllStoreItems } from 'lib/firebase';
import { IStoreItem } from 'types/store';

type StoreProviderProps = {
  children: React.ReactNode;
};

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [items, setItems] = useState<IStoreItem[]>([]);

  useEffect(() => {
    const fetchStoreItems = async () => {
      const data = await getAllStoreItems();

      setItems(data);
    };

    fetchStoreItems();
  }, []);

  return <StoreContext.Provider value={{ items }}>{children}</StoreContext.Provider>;
};
