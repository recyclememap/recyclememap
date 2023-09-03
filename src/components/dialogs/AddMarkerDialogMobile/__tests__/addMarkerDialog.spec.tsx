import { screen } from '@testing-library/react';
import { IRootStore } from '@root/store';
import { MapLoaders } from '@root/store/domains';
import { noop } from '@utils/helpers';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { AddMarkerDialogMobile } from '../AddMarkerDialogMobile';
import { DialogElements } from './test-data';

describe('AddMarkerDialogMobile visual', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = createStore();
  });

  it('renders correct elements', async () => {
    renderWithStore(store, <AddMarkerDialogMobile onClose={noop} />);

    screen.getByText(DialogElements.Title);
    screen.getByText(DialogElements.AddressLabel);
    screen.getByText(DialogElements.Description);
    screen.getByText(DialogElements.AddButton);
    screen.getByText(DialogElements.CancelButton);
  });

  it('renders loading', async () => {
    store.loader.setLoader(MapLoaders.GetAddress);
    renderWithStore(store, <AddMarkerDialogMobile onClose={noop} />);

    screen.getByRole('progressbar');
  });
});
