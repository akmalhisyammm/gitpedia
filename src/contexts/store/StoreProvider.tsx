import { useEffect, useState } from 'react';
import { getDocs } from 'firebase/firestore';

import { StoreContext } from './StoreContext';
import { storesCollection } from 'lib/firebase';

import type { IStoreItem } from 'types/store';

type StoreProviderProps = {
  children: React.ReactNode;
};

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [items, setItems] = useState<IStoreItem[]>([]);

  useEffect(() => {
    const getAllStoreItems = async () => {
      const snapshot = await getDocs(storesCollection);
      const data = snapshot.docs.map((doc) => ({ ...(doc.data() as IStoreItem) }));

      setItems(data);
    };

    getAllStoreItems();
  }, []);

  return <StoreContext.Provider value={{ items }}>{children}</StoreContext.Provider>;
};
