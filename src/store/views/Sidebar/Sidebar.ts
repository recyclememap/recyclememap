import { observable, makeObservable, action } from 'mobx';

export class SidebarView {
  isOpen = false;

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      setIsOpen: action
    });
  }

  setIsOpen(state: boolean): void {
    this.isOpen = state;
  }
}
