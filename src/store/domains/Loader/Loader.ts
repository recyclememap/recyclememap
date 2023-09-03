import { observable, makeObservable, action } from 'mobx';

export class Loader {
  loaders: { [key: string]: boolean };

  constructor() {
    this.loaders = {};
    makeObservable(this, {
      loaders: observable,
      setLoader: action
    });
  }

  setLoader(name: string): void {
    this.loaders[name] = true;
  }

  isLoading(name: string): boolean {
    return this.loaders[name];
  }

  deleteLoader(name: string): void {
    delete this.loaders[name];
  }
}
