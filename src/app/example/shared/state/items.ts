import { RootState } from '@/app/app-state';
import { ActionType, GetterType, MutationType } from '@/app/shared/@types';
import {
  ActionTree,
  CommitOptions,
  DispatchOptions,
  GetterTree,
  MutationTree,
  Store as VuexStore,
} from 'vuex';
import { Item } from '../@types';

// FIXME: separate into files ???
export type State = {
  loading: boolean;
  data: Item[];
  errors: string[];
};

enum ItemsMutationTypes {
  SET_DATA = 'SET_DATA',
  SET_ERRORS = 'SET_ERRORS',
}

enum ItemsActionTypes {
  GET_DATA = 'GET_DATA',
}

// name to return type mappings
interface ItemsGettersReturnTypeMap {
  data: Item[];
  errors: string[];
}

interface ItemsMutationsPayloadMap {
  SET_DATA: Item[];
  SET_ERRORS: string[];
}

interface ItemsActionsReturnTypeMap {
  [ItemsActionTypes.GET_DATA]: Promise<void>;
}

// module specific type instatiations
type Mutations = MutationType<State, ItemsMutationsPayloadMap>;
type Getters = GetterType<State, ItemsGettersReturnTypeMap>;
type Actions = ActionType<ItemsActionsReturnTypeMap>;

// concrete implementations
const mutations: MutationTree<State> & Mutations = {
  [ItemsMutationTypes.SET_DATA]: (state, payload) => {
    state.data = payload;
  },
  [ItemsMutationTypes.SET_ERRORS]: (state, payload) => {
    state.errors = payload;
  },
};

const getters: GetterTree<State, RootState> & Getters = {
  data: (state) => state.data,
  errors: (state) => state.errors,
};

const actions: ActionTree<State, RootState> & Actions = {
  [ItemsActionTypes.GET_DATA]: async () => {
    Promise.resolve();
  },
};

// initial state
const initialState: State = {
  loading: false,
  data: [],
  errors: [],
};

// exports
export const store = {
  mutations,
  getters,
  actions,
  state: initialState,
};

export type ItemsStore<S = State> = Omit<
  VuexStore<S>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};
