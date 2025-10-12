import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface PropertyMapSelectorProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialPosition?: { lat: number; lng: number };
}

const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapClickHandler: React.FC<{
  onLocationSelect: (lat: number, lng: number) => void;
}> = ({ onLocationSelect }) => {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

export const PropertyMapSelector: React.FC<PropertyMapSelectorProps> = ({
  onLocationSelect,
  initialPosition,
}) => {
  const [selectedPosition, setSelectedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(initialPosition || null);

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedPosition({ lat, lng });
    onLocationSelect(lat, lng);
  };

  const center: [number, number] = initialPosition
    ? [initialPosition.lat, initialPosition.lng]
    : [20.5937, 78.9629];

  return (
    <div className="h-full w-full rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onLocationSelect={handleLocationSelect} />
        {selectedPosition && (
          <Marker
            position={[selectedPosition.lat, selectedPosition.lng]}
            icon={customIcon}
          />
        )}
      </MapContainer>
    </div>
  );
};
