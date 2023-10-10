import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { KeyboardEvent } from 'react';
import { ChildrenProp } from '@common/types';
import { useStore } from '@root/store';

export const MarkerHandler = observer(({ children }: ChildrenProp) => {
  const { markersView } = useStore();

  const cancelAddingMarker = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && markersView.isNewMarkerActive) {
      markersView.setIsNewMarkerActive(false);
    }
  };

  return <Box onKeyDown={cancelAddingMarker}>{children}</Box>;
});
