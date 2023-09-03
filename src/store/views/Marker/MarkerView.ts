import { observable, makeObservable, action } from 'mobx';

export class MarkerView {
  isMarkerDialogOpen = false;
  isNewMarkerActive = false;
  isNewMobileMarkerActive = false;

  constructor() {
    makeObservable(this, {
      isMarkerDialogOpen: observable,
      isNewMarkerActive: observable,
      isNewMobileMarkerActive: observable,
      setIsNewMarkerActive: action,
      setIsNewMobileMarkerActive: action,
      setIsMarkerDialogOpen: action
    });
  }

  setIsMarkerDialogOpen(state: boolean): void {
    this.isMarkerDialogOpen = state;
  }

  setIsNewMarkerActive(state: boolean): void {
    this.isNewMarkerActive = state;
  }

  setIsNewMobileMarkerActive(state: boolean): void {
    this.isNewMobileMarkerActive = state;
  }
}
