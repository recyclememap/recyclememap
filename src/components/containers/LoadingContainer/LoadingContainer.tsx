import { PropsWithChildren } from 'react';
import { Loader } from '@root/components';

interface IProps {
  isLoading: boolean;
  height?: string;
}

export const LoadingContainer = ({
  isLoading,
  height,
  children
}: PropsWithChildren<IProps>) => {
  return isLoading ? <Loader height={height} /> : children;
};
