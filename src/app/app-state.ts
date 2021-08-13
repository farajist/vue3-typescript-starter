import { InjectionKey } from 'vue';
import {
  createLogger,
  createStore,
  Store as VuexStore,
  useStore as baseUseStore,
} from 'vuex';
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

export const key: InjectionKey<VuexStore<RootState>> = Symbol();
export const store = createStore({
  plugins,
  modules: {
    items,
  },
});

// define your own `useStore` composition function
export function useStore(): VuexStore<RootState> {
  return baseUseStore(key);
}
