export type GenericObject = Record<string, any>;

export type MakePartial<T> = {
  [K in keyof T]?: Partial<T[K]>;
};
