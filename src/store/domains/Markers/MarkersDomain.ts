import { observable, makeObservable, action } from 'mobx';
import { RootStore } from '@root/store';
import { loader, notify } from '@utils/decorators';
import { MarkersLoaders } from './constants';
import { markersApi } from './requests';
import { MarkersList, NewMarkerForm } from './types';

export class MarkersDomain {
  private rootStore: RootStore;
  markers: MarkersList = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      markers: observable,
      setMarkers: action
    });
  }

  setMarkers(markers: MarkersList): void {
    this.markers = markers;
  }

  @notify({
    message: 'common.errorTitle',
    details: 'markersDomain.getMarkersErrorMessage'
  })
  @loader(MarkersLoaders.GetMarkers)
  async getMarkers(): Promise<void> {
    const markers = await markersApi.getMarkers();

    this.setMarkers(markers);
  }

  @notify(
    {
      message: 'common.errorTitle',
      details: 'markersDomain.addNewMarkerErrorMessage'
    },
    {
      message: 'markersDomain.addNewMarkerSuccessMessage'
    }
  )
  @loader(MarkersLoaders.AddNewMarker)
  async addNewMarker({ wasteTypes }: NewMarkerForm): Promise<void> {
    if (
      this.rootStore.mapDomain.currentPosition &&
      this.rootStore.mapDomain.currentAddress
    ) {
      const { lat, lng } = this.rootStore.mapDomain.currentPosition;

      await markersApi.addNewMarker({
        position: [lat, lng],
        address: this.rootStore.mapDomain.currentAddress,
        wasteTypes
      });
    } else {
      throw new Error();
    }
  }
}
