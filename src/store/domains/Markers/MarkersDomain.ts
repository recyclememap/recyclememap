import { observable, makeObservable, action } from 'mobx';
import { RootStore } from '@root/store';
import { loader, notify } from '@utils/decorators';
import { MarkersLoaders } from './constants';
import { markersApi } from './requests';
import { MarkersList } from './types';

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
  async addNewMarker(): Promise<void> {
    if (this.rootStore.mapDomain.currentPosition) {
      const { lat, lng } = this.rootStore.mapDomain.currentPosition;

      await markersApi.addNewMarker({
        position: [lat, lng]
      });
    }
  }
}
