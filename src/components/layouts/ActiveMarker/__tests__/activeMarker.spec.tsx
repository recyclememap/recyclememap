import { screen } from '@testing-library/react';
import { IRootStore } from '@root/store';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { ActiveMarker } from '../ActiveMarker';
import { ActiveMarkerElements, ACTIVE_MARKER } from './test-data';

describe('ActiveMarker visual', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = createStore();
  });

  it('renders correct elements', async () => {
    store.markersDomain.setActiveMarker(ACTIVE_MARKER);

    renderWithStore(store, <ActiveMarker />);

    screen.getByText(
      `${ActiveMarkerElements.AddressLabel}${ACTIVE_MARKER.address}`
    );
    screen.getByText(ActiveMarkerElements.WasteTypesLabel);
    screen.getByTitle(ActiveMarkerElements.WasteType);
    screen.getByText(
      `${ActiveMarkerElements.DateLabel}${ActiveMarkerElements.Date}`
    );
    screen.getByText(ActiveMarkerElements.EditButton);
  });
});
