import { waitFor } from '@testing-library/react';
import { Scope } from 'nock';
import { StatusCodes } from '@common/constants';
import { IRootStore } from '@root/store';
import {
  createStore,
  fireResize,
  renderWithStore,
  MockBreakpoints
} from '@utils/tests/helpers';
import { MapLayout } from '../MapLayout';
import { MARKERS_MOCK } from './test-data';

describe('MapLayout logic', () => {
  let store: IRootStore;
  let apiMock: Scope;

  beforeEach(() => {
    store = createStore();
    apiMock = (global as any).apiMock;
  });

  it('gets markers', async () => {
    apiMock.get('/markers').once().reply(StatusCodes.Ok, MARKERS_MOCK);

    renderWithStore(store, <MapLayout />);

    await waitFor(() =>
      expect(store.markersDomain.markers).toStrictEqual(MARKERS_MOCK)
    );
  });

  it('resets desktop markers on resize', () => {
    fireResize(MockBreakpoints.desktop);
    store.markersView.setIsNewMarkerDialogOpen(true);
    store.markersView.setIsNewMarkerActive(true);

    apiMock.get('/markers').once().reply(StatusCodes.Ok, MARKERS_MOCK);

    renderWithStore(store, <MapLayout />);

    fireResize(MockBreakpoints.mobile);

    expect(store.markersView.isNewMarkerDialogOpen).toBe(false);
    expect(store.markersView.isNewMarkerActive).toBe(false);
  });

  it('resets mobile markers on resize', () => {
    fireResize(MockBreakpoints.mobile);
    store.markersView.setIsNewMobileMarkerActive(true);

    apiMock.get('/markers').once().reply(StatusCodes.Ok, MARKERS_MOCK);

    renderWithStore(store, <MapLayout />);

    fireResize(MockBreakpoints.desktop);

    expect(store.markersView.isNewMobileMarkerActive).toBe(false);
  });
});
