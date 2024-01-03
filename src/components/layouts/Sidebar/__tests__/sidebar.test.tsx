import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MarkerState } from '@common/constants';
import { IRootStore } from '@root/store';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { Sidebar } from '../Sidebar';
import {
  TextElements,
  CLOSE_ICON_TEST_ID,
  ACTIVE_MARKER,
  SUGGESTION_MARKER
} from './test-data';

describe('Sidebar logic', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = createStore();
  });

  it('calls onClose and clear suggested marker on close button click', async () => {
    store.sidebarView.setIsOpen(true);
    store.markersDomain.setActiveMarker(ACTIVE_MARKER);
    store.markersView.setState(MarkerState.Active);
    store.markersDomain.setSuggestionMarker(SUGGESTION_MARKER);

    renderWithStore(store, <Sidebar />);

    screen.getByText(TextElements.ActiveMarkerEditButton);

    await userEvent.click(screen.getByTestId(CLOSE_ICON_TEST_ID));

    expect(store.sidebarView.isOpen).toBe(false);
    expect(store.markersDomain.suggestionMarker).toBeNull();
    await waitFor(() => expect(store.markersView.state).toBeNull());
  });
});
