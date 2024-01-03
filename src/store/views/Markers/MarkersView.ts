import { observable, makeObservable, action } from 'mobx';
import { MarkerState } from '@common/constants';

export class MarkersView {
  state: MarkerState | null = null;
  isNewMarkerActive = false;
  isNewMobileMarkerActive = false;
  isUnsupportedCoordinates = false;

  constructor() {
    makeObservable(this, {
      state: observable,
      isNewMarkerActive: observable,
      isNewMobileMarkerActive: observable,
      isUnsupportedCoordinates: observable,
      setState: action,
      setIsNewMarkerActive: action,
      setIsNewMobileMarkerActive: action,
      setIsUnsupportedCoordinates: action
    });
  }

  setIsNewMarkerActive(state: boolean): void {
    this.isNewMarkerActive = state;
  }

  setIsNewMobileMarkerActive(state: boolean): void {
    this.isNewMobileMarkerActive = state;
  }

  setIsUnsupportedCoordinates(state: boolean) {
    this.isUnsupportedCoordinates = state;
  }

  setState(state: MarkerState | null): void {
    this.state = state;
  }
}
