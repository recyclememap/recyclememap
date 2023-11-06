import { observable, makeObservable, action } from 'mobx';
import { RootStore } from '@root/store';
import { loader, notify } from '@utils/decorators';
import { MarkersLoaders } from './constants';
import { markersApi } from './requests';
import {
  Marker,
  MarkersList,
  MarkerFormFields,
  SuggestedMarker,
  MarkerProperties,
  SuggestedProperties
} from './types';

export class MarkersDomain {
  private rootStore: RootStore;
  markers: MarkersList = [];
  suggestionMarker: Marker | null = null;
  activeMarker: Marker | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      markers: observable,
      suggestionMarker: observable,
      activeMarker: observable,
      setMarkers: action,
      setSuggestionMarker: action,
      setActiveMarker: action
    });
  }

  setMarkers(markers: MarkersList): void {
    this.markers = markers;
  }

  setSuggestionMarker(suggestionMarker: Marker | null): void {
    this.suggestionMarker = suggestionMarker;
  }

  setActiveMarker(activeMarker: Marker | null): void {
    this.activeMarker = activeMarker;
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
  async addNewMarker({ wasteTypes }: MarkerFormFields): Promise<void> {
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

  @notify(
    {
      message: 'common.errorTitle',
      details: 'markersDomain.updateMarkerErrorMessage'
    },
    {
      message: 'markersDomain.updateMarkerSuccessMessage'
    }
  )
  @loader(MarkersLoaders.UpdateMarker)
  async updateMarker(): Promise<void> {
    if (this.activeMarker && this.suggestionMarker) {
      const suggestion: SuggestedProperties = {};

      Object.values(MarkerProperties).forEach((property) => {
        const suggestedValue = this.suggestionMarker![property];
        const currentValue = this.activeMarker![property];
        let isValueEqual = true;

        if (Array.isArray(suggestedValue)) {
          isValueEqual =
            suggestedValue.length === currentValue.length &&
            [...suggestedValue].every(
              (value, idx) => value === currentValue[idx]
            );
        } else {
          isValueEqual = suggestedValue === currentValue;
        }

        if (!isValueEqual) {
          suggestion[property] = suggestedValue as any;
        }
      });

      await markersApi.updateMarker(this.suggestionMarker.id, suggestion);
    } else {
      throw new Error();
    }
  }

  updateSuggestion(suggestion: SuggestedMarker): void {
    this.setSuggestionMarker({
      ...this.suggestionMarker,
      ...suggestion
    } as Marker);
  }
}
