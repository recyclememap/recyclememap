import CloseIcon from '@mui/icons-material/Close';
import { Slide } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { MarkerState } from '@common/constants';
import { LoadingContainer } from '@components/containers';
import { EditMarkerForm, NewMarkerForm } from '@components/forms';
import { ActiveMarker } from '@components/layouts/ActiveMarker/ActiveMarker';
import { useStore } from '@root/store';
import { MapLoaders } from '@root/store/domains';
import { sizes } from '@root/theme';
import { StyledSidebar } from './styled';

export const Sidebar = observer(() => {
  const { sidebarView, markersView, loader } = useStore();

  const onClose = () => {
    sidebarView.setIsOpen(false);
    setTimeout(() => markersView.setState(null), 200);
  };

  const getContent = () => {
    switch (markersView.state) {
      case MarkerState.Active:
        return <ActiveMarker />;
      case MarkerState.Edit:
        return (
          <LoadingContainer
            isLoading={loader.isLoading(MapLoaders.GetAddress)}
            height="274px"
          >
            <EditMarkerForm onClose={onClose} />
          </LoadingContainer>
        );
      case MarkerState.New:
        return (
          <LoadingContainer
            isLoading={loader.isLoading(MapLoaders.GetAddress)}
            height="290px"
          >
            <NewMarkerForm onClose={onClose} />
          </LoadingContainer>
        );
    }
  };

  return (
    <Slide direction="right" in={sidebarView.isOpen} mountOnEnter unmountOnExit>
      <StyledSidebar>
        {markersView.state === MarkerState.Active && (
          <CloseIcon
            sx={{
              position: 'absolute',
              right: sizes[16].rem,
              top: sizes[16].rem,
              cursor: 'pointer'
            }}
            data-testid="sidebar--close-icon"
            onClick={onClose}
          />
        )}
        {getContent()}
      </StyledSidebar>
    </Slide>
  );
});