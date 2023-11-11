import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MarkerState } from '@common/constants';
import { IRootStore } from '@root/store';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { ActiveMarker } from '../ActiveMarker';
import { ActiveMarkerElements, ACTIVE_MARKER } from './test-data';

describe('ActiveMarker logic', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = createStore();
  });

  it('sets edit state on the edit button click', async () => {
    store.markersDomain.setActiveMarker(ACTIVE_MARKER);

    renderWithStore(store, <ActiveMarker />);

    await userEvent.click(screen.getByText(ActiveMarkerElements.EditButton));

    expect(store.markersDomain.suggestionMarker).toStrictEqual(ACTIVE_MARKER);
    expect(store.markersView.state).toBe(MarkerState.Edit);
  });
});
