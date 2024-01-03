import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Scope } from 'nock';
import { StatusCodes, WasteTypes } from '@common/constants';
import { IRootStore } from '@root/store';
import { noop } from '@utils/helpers';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { NewMarkerForm } from '../NewMarkerForm';
import { FormElements, LAT_LNG_MOCK } from './test-data';

describe('NewMarkerForm logic', () => {
  let store: IRootStore;
  let apiMock: Scope;

  beforeEach(() => {
    store = createStore();
    apiMock = (global as any).apiMock;

    store.markersDomain.updateSuggestion({
      address: FormElements.Address,
      position: LAT_LNG_MOCK
    });
  });

  it('creates new marker and closes dialog on add button click', async () => {
    const addNewMarkerSpy = jest.spyOn(store.markersDomain, 'addNewMarker');
    const onCloseSpy = jest.fn();

    apiMock
      .post('/markers', {
        position: LAT_LNG_MOCK,
        address: FormElements.Address,
        wasteTypes: [WasteTypes.Batteries]
      })
      .once()
      .reply(StatusCodes.Created);

    renderWithStore(store, <NewMarkerForm onClose={onCloseSpy} />);

    const addButton = screen.getByText(FormElements.AddButton);

    expect(addButton).toBeDisabled();

    await userEvent.click(screen.getByLabelText(FormElements.WasteTypesLabel));
    await userEvent.click(screen.getByText(FormElements.WasteType));

    expect(addButton).toBeEnabled();
    await userEvent.click(addButton);

    expect(addNewMarkerSpy).toBeCalledTimes(1);
    await waitFor(() => expect(onCloseSpy).toBeCalledTimes(1));
    await screen.findByText(FormElements.SuccessMessage);
  });

  it('shows the validation error if a waste type is not selected', async () => {
    const onCloseSpy = jest.fn();

    renderWithStore(store, <NewMarkerForm onClose={onCloseSpy} />);

    const addButton = screen.getByText(FormElements.AddButton);

    expect(addButton).toBeDisabled();

    await userEvent.click(screen.getByLabelText(FormElements.WasteTypesLabel));
    await userEvent.click(screen.getByText(FormElements.WasteType));

    expect(addButton).toBeEnabled();
    await userEvent.click(screen.getByTestId(FormElements.CancelChipIcon));

    expect(addButton).toBeDisabled();
    screen.getByText(FormElements.WasteTypesValidationError);
  });

  it('starts editing on edit button click', async () => {
    renderWithStore(store, <NewMarkerForm onClose={noop} />);

    await userEvent.click(screen.getByTitle(FormElements.EditButton));

    expect(store.sidebarView.isOpen).toBe(false);
    expect(store.markersView.isNewMarkerActive).toBe(true);
  });

  it('closes the dialog on cancel button click', async () => {
    const onCloseSpy = jest.fn();

    renderWithStore(store, <NewMarkerForm onClose={onCloseSpy} />);

    userEvent.click(screen.getByText(FormElements.CancelButton));

    await waitFor(() => expect(onCloseSpy).toBeCalledTimes(1));
  });

  it('shows an error snackbar if adding a new marker is failed', async () => {
    const addNewMarkerSpy = jest.spyOn(store.markersDomain, 'addNewMarker');
    const onCloseSpy = jest.fn();

    apiMock
      .post('/markers', {
        position: LAT_LNG_MOCK,
        address: FormElements.Address,
        wasteTypes: [WasteTypes.Batteries]
      })
      .once()
      .replyWithError({});

    renderWithStore(store, <NewMarkerForm onClose={onCloseSpy} />);

    const addButton = screen.getByText(FormElements.AddButton);

    expect(addButton).toBeDisabled();

    await userEvent.click(screen.getByLabelText(FormElements.WasteTypesLabel));
    await userEvent.click(screen.getByText(FormElements.WasteType));

    expect(addButton).toBeEnabled();
    await userEvent.click(addButton);

    expect(addNewMarkerSpy).toBeCalledTimes(1);
    await screen.findByText(FormElements.ErrorMessage);
    expect(onCloseSpy).not.toBeCalled();
  });
});
