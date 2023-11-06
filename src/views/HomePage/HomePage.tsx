import { useMediaQuery, useTheme } from '@mui/material';
import {
  MarkerLayout,
  MapLayout,
  MarkerHandler,
  MobileHandler,
  Sidebar,
  MobileSidebar
} from '@root/components';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <MobileHandler>
      <MarkerHandler>
        {isMobile ? <MobileSidebar /> : <Sidebar />}
        <MapLayout />
        <MarkerLayout />
      </MarkerHandler>
    </MobileHandler>
  );
};

export default HomePage;
