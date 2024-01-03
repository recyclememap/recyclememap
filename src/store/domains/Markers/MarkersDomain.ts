import { observable, makeObservable, action } from 'mobx';
import { RootStore } from '@root/store';
import { loader, notify } from '@utils/decorators';
import { noop } from '@utils/helpers';
import { MarkersLoaders } from './constants';
import { markersApi } from './requests';
import {
  Marker,
  MarkersList,
  SuggestedMarker,
  MarkerProperties,
  SuggestedProperties
} from './types';

export class MarkersDomain {
  private rootStore: RootStore;
  retryCount = 4;
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
    let markers: MarkersList;

    // Temporary solution since server is spinning down without receiving inbound traffic
    try {
      markers = await markersApi.getMarkers();
    } catch (e) {
      if (this.retryCount > 0) {
        this.retryCount--;

        await this.getMarkers();

        return;
      }

      throw e;
    }

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
    if (
      this.suggestionMarker?.position &&
      this.suggestionMarker?.address &&
      this.suggestionMarker?.wasteTypes
    ) {
      await markersApi.addNewMarker({
        position: this.suggestionMarker.position,
        address: this.suggestionMarker.address,
        wasteTypes: this.suggestionMarker.wasteTypes
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

  async init(): Promise<void> {
    await this.getMarkers().catch(noop);
  }
}
