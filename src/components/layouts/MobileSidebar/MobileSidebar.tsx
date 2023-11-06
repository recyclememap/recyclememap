import CloseIcon from '@mui/icons-material/Close';
import { Slide, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { MarkerState } from '@common/constants';
import { LoadingContainer } from '@components/containers';
import { NewMarkerForm, EditMarkerForm } from '@components/forms';
import { ActiveMarker } from '@components/layouts';
import { useStore } from '@root/store';
import { MapLoaders } from '@root/store/domains';
import { sizes } from '@root/theme';
import { StyledSidebar } from './styled';

export const MobileSidebar = observer(() => {
  const { t } = useTranslation();
  const { markersView, sidebarView, loader } = useStore();

  const onClose = () => {
    sidebarView.setIsOpen(false);
    markersView.setState(null);
    markersView.setIsNewMobileMarkerActive(false);
  };

  const getContent = () => {
    switch (markersView.state) {
      case MarkerState.Active:
        return <ActiveMarker />;
      case MarkerState.Edit:
        return markersView.isUnsupportedCoordinates ? (
          <>
            <Typography variant="h2">
              {t('map.invalidCoordinatesErrorMessage')}
            </Typography>
            <Typography align="center">
              {t('map.invalidCoordinatesErrorDetails')}
            </Typography>
          </>
        ) : (
          <LoadingContainer isLoading={loader.isLoading(MapLoaders.GetAddress)}>
            <EditMarkerForm onClose={onClose} />
          </LoadingContainer>
        );
      case MarkerState.New:
        return markersView.isUnsupportedCoordinates ? (
          <>
            <Typography variant="h2">
              {t('map.invalidCoordinatesErrorMessage')}
            </Typography>
            <Typography align="center">
              {t('map.invalidCoordinatesErrorDetails')}
            </Typography>
          </>
        ) : (
          <LoadingContainer isLoading={loader.isLoading(MapLoaders.GetAddress)}>
            <NewMarkerForm onClose={onClose} />
          </LoadingContainer>
        );
    }
  };

  return (
    <Slide direction="up" in={sidebarView.isOpen} mountOnEnter unmountOnExit>
      <StyledSidebar>
        {markersView.state === MarkerState.Active && (
          <CloseIcon
            sx={{
              position: 'absolute',
              right: sizes[16].rem,
              top: sizes[16].rem,
              cursor: 'pointer'
            }}
            data-testid="mobile-sidebar--close-icon"
            onClick={onClose}
          />
        )}
        {getContent()}
      </StyledSidebar>
    </Slide>
  );
});
