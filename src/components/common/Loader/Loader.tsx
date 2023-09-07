import { CircularProgress } from '@mui/material';
import { forwardRef } from 'react';
import { Flex } from '@root/components';

export const Loader = forwardRef(() => {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}
    >
      <CircularProgress />
    </Flex>
  );
});
