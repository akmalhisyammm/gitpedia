import { createContext } from 'react';

import { IStoreItem } from 'types/store';

interface IContext {
  items: IStoreItem[];
}

export const StoreContext = createContext<IContext>({
  items: [],
});
