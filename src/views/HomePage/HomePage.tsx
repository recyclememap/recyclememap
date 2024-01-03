import { useMediaQuery, useTheme } from '@mui/material';
import {
  MarkerLayout,
  MapLayout,
  MobileHandler,
  Sidebar,
  MobileSidebar,
  withInit
} from '@root/components';

const HomePage = withInit('markersDomain', () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <MobileHandler>
      {isMobile ? <MobileSidebar /> : <Sidebar />}
      <MapLayout />
      <MarkerLayout />
    </MobileHandler>
  );
});

export default HomePage;
