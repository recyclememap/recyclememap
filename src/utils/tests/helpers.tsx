import { RenderResult, render } from '@testing-library/react';
import { ReactElement } from 'react';
import { MapContainer } from 'react-leaflet';
import { ASHDOD_COORDINATES, INITIAL_MAP_ZOOM } from '@common/constants';
import { Snackbar } from '@root/components';
import { StoreContext, IRootStore, RootStore } from '@root/store';

export const createStore = (): IRootStore => {
  return new RootStore();
};

export const renderWithStore = (
  store: IRootStore,
  component: ReactElement,
  showSnackbar = true
): RenderResult => {
  return render(
    <StoreContext.Provider value={store}>
      {showSnackbar && <Snackbar />}
      {component}
    </StoreContext.Provider>
  );
};

export const renderWithLeaflet = (
  store: IRootStore,
  component: ReactElement
): RenderResult => {
  return render(
    <StoreContext.Provider value={store}>
      <MapContainer
        center={ASHDOD_COORDINATES}
        zoom={INITIAL_MAP_ZOOM}
        zoomControl={false}
      >
        {component}
      </MapContainer>
    </StoreContext.Provider>
  );
};

export const fireResize = (width: number) => {
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
};

export const MockBreakpoints = {
  desktop: 1200,
  mobile: 600
};
