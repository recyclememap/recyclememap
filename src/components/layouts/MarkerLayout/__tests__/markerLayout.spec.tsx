import { screen } from '@testing-library/react';
import { DialogElements } from '@components/dialogs/AddMarkerDialog/__tests__/test-data';
import { IRootStore } from '@root/store';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { MarkerLayout } from '../MarkerLayout';
import { MOBILE_MARKER_TEST_ID } from '../MobileMarker/__tests__/test-data';
import { LayoutElements } from './test-data';

describe('MarkerLayout visual', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = createStore();
  });

  it('renders correct elements', () => {
    renderWithStore(store, <MarkerLayout />);

    screen.getByTitle(LayoutElements.FabTitle);
  });

  it('renders correct marker dialog', () => {
    store.markerView.setIsMarkerDialogOpen(true);

    renderWithStore(store, <MarkerLayout />);

    screen.getByText(DialogElements.Title);
  });

  it('renders the correct mobile marker dialog and mobile marker', async () => {
    store.markerView.setIsNewMobileMarkerActive(true);

    renderWithStore(store, <MarkerLayout />);

    screen.getByText(DialogElements.Title);
    screen.getByTestId(MOBILE_MARKER_TEST_ID);
  });
});
