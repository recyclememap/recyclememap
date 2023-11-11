import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MarkerState } from '@common/constants';
import { IRootStore } from '@root/store';
import { createStore, renderWithLeaflet } from '@utils/tests/helpers';
import { Placemark } from '../Placemark';
import { Marker, PlacemarkId } from './test-data';

describe('Placemark logic', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = createStore();
  });

  it('shows Popper on the Placemark hover and hides Popper on the focus lose', async () => {
    renderWithLeaflet(store, <Placemark marker={Marker} />);

    const placemark = screen.getByTestId(PlacemarkId);

    await userEvent.hover(placemark);

    await screen.findByText(Marker.address);

    fireEvent.blur(placemark);

    expect(screen.queryByTestId(Marker.address)).toBeNull();
  });

  it('sets active marker, opens sidebar and clears new marker icon om placemark click', async () => {
    store.markersView.setIsNewMobileMarkerActive(true);
    store.markersView.setIsNewMarkerActive(true);

    renderWithLeaflet(store, <Placemark marker={Marker} />);

    await userEvent.click(screen.getByTestId(PlacemarkId));

    expect(store.markersDomain.activeMarker).toStrictEqual(Marker);
    expect(store.sidebarView.isOpen).toBe(true);
    expect(store.markersView.state).toBe(MarkerState.Active);
    expect(store.markersView.isNewMarkerActive).toBe(false);
    expect(store.markersView.isNewMobileMarkerActive).toBe(false);
  });
});
