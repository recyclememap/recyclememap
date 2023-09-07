import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Scope } from 'nock';
import { StatusCodes } from '@common/constants';
import { IRootStore } from '@root/store';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { AddMarkerDialog } from '../AddMarkerDialog';
import { DialogElements, LAT_LNG_MOCK } from './test-data';

describe('AddMarkerDialog logic', () => {
  let store: IRootStore;
  let apiMock: Scope;

  beforeEach(() => {
    store = createStore();
    apiMock = (global as any).apiMock;
  });

  it('creates new marker and closes dialog on add button click', async () => {
    store.mapDomain.setCurrentPosition(LAT_LNG_MOCK);

    const addNewMarkerSpy = jest.spyOn(store.mapDomain, 'addNewMarker');
    const onCloseSpy = jest.fn();

    apiMock
      .post('/markers', {
        position: [LAT_LNG_MOCK.lat, LAT_LNG_MOCK.lng]
      })
      .once()
      .reply(StatusCodes.Created);

    renderWithStore(store, <AddMarkerDialog onClose={onCloseSpy} />);

    userEvent.click(screen.getByText(DialogElements.AddButton));

    await screen.findByRole('progressbar');
    expect(addNewMarkerSpy).toBeCalledTimes(1);
    await waitFor(() => expect(onCloseSpy).toBeCalledTimes(1));
    await screen.findByText(DialogElements.SuccessMessage);
  });

  it('starts editing on edit button click', async () => {
    store.mapDomain.setCurrentPosition(LAT_LNG_MOCK);

    const onCloseSpy = jest.fn();

    renderWithStore(store, <AddMarkerDialog onClose={onCloseSpy} />);

    userEvent.click(screen.getByTitle(DialogElements.EditButton));

    await waitFor(() => expect(onCloseSpy).toBeCalledTimes(1));
    expect(store.markerView.isNewMarkerActive).toBe(true);
  });

  it('closes dialog on cancel button click', async () => {
    store.mapDomain.setCurrentPosition(LAT_LNG_MOCK);

    const onCloseSpy = jest.fn();

    renderWithStore(store, <AddMarkerDialog onClose={onCloseSpy} />);

    userEvent.click(screen.getByText(DialogElements.CancelButton));

    await waitFor(() => expect(onCloseSpy).toBeCalledTimes(1));
  });

  it('shows error snackbar if adding new marker is failed', async () => {
    store.mapDomain.setCurrentPosition(LAT_LNG_MOCK);

    const addNewMarkerSpy = jest.spyOn(store.mapDomain, 'addNewMarker');
    const onCloseSpy = jest.fn();

    apiMock
      .post('/markers', {
        position: [LAT_LNG_MOCK.lat, LAT_LNG_MOCK.lng]
      })
      .once()
      .replyWithError({});

    renderWithStore(store, <AddMarkerDialog onClose={onCloseSpy} />);

    userEvent.click(screen.getByText(DialogElements.AddButton));

    await screen.findByRole('progressbar');
    expect(addNewMarkerSpy).toBeCalledTimes(1);
    await screen.findByText(DialogElements.ErrorMessage);
    expect(onCloseSpy).not.toBeCalled();
  });
});