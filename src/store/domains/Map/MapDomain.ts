import { LatLng } from 'leaflet';
import { observable, makeObservable, action } from 'mobx';
import { RootStore } from '@root/store';
import { loader, notify } from '@utils/decorators';
import { MapLoaders } from './constants';
import { mapApi } from './requests';

export class MapDomain {
  private rootStore: RootStore;
  currentPosition: LatLng | null = null;
  currentAddress: string | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      currentAddress: observable,
      currentPosition: observable,
      setCurrentPosition: action,
      setCurrentAddress: action
    });
  }

  setCurrentPosition(position: LatLng | null): void {
    this.currentPosition = position;
  }

  setCurrentAddress(address: string | null): void {
    this.currentAddress = address;
  }

  @notify({
    message: 'common.errorTitle',
    details: 'mapDomain.getAddressErrorMessage'
  })
  @loader(MapLoaders.GetAddress)
  async getAddress(lat: number, lon: number): Promise<void> {
    const { address } = await mapApi.getAddress({
      params: { lat, lon }
    });

    const baseAddress = address.road || address.city || address.country;
    const houseNumber =
      address.house_number && address.road ? `, ${address.house_number}` : '';
    const displayAddress = baseAddress + houseNumber;

    this.setCurrentAddress(displayAddress);
  }

  @notify(
    {
      message: 'common.errorTitle',
      details: 'mapDomain.addNewMarkerErrorMessage'
    },
    {
      message: 'mapDomain.addNewMarkerSuccessMessage'
    }
  )
  @loader(MapLoaders.AddNewMarker)
  async addNewMarker(): Promise<void> {
    if (this.currentPosition) {
      await mapApi.addNewMarker({
        position: [this.currentPosition.lat, this.currentPosition.lng]
      });
    }
  }
}
