import { screen, fireEvent } from '@testing-library/react';
import { IRootStore } from '@root/store';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { MarkerHandler } from '../MarkerHandler';
import { ChildElement, CHILD_ELEMENT_TEST_ID } from './test-data';

describe('MarkerHandler Logic', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = createStore();
  });

  it('sets new marker state to "false"', async () => {
    store.markersView.setIsNewMarkerActive(true);
    renderWithStore(store, <MarkerHandler>{ChildElement}</MarkerHandler>);

    const childElement = screen.getByTestId(CHILD_ELEMENT_TEST_ID);

    fireEvent.keyDown(childElement, {
      key: 'Escape',
      code: 'Escape',
      charCode: 27
    });

    expect(store.markersView.isNewMarkerActive).toBe(false);
  });
});
