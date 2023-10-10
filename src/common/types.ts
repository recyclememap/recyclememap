import { ReactNode } from 'react';

export type GenericObject = Record<string, any>;

export type ChildrenProp = { children?: ReactNode };

export type PropsWithChildren<P> = P & ChildrenProp;
