import { ActionContext } from 'vuex';

export type GetterType<T, U> = {
  [K in keyof U]: (state: T) => U[K];
};

export type MutationType<T, U> = {
  [K in keyof U]: (state: T, payload: U[K]) => void;
};

export type ActionType<U, S, R, T = Record<string, unknown>> = {
  [K in keyof U]: (context: ActionContext<S, R>, payload: T) => U[K];
};
