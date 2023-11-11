import { screen } from '@testing-library/react';
import { IRootStore } from '@root/store';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { MarkerLayout } from '../MarkerLayout';
import { LayoutElements } from './test-data';

describe('MarkerLayout visual', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = createStore();
  });

  it('renders correct elements', () => {
    renderWithStore(store, <MarkerLayout />);

    screen.getByTitle(LayoutElements.FabTitle);
  });
});
