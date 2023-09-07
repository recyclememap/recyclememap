import AddLocationIcon from '@mui/icons-material/AddLocation';
import { Fab, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { MOBILE_DIALOG_HEIGHT } from '@common/constants';
import { AddMarkerDialog, AddMarkerDialogMobile } from '@root/components';
import { useStore } from '@root/store';
import { sizes } from '@root/theme';
import { MobileMarker } from './MobileMarker/MobileMarker';

const FAB_DEFAULT_POSITION = 100;

export const MarkerLayout = observer(() => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { markerView, mapDomain } = useStore();

  const closeDialogHandler = (isMobile = false) => {
    isMobile
      ? markerView.setIsNewMobileMarkerActive(false)
      : markerView.setIsMarkerDialogOpen(false);
    mapDomain.setCurrentPosition(null);
    mapDomain.setCurrentAddress(null);
  };

  const handleFabClick = () => {
    if (window.innerWidth > theme.breakpoints.values.md) {
      markerView.setIsNewMarkerActive(true);
    } else {
      markerView.setIsNewMobileMarkerActive(true);
    }
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
            (markerView.isNewMobileMarkerActive ? MOBILE_DIALOG_HEIGHT : 0)
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
      {markerView.isMarkerDialogOpen && (
        <AddMarkerDialog onClose={closeDialogHandler} />
      )}
      {markerView.isNewMobileMarkerActive && (
        <>
          <AddMarkerDialogMobile onClose={closeDialogHandler} />
          <MobileMarker />
        </>
      )}
    </>
  );
});
