import { screen } from '@testing-library/react';
import { WasteTypes } from '@common/constants';
import { IRootStore } from '@root/store';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { Filter } from '../Filter';

describe('Filter visual', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = createStore();
  });

  it('renders correct elements', () => {
    renderWithStore(store, <Filter />);

    Object.values(WasteTypes).forEach((wasteType) => {
      screen.getByText(`icons.${wasteType}.title`);
    });
  });
});
