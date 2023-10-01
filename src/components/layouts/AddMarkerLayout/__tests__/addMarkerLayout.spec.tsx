import { screen } from '@testing-library/react';
import { DialogElements } from '@root/components/dialogs/AddMarkerDialog/__tests__/test-data';
import { IRootStore } from '@root/store';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { AddMarkerLayout } from '../AddMarkerLayout';
import { MOBILE_MARKER_TEST_ID } from '../MobileMarker/__tests__/test-data';
import { LayoutElements } from './test-data';

describe('AddMarkerLayout visual', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = createStore();
  });

  it('renders correct elements', () => {
    renderWithStore(store, <AddMarkerLayout />);

    screen.getByTitle(LayoutElements.FabTitle);
  });

  it('renders the correct marker dialog', () => {
    store.markersView.setIsNewMarkerDialogOpen(true);

    renderWithStore(store, <AddMarkerLayout />);

    screen.getByText(DialogElements.Title);
  });

  it('renders the correct mobile marker dialog and mobile marker', async () => {
    store.markersView.setIsNewMobileMarkerActive(true);

    renderWithStore(store, <AddMarkerLayout />);

    screen.getByText(DialogElements.Title);
    screen.getByTestId(MOBILE_MARKER_TEST_ID);
  });
});
