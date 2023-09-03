import { Modal } from '@mui/material';
import { PropsWithChildren } from '@common/types';
import { Loader } from '@components/common';

interface IProps {
  isLoading: boolean;
  hideBackdrop?: boolean;
}

export const LoadingModal = ({
  isLoading,
  hideBackdrop = true,
  children
}: PropsWithChildren<IProps>) => {
  return isLoading ? (
    <Modal open hideBackdrop={hideBackdrop}>
      <Loader />
    </Modal>
  ) : (
    children
  );
};
