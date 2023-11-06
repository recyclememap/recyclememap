import { screen } from '@testing-library/react';
import { MarkerState } from '@common/constants';
import { IRootStore } from '@root/store';
import { MapLoaders } from '@root/store/domains';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import { MobileSidebar } from '../MobileSidebar';
import {
  TextElements,
  SUGGESTION_MARKER,
  ACTIVE_MARKER,
  CLOSE_ICON_TEST_ID
} from './test-data';

describe('MobileSidebar visual', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = createStore();
    store.sidebarView.setIsOpen(true);
  });

  it('renders ActiveMarker layout if state is "Active"', () => {
    store.markersDomain.setActiveMarker(ACTIVE_MARKER);
    store.markersView.setState(MarkerState.Active);

    renderWithStore(store, <MobileSidebar />);

    screen.getByText(TextElements.ActiveMarkerEditButton);
    screen.getByTestId(CLOSE_ICON_TEST_ID);
  });

  it('renders EditMarkerForm layout if state is "Edit"', () => {
    store.markersDomain.setActiveMarker(SUGGESTION_MARKER);
    store.markersDomain.setSuggestionMarker(SUGGESTION_MARKER);
    store.markersView.setState(MarkerState.Edit);

    renderWithStore(store, <MobileSidebar />);

    screen.getByText(TextElements.EditMarkerTitle);
  });

  it('renders error for EditMarkerForm layout if coordinates are unsupported', () => {
    store.markersView.setState(MarkerState.Edit);
    store.markersView.setIsUnsupportedCoordinates(true);

    renderWithStore(store, <MobileSidebar />);

    screen.getByText(TextElements.UnsuportedCoordinatesMessage);
    screen.getByText(TextElements.UnsuportedCoordinatesDetails);
  });

  it('renders NewMarkerForm layout if state is "New"', () => {
    store.markersView.setState(MarkerState.New);

    renderWithStore(store, <MobileSidebar />);

    screen.getByText(TextElements.AddMarkerTitle);
  });

  it('renders error for NewMarkerForm layout if coordinates are unsupported', () => {
    store.markersView.setState(MarkerState.New);
    store.markersView.setIsUnsupportedCoordinates(true);

    renderWithStore(store, <MobileSidebar />);

    screen.getByText(TextElements.UnsuportedCoordinatesMessage);
    screen.getByText(TextElements.UnsuportedCoordinatesDetails);
  });

  it('shows loader for EditMarkerForm layout if loader is set', () => {
    store.loader.setLoader(MapLoaders.GetAddress);
    store.markersView.setState(MarkerState.Edit);

    renderWithStore(store, <MobileSidebar />);

    screen.getByRole('progressbar');
  });

  it('shows loader for NewMarkerForm layout if loader is set', () => {
    store.loader.setLoader(MapLoaders.GetAddress);
    store.markersView.setState(MarkerState.New);

    renderWithStore(store, <MobileSidebar />);

    screen.getByRole('progressbar');
  });
});
