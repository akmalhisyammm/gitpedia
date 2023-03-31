import { createContext } from 'react';

import type { IStoreItem } from 'types/store';

interface IContext {
  items: IStoreItem[];
}

export const StoreContext = createContext<IContext>({ items: [] });
