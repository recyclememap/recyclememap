import { screen } from '@testing-library/react';
import { IRootStore } from '@root/store';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { LoadingModal } from '../LoadingModal';
import { ChildElement, CHILD_ELEMENT_TEST_ID } from './test-data';

describe('LoadingModal logic', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = createStore();
  });

  it('shows a loader if isLoading="true"', async () => {
    renderWithStore(
      store,
      <LoadingModal isLoading={true}>{ChildElement}</LoadingModal>
    );

    screen.getByRole('progressbar');
    expect(screen.queryByTestId(CHILD_ELEMENT_TEST_ID)).toBeNull();
  });

  it('shows a child element if isLoading="false"', async () => {
    renderWithStore(
      store,
      <LoadingModal isLoading={false}>{ChildElement}</LoadingModal>
    );

    screen.getByTestId(CHILD_ELEMENT_TEST_ID);
    expect(screen.queryByRole('progressbar')).toBeNull();
  });
});
