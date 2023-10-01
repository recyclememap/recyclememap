import { screen } from '@testing-library/react';
import { IRootStore } from '@root/store';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { MapLayout } from '../MapLayout';
import { MARKERS_MOCK, MARKER_ID } from './test-data';

describe('MapLayout visual', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = createStore();
  });

  it('renders markers', async () => {
    // Mock request and set markers explicitly because the leaflet can not render markers dynamically in jest
    jest.spyOn(store.markersDomain, 'getMarkers').mockResolvedValueOnce();
    store.markersDomain.setMarkers(MARKERS_MOCK);

    renderWithStore(store, <MapLayout />);

    await screen.findByTestId(MARKER_ID);
  });
});
