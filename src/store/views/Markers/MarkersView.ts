import { observable, makeObservable, action } from 'mobx';

export class MarkersView {
  isNewMarkerDialogOpen = false;
  isNewMarkerActive = false;
  isNewMobileMarkerActive = false;
  isUnsupportedCoordinates = false;

  constructor() {
    makeObservable(this, {
      isNewMarkerDialogOpen: observable,
      isNewMarkerActive: observable,
      isNewMobileMarkerActive: observable,
      isUnsupportedCoordinates: observable,
      setIsNewMarkerActive: action,
      setIsNewMobileMarkerActive: action,
      setIsNewMarkerDialogOpen: action,
      setIsUnsupportedCoordinates: action
    });
  }

  setIsNewMarkerDialogOpen(state: boolean): void {
    this.isNewMarkerDialogOpen = state;
  }

  setIsNewMarkerActive(state: boolean): void {
    this.isNewMarkerActive = state;
  }

  setIsNewMobileMarkerActive(state: boolean): void {
    this.isNewMobileMarkerActive = state;
  }

  setIsUnsupportedCoordinates(value: boolean) {
    this.isUnsupportedCoordinates = value;
  }
}
