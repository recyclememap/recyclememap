import { screen } from '@testing-library/react';
import { IRootStore } from '@root/store';
import { noop } from '@utils/helpers';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { EditMarkerForm } from '../EditMarkerForm';
import { FormElements, SUGGESTION_MARKER } from './test-data';

describe('EditMarkerForm visual', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = createStore();
  });

  it('renders correct elements', async () => {
    store.markersDomain.setActiveMarker(SUGGESTION_MARKER);
    store.markersDomain.setSuggestionMarker(SUGGESTION_MARKER);

    renderWithStore(store, <EditMarkerForm onClose={noop} />);

    screen.getByText(FormElements.Title);
    screen.getByText(FormElements.Description);
    screen.getByTitle(FormElements.EditButton);
    screen.getByText(FormElements.WasteTypesDescription);
    screen.getByLabelText(FormElements.WasteTypesLabel);
    screen.getByText(FormElements.UpdateButton);
    screen.getByText(FormElements.CancelButton);

    screen.getByText(
      `${FormElements.AddressLabel}${SUGGESTION_MARKER.address}`
    );
    screen.getByText(FormElements.WasteType);
  });
});
