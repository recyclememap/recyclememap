import { Loader, Notification, MapDomain, MarkersDomain } from './domains';
import { MarkersView } from './views';

export interface IRootStore {
  loader: Loader;
  notification: Notification;
  mapDomain: MapDomain;
  markersDomain: MarkersDomain;
  markersView: MarkersView;
}

export class RootStore implements IRootStore {
  loader: Loader;
  notification: Notification;
  mapDomain: MapDomain;
  markersDomain: MarkersDomain;
  markersView: MarkersView;

  constructor() {
    this.loader = new Loader();
    this.notification = new Notification();
    this.mapDomain = new MapDomain(this);
    this.markersDomain = new MarkersDomain(this);
    this.markersView = new MarkersView();
  }
}
