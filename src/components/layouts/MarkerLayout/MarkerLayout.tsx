import AddLocationIcon from '@mui/icons-material/AddLocation';
import { Fab, useMediaQuery, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { MOBILE_SIDEBAR_HEIGHT, MarkerState } from '@common/constants';
import { useStore } from '@root/store';
import { sizes } from '@root/theme';
import { MobileMarker } from './MobileMarker/MobileMarker';

const FAB_DEFAULT_POSITION = 100;

export const MarkerLayout = observer(() => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { markersView, sidebarView } = useStore();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleFabClick = () => {
    if (!isMobile) {
      sidebarView.setIsOpen(false);
      markersView.setIsNewMarkerActive(true);
      markersView.setState(MarkerState.New);

      return;
    }

    sidebarView.setIsOpen(true);
    markersView.setState(MarkerState.New);
    markersView.setIsNewMobileMarkerActive(true);
  };

  return (
    <>
      <Fab
        color="primary"
        size="medium"
        aria-label="add"
        sx={{
          position: 'absolute',
          bottom: `${
            FAB_DEFAULT_POSITION +
            (sidebarView.isOpen && isMobile ? MOBILE_SIDEBAR_HEIGHT : 0)
          }px`,
          right: sizes[16].rem,
          mb: sizes[16].rem,
          transition: 'bottom 225ms cubic-bezier(0, 0, 0.2, 1) 0ms'
        }}
        title={t('markerLayout.addMarker')}
        onClick={handleFabClick}
      >
        <AddLocationIcon />
      </Fab>
      {markersView.isNewMobileMarkerActive && isMobile && <MobileMarker />}
    </>
  );
});
