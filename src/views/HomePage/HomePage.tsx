import { AddMarkerLayout, MapLayout, MarkerHandler } from '@root/components';

const HomePage = () => {
  return (
    <MarkerHandler>
      <MapLayout />
      <AddMarkerLayout />
    </MarkerHandler>
  );
};

export default HomePage;
