import { createContext } from 'react';

import { RootStore } from '../models/RootStore';

export const storeContext = createContext<typeof RootStore.Type>(null);
