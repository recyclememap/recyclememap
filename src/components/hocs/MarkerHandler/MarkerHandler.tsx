import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { KeyboardEvent, PropsWithChildren } from 'react';
import { useStore } from '@root/store';

export const MarkerHandler = observer(({ children }: PropsWithChildren) => {
  const { markersView } = useStore();

  const cancelAddingMarker = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && markersView.isNewMarkerActive) {
      markersView.setIsNewMarkerActive(false);
      markersView.setState(null);
    }
  };

  return <Box onKeyDown={cancelAddingMarker}>{children}</Box>;
});
