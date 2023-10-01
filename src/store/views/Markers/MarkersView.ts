import { observable, makeObservable, action } from 'mobx';

export class MarkersView {
  isNewMarkerDialogOpen = false;
  isNewMarkerActive = false;
  isNewMobileMarkerActive = false;

  constructor() {
    makeObservable(this, {
      isNewMarkerDialogOpen: observable,
      isNewMarkerActive: observable,
      isNewMobileMarkerActive: observable,
      setIsNewMarkerActive: action,
      setIsNewMobileMarkerActive: action,
      setIsNewMarkerDialogOpen: action
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
}
