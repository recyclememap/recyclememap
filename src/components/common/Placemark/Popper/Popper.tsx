import { Box, Typography } from '@mui/material';
import type { flatIconsKeys } from '@root/components';
import { Icon } from '@root/components';

type PopperProps = {
  icons: flatIconsKeys[];
  street: string;
};

export const Popper = ({ street, icons }: PopperProps) => {
  return (
    <>
      <Typography variant="h5" color="text.secondary">
        {street}
      </Typography>
      <Box sx={{ paddingTop: '16px', display: 'flex', gap: '10px' }}>
        {icons.map((name) => {
          return <Icon name={name} key={name} />;
        })}
      </Box>
    </>
  );
};
