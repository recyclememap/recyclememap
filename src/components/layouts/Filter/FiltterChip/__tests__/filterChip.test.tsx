import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Scope } from 'nock';
import { StatusCodes, WasteTypes } from '@common/constants';
import { IRootStore } from '@root/store';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { FilterChip } from '../FilterChip';
import { TextElements, MARKERS_MOCK } from './test-data';

describe('FilterChip logic', () => {
  let store: IRootStore;
  let apiMock: Scope;

  beforeEach(() => {
    store = createStore();
    apiMock = (global as any).apiMock;
  });

  it('sets correct filter if all waste types are already selected', async () => {
    apiMock
      .get('/markers')
      .query({ wasteTypes: WasteTypes.Glass })
      .once()
      .reply(StatusCodes.Ok, MARKERS_MOCK);

    renderWithStore(store, <FilterChip iconName={WasteTypes.Glass} />);

    userEvent.click(screen.getByText(TextElements.ChipLabel));

    await waitFor(() =>
      expect([...store.filterDomain.selectedFilter]).toStrictEqual([
        WasteTypes.Glass
      ])
    );
  });

  it('sets correct filter if some of waste types is already selected', async () => {
    store.filterDomain.setSelectedFilter(new Set([WasteTypes.Paper]));

    apiMock
      .get('/markers')
      .query({ wasteTypes: `${WasteTypes.Paper},${WasteTypes.Glass}` })
      .once()
      .reply(StatusCodes.Ok, MARKERS_MOCK);

    renderWithStore(store, <FilterChip iconName={WasteTypes.Glass} />);

    userEvent.click(screen.getByText(TextElements.ChipLabel));

    await waitFor(() =>
      expect([...store.filterDomain.selectedFilter]).toStrictEqual([
        WasteTypes.Paper,
        WasteTypes.Glass
      ])
    );
  });

  it('sets correct filter if the current waste type is already selected', async () => {
    store.filterDomain.setSelectedFilter(
      new Set([WasteTypes.Paper, WasteTypes.Glass])
    );

    apiMock
      .get('/markers')
      .query({ wasteTypes: WasteTypes.Paper })
      .once()
      .reply(StatusCodes.Ok, MARKERS_MOCK);

    renderWithStore(store, <FilterChip iconName={WasteTypes.Glass} />);

    userEvent.click(screen.getByText(TextElements.ChipLabel));

    await waitFor(() =>
      expect([...store.filterDomain.selectedFilter]).toStrictEqual([
        WasteTypes.Paper
      ])
    );
  });
});
