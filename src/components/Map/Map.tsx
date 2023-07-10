import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import {
  ASHDOD_COORDINATES,
  ASHDOD_MAX_BOUNDS,
  INITIAL_MAP_ZOOM,
  MIN_MAP_ZOOM,
  MAX_MAP_ZOOM
} from '@common/constants';
import { mapStyle } from './map.css';

export const Map = () => {
  return (
    <MapContainer
      center={ASHDOD_COORDINATES}
      maxBounds={ASHDOD_MAX_BOUNDS}
      zoom={INITIAL_MAP_ZOOM}
      minZoom={MIN_MAP_ZOOM}
      className={mapStyle}
      zoomControl={false}
    >
      <TileLayer
        maxZoom={MAX_MAP_ZOOM}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
};
