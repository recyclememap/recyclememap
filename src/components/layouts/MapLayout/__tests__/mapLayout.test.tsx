import { IRootStore } from '@root/store';
import {
  createStore,
  fireResize,
  renderWithStore,
  MockBreakpoints
} from '@utils/tests/helpers';
import { MapLayout } from '../MapLayout';

describe('MapLayout logic', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = createStore();
  });

  it('resets desktop markers on resize', () => {
    fireResize(MockBreakpoints.desktop);
    store.markerView.setIsMarkerDialogOpen(true);
    store.markerView.setIsNewMarkerActive(true);

    renderWithStore(store, <MapLayout />);

    fireResize(MockBreakpoints.mobile);

    expect(store.markerView.isMarkerDialogOpen).toBe(false);
    expect(store.markerView.isNewMarkerActive).toBe(false);
  });

  it('resets mobile markers on resize', () => {
    fireResize(MockBreakpoints.mobile);
    store.markerView.setIsNewMobileMarkerActive(true);

    renderWithStore(store, <MapLayout />);

    fireResize(MockBreakpoints.desktop);

    expect(store.markerView.isNewMobileMarkerActive).toBe(false);
  });
});
