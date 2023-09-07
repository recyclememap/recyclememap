import { ReactNode } from 'react';

export type GenericObject = Record<string, any>;

export type PropsWithChildren<P> = P & { children?: ReactNode };
