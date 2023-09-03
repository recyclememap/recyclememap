import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { KeyboardEvent } from 'react';
import { MarkerLayout, MapLayout } from '@root/components';
import { useStore } from '@root/store';

const HomePage = observer(() => {
  const { markerView } = useStore();

  const cancelAddingMarker = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && markerView.isNewMarkerActive) {
      markerView.setIsNewMarkerActive(false);
    }
  };

  return (
    <Box onKeyDown={cancelAddingMarker}>
      <MapLayout />
      <MarkerLayout />
    </Box>
  );
});

export default HomePage;
