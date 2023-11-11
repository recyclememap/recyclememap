import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Scope } from 'nock';
import { StatusCodes, WasteTypes } from '@common/constants';
import { IRootStore } from '@root/store';
import { noop } from '@utils/helpers';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { EditMarkerForm } from '../EditMarkerForm';
import {
  FormElements,
  SUGGESTION_MARKER,
  ACTIVE_MARKER,
  WastyTypeButteriesTitle
} from './test-data';

describe('AddMarkerDialog logic', () => {
  let store: IRootStore;
  let apiMock: Scope;

  beforeEach(() => {
    store = createStore();
    apiMock = (global as any).apiMock;
  });

  it('updates marker and closes dialog on update button click', async () => {
    store.markersDomain.setActiveMarker(ACTIVE_MARKER);
    store.markersDomain.setSuggestionMarker(SUGGESTION_MARKER);

    const updateMarkerSpy = jest.spyOn(store.markersDomain, 'updateMarker');
    const onCloseSpy = jest.fn();

    apiMock
      .patch(`/markers/${SUGGESTION_MARKER.id}`, {
        position: SUGGESTION_MARKER.position,
        address: SUGGESTION_MARKER.address,
        wasteTypes: [...SUGGESTION_MARKER.wasteTypes, WasteTypes.Batteries]
      })
      .once()
      .reply(StatusCodes.NoContent);

    renderWithStore(store, <EditMarkerForm onClose={onCloseSpy} />);

    const updateButton = screen.getByText(FormElements.UpdateButton);

    await userEvent.click(screen.getByLabelText(FormElements.WasteTypesLabel));
    await userEvent.click(screen.getByText(WastyTypeButteriesTitle));

    expect(updateButton).toBeEnabled();
    await userEvent.click(updateButton);

    expect(updateMarkerSpy).toBeCalledTimes(1);
    await waitFor(() => expect(onCloseSpy).toBeCalledTimes(1));
    await screen.findByText(FormElements.SuccessMessage);
  });

  it('updates wasteType and closes dialog on update button click', async () => {
    store.markersDomain.setActiveMarker(SUGGESTION_MARKER);
    store.markersDomain.setSuggestionMarker(SUGGESTION_MARKER);

    const updateMarkerSpy = jest.spyOn(store.markersDomain, 'updateMarker');
    const onCloseSpy = jest.fn();

    apiMock
      .patch(`/markers/${SUGGESTION_MARKER.id}`, {
        wasteTypes: [...SUGGESTION_MARKER.wasteTypes, WasteTypes.Batteries]
      })
      .once()
      .reply(StatusCodes.NoContent);

    renderWithStore(store, <EditMarkerForm onClose={onCloseSpy} />);

    const updateButton = screen.getByText(FormElements.UpdateButton);

    expect(updateButton).toBeDisabled();

    await userEvent.click(screen.getByLabelText(FormElements.WasteTypesLabel));
    await userEvent.click(screen.getByText(WastyTypeButteriesTitle));

    expect(updateButton).toBeEnabled();
    await userEvent.click(updateButton);

    expect(updateMarkerSpy).toBeCalledTimes(1);
    await waitFor(() => expect(onCloseSpy).toBeCalledTimes(1));
    await screen.findByText(FormElements.SuccessMessage);
  });

  it('updates position and address and closes dialog on update button click', async () => {
    store.markersDomain.setActiveMarker({
      ...ACTIVE_MARKER,
      wasteTypes: SUGGESTION_MARKER.wasteTypes
    });
    store.markersDomain.setSuggestionMarker(SUGGESTION_MARKER);

    const updateMarkerSpy = jest.spyOn(store.markersDomain, 'updateMarker');
    const onCloseSpy = jest.fn();

    apiMock
      .patch(`/markers/${SUGGESTION_MARKER.id}`, {
        position: SUGGESTION_MARKER.position,
        address: SUGGESTION_MARKER.address
      })
      .once()
      .reply(StatusCodes.NoContent);

    renderWithStore(store, <EditMarkerForm onClose={onCloseSpy} />);

    const updateButton = screen.getByText(FormElements.UpdateButton);

    expect(updateButton).toBeEnabled();
    await userEvent.click(updateButton);

    expect(updateMarkerSpy).toBeCalledTimes(1);
    await waitFor(() => expect(onCloseSpy).toBeCalledTimes(1));
    await screen.findByText(FormElements.SuccessMessage);
  });

  it('shows the validation error if a waste type is not selected', async () => {
    store.markersDomain.setActiveMarker(ACTIVE_MARKER);
    store.markersDomain.setSuggestionMarker(SUGGESTION_MARKER);

    renderWithStore(store, <EditMarkerForm onClose={noop} />);

    const updateButton = screen.getByText(FormElements.UpdateButton);

    expect(updateButton).toBeEnabled();

    await userEvent.click(screen.getByTestId(FormElements.CancelChipIcon));

    expect(updateButton).toBeDisabled();
    screen.getByText(FormElements.WasteTypesValidationError);
  });

  it('starts editing on edit button click', async () => {
    store.markersDomain.setActiveMarker(ACTIVE_MARKER);
    store.markersDomain.setSuggestionMarker(SUGGESTION_MARKER);

    renderWithStore(store, <EditMarkerForm onClose={noop} />);

    await userEvent.click(screen.getByTitle(FormElements.EditButton));

    expect(store.sidebarView.isOpen).toBe(false);
    expect(store.markersView.isNewMarkerActive).toBe(true);
  });

  it('closes the dialog on cancel button click', async () => {
    store.markersDomain.setActiveMarker(ACTIVE_MARKER);
    store.markersDomain.setSuggestionMarker(SUGGESTION_MARKER);

    const onCloseSpy = jest.fn();

    renderWithStore(store, <EditMarkerForm onClose={onCloseSpy} />);

    userEvent.click(screen.getByText(FormElements.CancelButton));

    await waitFor(() => expect(onCloseSpy).toBeCalledTimes(1));
  });

  it('shows an error snackbar if adding a new marker is failed', async () => {
    store.markersDomain.setActiveMarker(ACTIVE_MARKER);
    store.markersDomain.setSuggestionMarker(SUGGESTION_MARKER);

    const updateMarkerSpy = jest.spyOn(store.markersDomain, 'updateMarker');
    const onCloseSpy = jest.fn();

    apiMock
      .patch(`/markers/${SUGGESTION_MARKER.id}`, {
        position: SUGGESTION_MARKER.position,
        address: SUGGESTION_MARKER.address,
        wasteTypes: [...SUGGESTION_MARKER.wasteTypes, WasteTypes.Batteries]
      })
      .once()
      .replyWithError({});

    renderWithStore(store, <EditMarkerForm onClose={onCloseSpy} />);

    const updateButton = screen.getByText(FormElements.UpdateButton);

    await userEvent.click(screen.getByLabelText(FormElements.WasteTypesLabel));
    await userEvent.click(screen.getByText(WastyTypeButteriesTitle));

    expect(updateButton).toBeEnabled();
    await userEvent.click(updateButton);

    expect(updateMarkerSpy).toBeCalledTimes(1);
    await screen.findByText(FormElements.ErrorMessage);
    expect(onCloseSpy).not.toBeCalled();
  });
});
