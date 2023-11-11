import { useMediaQuery, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useEffect } from 'react';
import { useStore } from '@root/store';

export const MobileHandler = observer(({ children }: PropsWithChildren) => {
  const { markersView, sidebarView } = useStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    markersView.setIsNewMobileMarkerActive(false);
    markersView.setIsNewMarkerActive(false);
    sidebarView.setIsOpen(false);
    markersView.setState(null);
  }, [markersView, isMobile, sidebarView]);

  return children;
});
