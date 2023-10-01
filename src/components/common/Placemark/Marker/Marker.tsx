import { Box } from '@mui/material';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { flatIconsKeys } from '@root/components';
import { getBackground } from './helpers';
import { cutout, ring, ringWrapper, backgroundVar } from './marker.css';

export const Marker = ({ icons }: { icons: flatIconsKeys[] }) => {
  return (
    <Box className={ringWrapper} data-testid={Marker.name}>
      <Box
        className={ring}
        style={assignInlineVars({ [backgroundVar]: getBackground(icons) })}
      />
      <Box className={cutout} />
    </Box>
  );
};
