import { CircularProgress } from '@mui/material';
import { Flex } from '@root/components';

interface LoaderProps {
  height?: string;
}

export const Loader = ({ height }: LoaderProps) => {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        height: height ? height : '100%'
      }}
    >
      <CircularProgress />
    </Flex>
  );
};
