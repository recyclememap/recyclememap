import { LngLat } from '@maptiler/sdk';
import { observable, makeObservable, action } from 'mobx';
import { AshdodCoordinates } from '@common/constants';
import { RootStore } from '@root/store';
import { notify } from '@utils/decorators';
import { mapApi } from './requests';

// TODO: Move current address to suggestion?
export class MapDomain {
  private rootStore: RootStore;
  currentAddress: string | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      currentAddress: observable,
      setCurrentAddress: action
    });
  }

  setCurrentAddress(address: string | null): void {
    this.currentAddress = address;
  }

  @notify({
    message: 'common.errorTitle',
    details: 'mapDomain.getAddressErrorMessage'
  })
  async getAddress(lat: number, lon: number): Promise<void> {
    let address;

    try {
      const data = await mapApi.getAddress({
        params: { lat, lon }
      });

      address = data.address;
    } catch (e) {
      this.setCurrentAddress(null);
      throw e;
    }

    const baseAddress = address.road || address.city || address.country;
    const houseNumber =
      address.house_number && address.road ? `, ${address.house_number}` : '';
    const displayAddress = baseAddress + houseNumber;

    this.setCurrentAddress(displayAddress);
  }

  checkCurrentPosition({ lat, lng }: LngLat): boolean {
    return !(
      lat < AshdodCoordinates.LatMin ||
      lat > AshdodCoordinates.LatMax ||
      lng < AshdodCoordinates.LngMin ||
      lng > AshdodCoordinates.LngMax
    );
  }
}
