import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MarkerState } from '@common/constants';
import { IRootStore } from '@root/store';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { MarkerLayout } from '../MarkerLayout';
import { LayoutElements } from './test-data';

describe('MarkerLayout logic', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = createStore();
  });

  it('sets a new marker active and correct state on Fab click', async () => {
    renderWithStore(store, <MarkerLayout />);

    await userEvent.click(screen.getByTitle(LayoutElements.FabTitle));

    expect(store.markersView.isNewMarkerActive).toBe(true);
    expect(store.sidebarView.isOpen).toBe(false);
    expect(store.markersView.state).toBe(MarkerState.New);
  });
});
