import { Loader, Notification, MapDomain, MarkersDomain } from './domains';
import { MarkersView, SidebarView } from './views';

export interface IRootStore {
  loader: Loader;
  notification: Notification;
  mapDomain: MapDomain;
  markersDomain: MarkersDomain;
  markersView: MarkersView;
  sidebarView: SidebarView;
}

export class RootStore implements IRootStore {
  loader: Loader;
  notification: Notification;
  mapDomain: MapDomain;
  markersDomain: MarkersDomain;
  markersView: MarkersView;
  sidebarView: SidebarView;

  constructor() {
    this.loader = new Loader();
    this.notification = new Notification();
    this.mapDomain = new MapDomain(this);
    this.markersDomain = new MarkersDomain(this);
    this.markersView = new MarkersView();
    this.sidebarView = new SidebarView();
  }
}
