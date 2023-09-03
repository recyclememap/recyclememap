import AddLocationIcon from '@mui/icons-material/AddLocation';
import { MOBILE_DIALOG_HEIGHT } from '@common/constants';
import { sizes } from '@root/theme';

const ICON_PADDING = 4;
const HALF_ICON_WIDTH = 24;

export const MobileMarker = () => {
  return (
    <AddLocationIcon
      color="primary"
      sx={{
        position: 'absolute',
        zIndex: 1000,
        fontSize: sizes[48].px,
        top: (window.innerHeight - MOBILE_DIALOG_HEIGHT) / 2 - ICON_PADDING,
        left: window.innerWidth / 2 - HALF_ICON_WIDTH
      }}
      data-testid="mobile-marker--add-location-icon"
    />
  );
};
