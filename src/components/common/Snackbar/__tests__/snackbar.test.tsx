import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IRootStore } from '@root/store';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { Snackbar } from '../Snackbar';
import { MOCK_SUCCESS_NOTIFICATION, CLOSE_BUTTON_TEST_ID } from './test-data';

describe('LoadingContainer logic', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = createStore();
  });

  it('opens a snackbar if there is a notification in the store', () => {
    store.notification.setCurrentNotification(MOCK_SUCCESS_NOTIFICATION);

    renderWithStore(store, <Snackbar />, false);

    screen.getByRole('presentation');
  });

  it('closes the snackbar and cleans the notification from the store if the close icon is clicked', async () => {
    store.notification.setCurrentNotification(MOCK_SUCCESS_NOTIFICATION);

    renderWithStore(store, <Snackbar />, false);

    screen.getByRole('presentation');

    userEvent.click(screen.getByTestId(CLOSE_BUTTON_TEST_ID));

    await waitFor(() => expect(screen.queryByRole('presentation')).toBeNull());
    expect(store.notification.currentNotification).toBeNull();
  });

  it('does not close the snackbar on click outside the snackbar', () => {
    store.notification.setCurrentNotification(MOCK_SUCCESS_NOTIFICATION);

    renderWithStore(store, <Snackbar />, false);

    screen.getByRole('presentation');

    userEvent.click(document.body);

    screen.getByRole('presentation');
  });
});
