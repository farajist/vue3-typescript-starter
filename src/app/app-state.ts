import { createLogger, createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { store as items, ItemsStore, ItemsState } from '@/app/example/state';
export type RootState = {
  items: ItemsState;
};

export type Store = ItemsStore<Pick<RootState, 'items'>>;

// plug in logger when in development environment
const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

// plugin in session storage based persistence
plugins.push(createPersistedState({ storage: window.sessionStorage }));

export const store = createStore({
  plugins,
  modules: {
    items,
  },
});

export function useStore(): Store {
  return store as Store;
}
