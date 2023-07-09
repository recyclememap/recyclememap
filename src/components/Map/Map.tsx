import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import {
  ASHDOD_COORDINATES,
  ASHDOD_MAX_BOUNDS,
  MAP_ZOOM
} from '@common/constants';
import { mapStyle } from './map.css';

export const Map = () => {
  return (
    <MapContainer
      center={ASHDOD_COORDINATES}
      maxBounds={ASHDOD_MAX_BOUNDS}
      zoom={MAP_ZOOM}
      minZoom={MAP_ZOOM}
      className={mapStyle}
      zoomControl={false}
    >
      <TileLayer
        maxZoom={19}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
};
