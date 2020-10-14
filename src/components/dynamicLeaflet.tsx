import { IconOptions } from 'leaflet';
import dynamic from 'next/dynamic';
import { MapProps, MarkerProps, PopupProps, TileLayerProps } from 'react-leaflet';

export const Map = dynamic<MapProps>(
  async () => {
    const Map = await import('react-leaflet').then((leaflet) => leaflet.Map);
    const DynamicMap = (props: MapProps) => <Map {...props} />;
    return DynamicMap;
  },
  {
    ssr: false,
  }
);

export const TileLayer = dynamic(
  async () => {
    const TileLayer = await import('react-leaflet').then((leaflet) => leaflet.TileLayer);
    const DynamicTileLayer = () => (
      <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    );
    return DynamicTileLayer;
  },
  {
    ssr: false,
  }
);

interface DynamicMarkerProps extends MarkerProps {
  iconProps: IconOptions;
}

export const Marker = dynamic<DynamicMarkerProps>(
  async () => {
    const icon = await import('leaflet').then((i) => i.icon);
    const Marker = await import('react-leaflet').then((m) => m.Marker);

    const DynamicMarker = ({ iconProps, ...props }: DynamicMarkerProps) => (
      <Marker {...props} icon={icon(iconProps)}></Marker>
    );
    return DynamicMarker;
  },
  {
    ssr: false,
  }
);

export const Popup = dynamic<PopupProps>(
  async () => {
    const Popup = await import('react-leaflet').then((rl) => rl.Popup);
    const DynamicPopup = (props: PopupProps) => <Popup {...props} />;
    return DynamicPopup;
  },
  {
    ssr: false,
  }
);
