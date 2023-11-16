import { waitFor } from '@testing-library/react';
import { Scope } from 'nock';
import { StatusCodes } from '@common/constants';
import { IRootStore } from '@root/store';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import HomePage from '../HomePage';
import { MARKERS_MOCK } from './test-data';

describe('HomePage logic', () => {
  let store: IRootStore;
  let apiMock: Scope;

  beforeEach(() => {
    store = createStore();
    apiMock = (global as any).apiMock;
  });

  it('gets markers', async () => {
    apiMock.get('/markers').once().reply(StatusCodes.Ok, MARKERS_MOCK);

    renderWithStore(store, <HomePage />);

    await waitFor(() =>
      expect(store.markersDomain.markers).toStrictEqual(MARKERS_MOCK)
    );
  });
});
