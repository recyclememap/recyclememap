import { Loader, Notification, MapDomain } from './domains';
import { MarkerView } from './views';

export interface IRootStore {
  loader: Loader;
  notification: Notification;
  mapDomain: MapDomain;
  markerView: MarkerView;
}

export class RootStore implements IRootStore {
  loader: Loader;
  notification: Notification;
  mapDomain: MapDomain;
  markerView: MarkerView;

  constructor() {
    this.loader = new Loader();
    this.notification = new Notification();
    this.mapDomain = new MapDomain(this);
    this.markerView = new MarkerView();
  }
}
