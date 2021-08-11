export type GetterType<T, U> = {
  [K in keyof U]: (state: T) => U[K];
};

export type MutationType<T, U> = {
  [K in keyof U]: (state: T, payload: U[K]) => void;
};

export type ActionType<U> = {
  [K in keyof U]: () => U[K];
};
