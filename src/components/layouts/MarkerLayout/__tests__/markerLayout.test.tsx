import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  DialogElements,
  LAT_LNG_MOCK
} from '@components/dialogs/AddMarkerDialogMobile/__tests__/test-data';
import { IRootStore } from '@root/store';
import {
  createStore,
  fireResize,
  renderWithStore,
  MockBreakpoints
} from '@utils/tests/helpers';
import { MarkerLayout } from '../MarkerLayout';
import { MOBILE_MARKER_TEST_ID } from '../MobileMarker/__tests__/test-data';
import { LayoutElements, ADDRESS_MOCK } from './test-data';

describe('MarkerLayout logic', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = createStore();
  });

  it('sets new marker active on Fab click', async () => {
    fireResize(MockBreakpoints.desktop);

    renderWithStore(store, <MarkerLayout />);

    userEvent.click(screen.getByTitle(LayoutElements.FabTitle));

    await waitFor(() => expect(store.markerView.isNewMarkerActive).toBe(true));
  });

  it('shows new mobile marker icon and opens mobile dialog on Fab click', async () => {
    fireResize(MockBreakpoints.mobile);

    renderWithStore(store, <MarkerLayout />);

    userEvent.click(screen.getByTitle(LayoutElements.FabTitle));

    await screen.findByText(DialogElements.Title);
    screen.getByTestId(MOBILE_MARKER_TEST_ID);
  });

  it('resets data and closes dialog on dialog cancel button click', async () => {
    fireResize(MockBreakpoints.desktop);
    store.markerView.setIsMarkerDialogOpen(true);
    store.mapDomain.setCurrentPosition(LAT_LNG_MOCK);
    store.mapDomain.setCurrentAddress(ADDRESS_MOCK);

    renderWithStore(store, <MarkerLayout />);

    userEvent.click(await screen.findByText(DialogElements.CancelButton));

    await waitFor(() =>
      expect(screen.queryByText(DialogElements.Title)).toBeNull()
    );
    expect(store.mapDomain.currentAddress).toBeNull();
    expect(store.mapDomain.currentPosition).toBeNull();
  });

  it('resets data and closes dialog on mobile dialog cancel button click', async () => {
    fireResize(MockBreakpoints.mobile);
    store.mapDomain.setCurrentPosition(LAT_LNG_MOCK);
    store.mapDomain.setCurrentAddress(ADDRESS_MOCK);

    renderWithStore(store, <MarkerLayout />);

    userEvent.click(screen.getByTitle(LayoutElements.FabTitle));

    userEvent.click(await screen.findByText(DialogElements.CancelButton));

    await waitFor(() =>
      expect(screen.queryByText(DialogElements.Title)).toBeNull()
    );
    expect(store.mapDomain.currentAddress).toBeNull();
    expect(store.mapDomain.currentPosition).toBeNull();
  });
});
