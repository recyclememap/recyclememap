import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Scope } from 'nock';
import { StatusCodes, WasteTypes } from '@common/constants';
import { IRootStore } from '@root/store';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { AddMarkerDialogMobile } from '../AddMarkerDialogMobile';
import { DialogElements, LAT_LNG_MOCK } from './test-data';

describe('AddMarkerDialogMobile logic', () => {
  let store: IRootStore;
  let apiMock: Scope;

  beforeEach(() => {
    store = createStore();
    apiMock = (global as any).apiMock;
  });

  it('creates a new marker and closes the mobile dialog on add button click', async () => {
    store.mapDomain.setCurrentPosition(LAT_LNG_MOCK);
    store.mapDomain.setCurrentAddress(DialogElements.Address);

    const addNewMarkerSpy = jest.spyOn(store.markersDomain, 'addNewMarker');
    const onCloseSpy = jest.fn();

    apiMock
      .post('/markers', {
        position: [LAT_LNG_MOCK.lat, LAT_LNG_MOCK.lng],
        address: DialogElements.Address,
        wasteTypes: [WasteTypes.Batteries]
      })
      .once()
      .reply(StatusCodes.Created);

    renderWithStore(store, <AddMarkerDialogMobile onClose={onCloseSpy} />);

    const addButton = screen.getByText(DialogElements.AddButton);

    expect(addButton).toBeDisabled();

    await userEvent.click(screen.getByLabelText(DialogElements.WasteTypsLabel));
    await userEvent.click(screen.getByText(DialogElements.WasteType));

    expect(addButton).toBeEnabled();
    await userEvent.click(addButton);

    expect(addButton).toBeDisabled();
    expect(addNewMarkerSpy).toBeCalledTimes(1);
    await waitFor(() => expect(onCloseSpy).toBeCalledTimes(1));
    await screen.findByText(DialogElements.SuccessMessage);
  });

  it('closes the dialog on cancel button click', async () => {
    store.mapDomain.setCurrentPosition(LAT_LNG_MOCK);

    const onCloseSpy = jest.fn();

    renderWithStore(store, <AddMarkerDialogMobile onClose={onCloseSpy} />);

    await userEvent.click(screen.getByText(DialogElements.CancelButton));

    await waitFor(() => expect(onCloseSpy).toBeCalledTimes(1));
  });

  it('shows an error snackbar if adding a new marker is failed', async () => {
    store.mapDomain.setCurrentPosition(LAT_LNG_MOCK);
    store.mapDomain.setCurrentAddress(DialogElements.Address);

    const addNewMarkerSpy = jest.spyOn(store.markersDomain, 'addNewMarker');
    const onCloseSpy = jest.fn();

    apiMock
      .post('/markers', {
        position: [LAT_LNG_MOCK.lat, LAT_LNG_MOCK.lng],
        address: DialogElements.Address,
        wasteTypes: [WasteTypes.Batteries]
      })
      .once()
      .replyWithError({});

    renderWithStore(store, <AddMarkerDialogMobile onClose={onCloseSpy} />);

    const addButton = screen.getByText(DialogElements.AddButton);

    expect(addButton).toBeDisabled();

    await userEvent.click(screen.getByLabelText(DialogElements.WasteTypsLabel));
    await userEvent.click(screen.getByText(DialogElements.WasteType));

    expect(addButton).toBeEnabled();
    await userEvent.click(addButton);

    expect(addNewMarkerSpy).toBeCalledTimes(1);
    await screen.findByText(DialogElements.ErrorMessage);
    expect(onCloseSpy).not.toBeCalled();
  });
});
