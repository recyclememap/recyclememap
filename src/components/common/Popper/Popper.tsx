import {
  Popper as PopperModal,
  Box,
  Paper,
  Fade,
  Typography
} from '@mui/material';
import type { flatIconsKeys } from '@root/components';
import { Icon } from '@root/components';

type PopperProps = {
  open: boolean;
  icons: flatIconsKeys[];
  anchorEl: HTMLElement | null;
  street: string;
};

export const Popper = ({ open, street, icons, anchorEl }: PopperProps) => {
  return (
    <PopperModal open={open} anchorEl={anchorEl} transition sx={{ zIndex: 2 }}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper
            elevation={3}
            sx={{ borderRadius: '16px', padding: '16px', minWidth: '200px' }}
          >
            <Typography variant="h5" color="text.secondary">
              {street}
            </Typography>
            <Box sx={{ paddingTop: '16px', display: 'flex', gap: '10px' }}>
              {icons.map((name) => {
                return <Icon name={name} key={name} />;
              })}
            </Box>
          </Paper>
        </Fade>
      )}
    </PopperModal>
  );
};
