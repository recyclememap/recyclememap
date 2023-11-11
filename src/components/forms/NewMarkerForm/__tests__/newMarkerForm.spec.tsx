import { screen } from '@testing-library/react';
import { IRootStore } from '@root/store';
import { noop } from '@utils/helpers';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { NewMarkerForm } from '../NewMarkerForm';
import { FormElements } from './test-data';

describe('NewMarkerForm visual', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = createStore();
  });

  it('renders correct elements', async () => {
    renderWithStore(store, <NewMarkerForm onClose={noop} />);

    screen.getByText(FormElements.Title);
    screen.getByText(FormElements.AddressLabel);
    screen.getByText(FormElements.Description);
    screen.getByTitle(FormElements.EditButton);
    screen.getByText(FormElements.WasteTypesDescription);
    screen.getByLabelText(FormElements.WasteTypesLabel);
    screen.getByText(FormElements.AddButton);
    screen.getByText(FormElements.CancelButton);
  });
});
