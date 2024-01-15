import { screen } from '@testing-library/react';
import { WasteTypes } from '@common/constants';
import { IRootStore } from '@root/store';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { FilterChip } from '../FilterChip';
import { TextElements } from './test-data';

describe('FilterChip visual', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = createStore();
  });

  it('renders correct elements', () => {
    renderWithStore(store, <FilterChip iconName={WasteTypes.Glass} />);

    screen.getByText(TextElements.ChipLabel);
  });
});
