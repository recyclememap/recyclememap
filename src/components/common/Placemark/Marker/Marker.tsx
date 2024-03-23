import { Box } from '@mui/material';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { flatIconsKeys } from '@root/components';
import { getBackground } from './helpers';
import { ring, backgroundVar } from './marker.css';

// TODO: stop using vanillaExtract and insert Marker as Popup using createRoot
// But performance is not good with createRoot. Test it first
export const Marker = ({ icons }: { icons: flatIconsKeys[] }) => {
  return (
    <Box
      className={ring}
      style={assignInlineVars({
        [backgroundVar]: getBackground(icons)
      })}
      data-testid={Marker.name}
    />
  );
};
