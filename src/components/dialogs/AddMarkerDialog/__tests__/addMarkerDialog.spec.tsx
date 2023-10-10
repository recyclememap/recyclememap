import { screen } from '@testing-library/react';
import { IRootStore } from '@root/store';
import { MapLoaders } from '@root/store/domains';
import { noop } from '@utils/helpers';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { AddMarkerDialog } from '../AddMarkerDialog';
import { DialogElements } from './test-data';

describe('AddMarkerDialog visual', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = createStore();
  });

  it('renders correct elements', async () => {
    renderWithStore(store, <AddMarkerDialog onClose={noop} />);

    screen.getByText(DialogElements.Title);
    screen.getByText(DialogElements.AddressLabel);
    screen.getByText(DialogElements.Description);
    screen.getByTitle(DialogElements.EditButton);
    screen.getByText(DialogElements.WasteTypesDescription);
    screen.getByLabelText(DialogElements.WasteTypesLabel);
    screen.getByText(DialogElements.AddButton);
    screen.getByText(DialogElements.CancelButton);
  });

  it('renders loading', async () => {
    store.loader.setLoader(MapLoaders.GetAddress);
    renderWithStore(store, <AddMarkerDialog onClose={noop} />);

    screen.getByRole('progressbar');
  });
});
