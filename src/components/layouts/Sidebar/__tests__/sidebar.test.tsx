import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MarkerState } from '@common/constants';
import { IRootStore } from '@root/store';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { Sidebar } from '../Sidebar';
import { TextElements, CLOSE_ICON_TEST_ID, ACTIVE_MARKER } from './test-data';

describe('Sidebar logic', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = createStore();
    store.sidebarView.setIsOpen(true);
  });

  it('calls onClose on close button click', async () => {
    store.markersDomain.setActiveMarker(ACTIVE_MARKER);
    store.markersView.setState(MarkerState.Active);

    renderWithStore(store, <Sidebar />);

    screen.getByText(TextElements.ActiveMarkerEditButton);

    await userEvent.click(screen.getByTestId(CLOSE_ICON_TEST_ID));

    expect(store.sidebarView.isOpen).toBe(false);
    await waitFor(() => expect(store.markersView.state).toBe(null));
  });
});
